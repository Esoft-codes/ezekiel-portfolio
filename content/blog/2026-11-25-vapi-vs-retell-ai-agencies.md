---
title: Vapi vs Retell AI for agencies, which voice platform to pick
date: 2026-11-25
description: Vapi vs Retell AI compared for agencies building voice agents for clients, with real per minute costs, concurrency, workspaces, compliance and build style.
tags: Voice AI, Agencies
---

Vapi vs Retell AI comes down to how you want to build. Vapi is a developer first platform where you pick every part of the stack (transcriber, model, voice, telephony) and pay a $0.05 per minute hosting fee plus those providers at cost. Retell AI bundles more into one per minute price, gives you 20 concurrent calls from day one and has a visual flow builder that is easier to hand to a non-developer on your team.

I build voice agents on both, mostly receptionists and outbound calling assistants. Below: real costs, limits and a table to decide.

## Vapi vs Retell AI: the short answer

- **Pick Vapi** if you or your developer like configuring things in detail, you want to swap models and voices freely, and you plan to connect it to Make.com, n8n or your own backend.
- **Pick Retell AI** if you want a predictable per minute bill, you need more than a handful of calls at the same time without paying for a plan, or a less technical teammate will maintain the agents.

Both can answer calls, call a webhook mid conversation, transfer to a human and book appointments. The difference shows up in cost structure, concurrency and who on your team does the upkeep.

## How Vapi and Retell AI price a minute

This is where most comparisons go wrong, because the headline numbers measure different things. All figures below come from the [Vapi pricing page](https://vapi.ai/pricing) and the [Retell AI pricing page](https://www.retellai.com/pricing), checked on 25 November 2026.

**Vapi** charges $0.05 per minute for hosting. Speech to text, the language model and the voice are passed through at provider cost with no markup. Vapi's own phone numbers and SIP are free; if you bring Twilio, Twilio bills you separately ($0.008 per minute inbound and $0.014 outbound, as listed on Vapi's page).

**Retell AI** builds the price from parts: $0.055 per minute for voice infrastructure, $0.015 per minute for its platform voices, then the model you choose, then telephony ($0.015 per minute on its US Twilio numbers, and no charge if you bring your own SIP trunk). Retell publishes a total range of $0.07 to $0.31 per minute depending on those choices.

### Example cost at 1,000 minutes a month

This is an estimate, not a quote. Your model and voice choice moves the total more than anything else.

| Line item | Vapi | Retell AI |
|---|---|---|
| Platform | $50 hosting | $55 voice infrastructure |
| Transcriber | about $10 (Deepgram) | included in infrastructure |
| Model | $8 to $45 (OpenAI, depends on model) | about $13 (GPT 4.1 mini at $0.0128/min) |
| Voice | $15 to $24 (ElevenLabs) | $15 (platform voice) |
| Telephony | $0 on Vapi numbers | about $15 on Retell numbers, plus $2 per number |
| **Estimated total** | **$82 to $129** | **about $100** |

The Vapi range is the one its own calculator shows for 1,000 minutes. The Retell figure is my sum of its listed component prices. In practice the two land in the same area for a standard receptionist. The real difference is predictability: Retell's bill is easier to forecast and to resell at a fixed price per minute, while Vapi rewards you for shopping around on models and voices.

## Concurrent calls: the limit agencies hit first

Concurrency is how many calls can be live at once. For one clinic, four lines is plenty. For an agency running ten clients on one account, it is not.

- **Vapi:** 4 concurrent calls on pay as you go, 10 on the Core package ($29 per month), 30 on Pro (10% of the hosting fee, $999 per month minimum). Extra lines cost $10 each per month.
- **Retell AI:** 20 concurrent calls included on every account. Extra capacity costs $8 per call per month. There is also an optional burst add-on so calls above your limit still connect, at $0.10 per minute extra.

If you run outbound campaigns, this matters even more. An outbound calling assistant that dials a list will hit four lines on Vapi within seconds. I cover that type of build in my [AI outbound calling assistant](/work/ai-outbound-calling-assistant/) case study.

## Client workspaces and white label

Agencies need to keep each client separate: their prompts, numbers, call logs and billing.

Vapi uses "organizations" for this. Pay as you go and Core include 2, Pro includes 10, and each extra one is $20 per month. That gives you a clean split per client, but count it into your margin.

Retell's pricing page does not list a per workspace fee. A common way to organise clients there is one agent and one phone number per client, with reporting handled outside the platform. Decide on your structure before you commit, because moving 15 clients later is painful.

Neither platform is the client facing product on its own. The white label part, meaning the dashboard your client logs into, usually comes from your CRM (often GoHighLevel) or a small portal you build. If you already run GoHighLevel, my post on [GoHighLevel missed call text back](/blog/gohighlevel-missed-call-text-back/) shows how to pair a voice agent with an SMS fallback in a snapshot.

## Building the agent: JSON and tools vs a visual flow

**Vapi** is built around assistants you configure in the dashboard or through the API. When the assistant needs to do something (check a calendar, book a slot), it calls a custom tool, which sends a request to your server URL. For bigger jobs, Vapi has [Squads](https://docs.vapi.ai/squads): several focused assistants that hand the call to each other while keeping context, for example a front desk assistant that passes billing questions to a billing assistant.

**Retell AI** gives you two styles. Single and multi prompt agents work much like Vapi assistants. Conversation flow agents split the call into nodes, each with its own instructions or a function to run, connected by conditions you draw on a canvas. That visual flow is the main reason I suggest Retell to agencies whose account managers want to edit scripts without touching JSON.

Both send function results back to the model as text. On Vapi the reply your server sends must have `result` as a flat string; I go through that exact format in [how to build an AI receptionist with Vapi and Make.com](/blog/build-ai-receptionist-vapi-make/).

## Compliance for clinics and regulated clients

If your client is a clinic handling patient details, compliance can decide this for you.

- Vapi offers HIPAA as an add-on at $2,000 per month.
- Retell lists HIPAA and a BAA on its pay as you go plan without a separate fee.

For one small clinic, a $2,000 monthly add-on usually decides it.


## Decision table

| If this is true for you | Lean towards |
|---|---|
| A developer owns the build and wants full control of models and voices | Vapi |
| You want to resell at a fixed price per minute | Retell AI |
| You need more than 10 calls at once without a monthly package | Retell AI |
| Non technical staff will edit call scripts | Retell AI |
| You want several specialist assistants handing off on one call | Vapi (Squads), or Retell multi prompt |
| You need HIPAA for a small clinic | Retell AI |
| Your logic lives in Make.com or n8n and the voice layer should stay thin | Either, slight edge to Vapi |

## Common mistakes when choosing

1. **Comparing $0.05 with $0.07.** Vapi's number is hosting only. Always compare the full minute: platform, transcriber, model, voice and telephony.
2. **Testing with one call at a time.** Your demo works, then Monday morning brings six calls at once and the fifth caller gets a busy line. Check concurrency against your busiest hour, not your average.
3. **Picking the biggest model.** On both platforms the model is the line that swings cost the most. A receptionist that books appointments rarely needs the most expensive model. Test a smaller one first.
4. **Forgetting per client overhead.** Extra organizations, phone numbers and concurrency lines are small monthly fees that add up across a client roster. Put them in your pricing sheet.
5. **Locking logic inside the platform.** Keep booking, CRM updates and follow ups in Make.com, n8n or your CRM. Then switching voice platforms later is a prompt and webhook change, not a rebuild.

## What I would do next

If you are still unsure, build the same small receptionist on both: one prompt, one booking tool, one transfer to a human. Run 20 test calls on each, with interruptions and background noise, and compare how it sounds and what the usage page says afterwards.

You can see what a finished build looks like in my [AI voice receptionist](/work/ai-voice-receptionist/) project. If you want a voice agent built for your agency or your clients, [tell me about it](/#contact).
