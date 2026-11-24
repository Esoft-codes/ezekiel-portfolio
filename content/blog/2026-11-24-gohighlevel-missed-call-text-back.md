---
title: GoHighLevel missed call text back setup for agency clients
date: 2026-11-24
description: How agencies set up GoHighLevel missed call text back once in a snapshot, stop double texts, and roll it out to every client sub-account without surprises.
tags: GoHighLevel, CRM, Agencies
---

GoHighLevel missed call text back sends an automatic SMS to anyone whose call to a sub-account goes unanswered. For a single business, the built-in toggle is enough. For an agency running it across ten or fifty clients, you want a workflow version instead: built once in a snapshot, filtered so repeat callers do not get three texts in a row, and tied to the client's pipeline so every missed call becomes a lead someone follows up.

This is the playbook I use when I set this up for agencies. It covers the toggle versus workflow decision, the exact workflow, the message templates, the rollout checklist per client, and the mistakes that make clients think the automation is broken.

## Toggle or workflow: which one to use

HighLevel gives you two ways to do this.

**The toggle** lives in the sub-account under Settings, Phone System, Voice, then Voicemail & Missed Call Text Back. You tick the box, write the message, send a test and save. The same screen holds the incoming call timeout, which decides how long the phone rings before a call counts as missed. HighLevel's [setup guide](https://help.gohighlevel.com/support/solutions/articles/48001239140-where-and-how-to-configure-the-missed-call-text-back-feature) suggests 10 to 20 seconds.

**The workflow** uses the Call Details trigger with filters for direction and status, then whatever actions you want.

Here is how I decide:

| Situation | Use |
| --- | --- |
| One client, one number, just wants a quick reply | Toggle |
| You need to stop repeat texts to the same caller | Workflow |
| Different messages for office hours and after hours | Workflow |
| The missed call should create an opportunity or task | Workflow |
| You are deploying to many clients from a snapshot | Workflow |

One detail matters a lot here. HighLevel's own guide says the toggle sends a text for **every** missed call, even when the same person calls several times in a few minutes. They recommend the workflow route with a wait step or tag filter if that is a problem. For agency clients it usually is. Someone who calls a clinic three times and gets three identical texts thinks the business is a robot. Pick one method per sub-account, never both, or callers get two texts per missed call.

## The missed call text back workflow, step by step

Build this in a template sub-account first, test it, then save it into your snapshot.

1. Go to **Automation, Workflows**, click **Create Workflow** and start from scratch.
2. Add the trigger **Call Details** (under Events). Name it "Incoming missed call".
3. Add the filter **Call Direction = Incoming**.
4. Add the filter **Call Status** and select **no-answer**, **busy** and **voicemail**. You can pick more than one value in the same filter.
5. If the client has more than one line, add **In Phone Number** so only the main line fires this workflow. Sales and support lines often need different messages.
6. Add an **If/Else** branch on the contact's tags. If the contact has the tag `mctb-sent`, go to the end. This is your repeat caller guard.
7. On the "no tag" branch, add a second **If/Else** for business hours. One branch sends the office hours message, the other sends the after hours message.
8. Add **Send SMS** with the right template on each branch.
9. Add **Add Tag** `mctb-sent`.
10. Add **Create/Update Opportunity** in the client's pipeline, stage "Missed call, new".
11. Add **Internal Notification** to the person who handles callbacks, with the caller's number and the time.
12. Add **Wait** of 24 hours, then **Remove Tag** `mctb-sent`. This lets the same person get a text again if they call tomorrow, but not five times today.
13. Open the workflow **Settings** and turn on **Allow Re-entry**. Without it, a contact who went through once will not enroll again. HighLevel's [Call Details trigger docs](https://help.gohighlevel.com/support/solutions/articles/48001212511-workflow-trigger-call-details) also note that a contact cannot re-enter while still active in the same workflow, which is fine here because the tag branch handles repeat calls.
14. Save, test with a real call from a phone that is not in the CRM, then switch the workflow from Draft to **Publish**.

The tag plus wait pattern is the part most tutorials skip. It is also the part clients notice first.

## Message templates that get replies

The text has one job: get the caller to reply so the conversation moves into the CRM. Keep it short, name the business, and ask one question.

I store the business name and booking link as custom values (for example `{{custom_values.business_name}}` and `{{custom_values.booking_link}}`). The snapshot then works for every client after you fill those values in once.

```text
Office hours:
Hi, this is {{custom_values.business_name}}. Sorry we missed your call,
we're with a customer right now. What can we help you with? Reply here
and we'll get back to you shortly.

After hours:
Hi, this is {{custom_values.business_name}}. We're closed right now but
we got your call. Reply with what you need and we'll respond first thing
tomorrow, or book a time here: {{custom_values.booking_link}}
```

Avoid the contact's first name in the opening line. HighLevel's guide points out that name placeholders only fill in if the system already knows the contact, and most missed callers are new numbers. "Hi ," with a blank name looks careless.

## Rolling it out to every client sub-account

The snapshot carries the workflow, tags, pipeline stage and custom value fields. It does not give each client a working phone setup. That part is per sub-account, so I run this checklist for every client:

1. Load the snapshot and fill in the custom values (business name, booking link, hours).
2. Confirm the client has a HighLevel number that is able to **send** SMS (some numbers only receive calls). For US numbers that means A2P 10DLC registration; for toll-free numbers, toll-free verification.
3. If the client forwards their existing line to HighLevel, make sure calls actually ring through HighLevel and hit the timeout. If the carrier's own voicemail picks up first, HighLevel never sees a missed call.
4. Set the incoming call timeout. I start at 15 seconds.
5. Check that the toggle is **off** in that sub-account, since the workflow replaces it.
6. Do two test calls from a fresh phone, two minutes apart. You should get exactly one text, one opportunity and one notification.
7. Show the client where replies land in Conversations, and who is responsible for answering them.

Step 7 sounds obvious. It is where most of these setups fail. The automation sends the text, the lead replies, and nobody at the business is watching the inbox.

## Common mistakes

- **Number cannot send SMS.** Number pool and call tracking numbers often cannot. HighLevel now falls back to another eligible number in the location, so the text may come from a different number than the one the caller dialed. Warn the client so they are not confused when a customer mentions it.
- **Toggle and workflow both on.** Two texts per missed call. Pick one.
- **Allow Re-entry left off.** Works on the first test, then "stops working" for returning callers.
- **Timeout too long.** A 40 second ring before the text means the caller has already dialed a competitor.
- **No owner for replies.** The text is only the start of the conversation.
- **Ignoring DND.** HighLevel respects contacts' DND settings, so a contact marked DND gets nothing. That is correct behavior, not a bug.

## Using WhatsApp instead of SMS

For clients outside the US, especially here in Nigeria, many customers reply on WhatsApp faster than they reply to SMS. The SMS feature cannot send to WhatsApp, but HighLevel has a separate Missed Call WhatsApp Back feature for that. If WhatsApp is the client's main channel, I usually go further and connect a proper WhatsApp assistant, like the setup in my [WhatsApp automation project](/work/whatsapp-automation/).

## Where this fits in a bigger client package

Missed call text back is the easiest automation to sell a local business because the problem is visible: they know they miss calls. Once it is live, the natural next step is answering those calls instead of texting after them. That is what an AI voice receptionist does, and I wrote up the full build in [how to build an AI receptionist with Vapi and Make.com](/blog/build-ai-receptionist-vapi-make/). You can see a finished version in my [AI voice receptionist case study](/work/ai-voice-receptionist/), and how missed calls feed a pipeline in the [CRM lead management project](/work/crm-lead-management/).

## Next step

If you run an agency and want this built into a snapshot you can deploy to every client, or want to pair it with a voice agent, [tell me about it](/#contact).
