---
title: Build an AI receptionist with Vapi and Make.com, step by step
date: 2026-11-23
description: How I build an AI receptionist with Vapi and Make.com that answers calls, checks the calendar and books appointments, with the exact modules and prompt.
tags: Voice AI, Make.com
---

To build an AI receptionist with Vapi and Make.com, you let Vapi handle the phone call (listening, thinking and speaking) and let Make do the work behind the scenes (checking the calendar, booking the slot, logging the call). The two talk through a webhook: Vapi calls a "tool" when the caller wants something done, Make runs the steps and sends back one short answer, and the assistant says it out loud.

This is the same split I use when I build voice receptionists. Below is the full setup: the assistant prompt, the two tools, the Make scenario module by module, and the mistakes that cost the most time.

## What the finished receptionist does

For this guide, the receptionist handles one job well: booking appointments for a small service business. For example, a salon or a clinic that misses calls while staff are busy. On every call it can:

1. Greet the caller and ask what they need.
2. Answer simple questions (opening hours, location, services) from the prompt.
3. Check if a requested time is free.
4. Book the slot and confirm it back to the caller.
5. Send a summary of the call to a Google Sheet when the call ends.

Keep the first version this narrow. A receptionist that books reliably is worth more than one that tries to do ten things and fumbles three of them.

## What you need before you start

- A Vapi account, with an assistant and a phone number attached to it.
- A Make.com account.
- A Google Calendar for bookings and a Google Sheet for the call log, both connected in Make.
- A written list of the business details: hours, services, prices if you want them quoted, address, and what the receptionist should do when it cannot help.

## How Vapi and Make.com talk to each other

Vapi supports custom function tools. When the model decides to use one, Vapi sends a POST request to the server URL you set, with a `tool-calls` message. Inside it, `message.toolCallList` holds each call with its `id`, the function `name` and the `arguments` the caller gave.

Your server, here a Make scenario, must reply with HTTP 200 and a `results` array. Each entry needs the matching `toolCallId` and a `result`. The detail that trips people up: according to the [Vapi custom tools docs](https://docs.vapi.ai/tools/custom-tools), `result` must be a flat string, not an object. If you send JSON back as an object, the assistant will not read it properly.

```json
{
  "results": [
    {
      "toolCallId": "call_abc123",
      "result": "Thursday at 2pm is free."
    }
  ]
}
```

## Step 1: Write the receptionist prompt

The system prompt decides most of how the call feels. I keep it short, specific, and written like instructions to a new front desk hire.

```text
You are the receptionist for [Business name], a [type of business] in [city].
Speak warmly and briefly. One question at a time. Never read out lists.

Business details:
- Hours: [days and times]
- Address: [address]
- Services: [service, length, price]

Booking rules:
- Before booking, collect: full name, phone number, service, preferred day and time.
- Always call check_availability before offering a time.
- Only call book_appointment after the caller says yes to a specific time.
- Repeat the final booking back: service, day, date, time.

If you do not know the answer, say you will pass the message to the team,
take the caller's name and number, and end politely.
Never invent prices, staff names or availability.
```

Two lines in there matter more than they look. "Always call check_availability before offering a time" stops the model from guessing slots. "Only call book_appointment after the caller says yes" stops double bookings from half-finished conversations.

## Step 2: Create the two tools in Vapi

In the Vapi dashboard, create two custom function tools and attach both to the assistant. Point both at the same Make webhook URL (you create it in step 3). One webhook for both tools keeps things simple, because the scenario can route by tool name.

**check_availability**

```json
{
  "name": "check_availability",
  "description": "Checks if a requested appointment time is free.",
  "parameters": {
    "type": "object",
    "properties": {
      "start_time": { "type": "string", "description": "Requested start in ISO 8601, e.g. 2026-11-26T14:00:00+01:00" },
      "service": { "type": "string" }
    },
    "required": ["start_time", "service"]
  }
}
```

**book_appointment**

```json
{
  "name": "book_appointment",
  "description": "Books a confirmed appointment.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "phone": { "type": "string" },
      "service": { "type": "string" },
      "start_time": { "type": "string" }
    },
    "required": ["name", "phone", "service", "start_time"]
  }
}
```

In each tool's Messages settings, add a short **Request Start** line such as "One moment while I check that for you." It fills the silence while Make works, which callers notice a lot more than you would expect.

## Step 3: Build the Make.com scenario

Here is the module sequence I use:

1. **Webhooks > Custom webhook.** Create a new webhook, copy the URL, and paste it into both Vapi tools as the server URL. Make one test call so Make learns the data structure.
2. **Router.** Two routes, each with a filter on the function name from the first item in `toolCallList`:
   - Route A: name equals `check_availability`
   - Route B: name equals `book_appointment`
3. **Route A: Google Calendar > Search events.** Search the calendar between `start_time` and start time plus the service length. If no events come back, the slot is free.
4. **Route A: Webhooks > Webhook response.** Status `200`, header `Content-Type: application/json`, and a body with the tool call id and a plain sentence, such as "Thursday at 2pm is free" or "That time is taken. The nearest free time is 3pm."
5. **Route B: Google Calendar > Create an event.** Title with the service and caller name, the phone number in the description.
6. **Route B: Webhooks > Webhook response.** Same format, with a confirmation sentence such as "Booked: haircut on Thursday 26 November at 2pm."

The [Make Webhooks documentation](https://apps.make.com/gateway) explains that without a Webhook response module, Make simply answers "Accepted". Vapi would then have nothing useful to say, so every route that answers a tool must end in a Webhook response.

## Step 4: Log every call to a Google Sheet

Vapi can also send call events, including an end-of-call report, to a server URL set on the assistant. I point this at a second Make scenario:

1. **Webhooks > Custom webhook** (a separate one; Make does not let two scenarios share a webhook).
2. **Filter:** only continue when the message type is `end-of-call-report`.
3. **Google Sheets > Add a row:** date, caller number, summary, and whether a booking was made.

This sheet becomes the business owner's view of what the receptionist is doing, and it is the first place I look when something sounds off.

## Step 5: Test it like a real caller

Do not stop at one happy-path call. Before going live I run through this checklist:

- Book a free slot and check the calendar event appears.
- Ask for a time that is already taken.
- Change your mind halfway through a booking.
- Ask a question the prompt does not cover.
- Speak a phone number quickly, then slowly.
- Hang up mid-call and confirm the log row still arrives.

## Common mistakes

- **Returning an object instead of a string.** The `result` field must be a flat string. Turn any structured data into one sentence before sending it back.
- **Missing toolCallId.** If the id in your response does not match the id Vapi sent, the assistant behaves as if nothing came back.
- **Forgetting time zones.** Tell the model the business time zone in the prompt and ask for ISO 8601 times with the offset. Lagos is UTC+1, and a one-hour error books the wrong slot.
- **A slow scenario.** Every extra module adds wait time while the caller is listening. Keep the tool routes short and set a sensible timeout in the tool's advanced settings.
- **Booking before confirmation.** Without the "only after the caller says yes" rule, the model sometimes books the first time mentioned.

## Want this built for your business?

This setup covers what most small businesses need first: no more missed calls, and bookings that land straight in the calendar. You can see how I approach a full build in my [AI voice receptionist project](/work/ai-voice-receptionist/), and how leads and contacts get organised afterwards in [CRM lead management](/work/crm-lead-management/).

If you want an AI receptionist built and tested for your business, [tell me about it](/#contact).
