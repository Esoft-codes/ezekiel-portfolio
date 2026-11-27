---
title: Vapi assistant interrupting callers? How to fix the turn taking
date: 2026-11-27
description: Your Vapi assistant interrupting callers mid sentence, or stopping at every "mm-hmm"? Here are the exact speaking plan settings and prompt fixes I use.
tags: Voice AI
---

If your Vapi assistant is interrupting callers, the cause is almost always one of two settings: the **start speaking plan** (the assistant decides the caller has finished too early and jumps in) or the **stop speaking plan** (the assistant goes quiet at every "okay" or bit of background noise, then restarts awkwardly). Fix the first with smart endpointing and a slightly longer wait, fix the second by making the assistant wait for a few real words before it yields. Then tighten the prompt so the assistant gives callers fewer reasons to talk over it.

## Which kind of interruption do you have?

"It keeps interrupting" can mean two opposite things, and the fix for one makes the other worse. Listen to three or four call recordings and sort what you hear:

| What you hear on the recording | What is happening | Setting to change |
|---|---|---|
| Caller pauses to think ("my number is 080... 3...") and the assistant jumps in | End of turn detected too early | Start speaking plan |
| Caller is reading an address or booking reference and gets cut off between parts | Endpointing does not understand numbers and lists | Start speaking plan, transcription endpointing |
| Assistant stops mid sentence when the caller says "mm-hmm" or "okay" | Every backchannel counts as an interruption | Stop speaking plan |
| Assistant stops when a TV, a car or a coworker makes noise | Voice activity detection is too sensitive | Stop speaking plan, background noise |
| Both talk at once, then both stop, then both start again | Backoff and wait times are fighting | Both plans |

Change one plan at a time, or you will not know what fixed it.

## Fix 1: the assistant talks before the caller is done

This is the start speaking plan. Vapi's default wait before speaking is 0.4 seconds, which is short for someone thinking out loud or reading out a phone number.

1. **Turn on smart endpointing.** In the dashboard, open the assistant, go to **Advanced**, expand **Start Speaking Plan** and pick a smart endpointing provider. Vapi recommends **LiveKit** for English and its own **Vapi** endpointing for other languages. Smart endpointing predicts whether the caller has actually finished, instead of reacting to silence alone.
2. **Use a gentler wait function with LiveKit.** LiveKit maps "how likely is the caller still talking" (0 to 1) to a wait time in milliseconds. The dashboard starts with the Aggressive preset. For booking and support calls I start less aggressive, so the assistant waits longer when it is unsure.
3. **Raise `waitSeconds` a little.** For appointment or support lines I start between 0.6 and 0.8 seconds. Vapi's own guide suggests more than 1.0 second for tech support, where people pause mid thought.
4. **Check the transcription endpointing plan for numbers.** Vapi waits `onNumberSeconds` (default 0.5) after a number before treating the turn as over. If callers read out long phone numbers or order IDs in chunks, raise it.
5. **Or let the transcriber decide.** Some transcribers report end of turn themselves (Vapi lists Deepgram Flux and AssemblyAI). If you use one of those, leave smart endpointing off so the two systems do not compete.

Here is a starting point for an English booking line. Treat the numbers as my starting estimate, not a rule.

```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.7,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "200 + 8000 * x"
    },
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.1,
      "onNoPunctuationSeconds": 1.5,
      "onNumberSeconds": 0.8
    }
  }
}
```

The `waitFunction` above is the example from Vapi's docs: 200 ms when the model is confident the caller is done, up to about 8.2 seconds when it thinks they are still mid thought. If that feels slow on your calls, lower the multiplier.

## Fix 2: the assistant stops at every "mm-hmm"

This is the stop speaking plan, and it is the one most people miss. By default `numWords` is 0, which means Vapi uses voice activity alone: about 0.2 seconds of any sound from the caller and the assistant stops talking. That is fast, but it treats "okay", "right", a cough and a barking dog the same as "wait, that's wrong".

1. **Set `numWords` to 2 or 3.** Now the caller has to say a few transcribed words before the assistant yields. Vapi's docs give 2 to 3 words as the example for clinic appointment booking. It adds a short delay to real interruptions, which callers rarely notice.
2. **Add acknowledgement phrases.** Words in `acknowledgementPhrases` are ignored as interruptions, so "yeah" and "uh-huh" no longer cut the assistant off.
3. **Add interruption phrases.** Words in `interruptionPhrases` stop the assistant instantly, even with `numWords` above 0. This keeps "stop" and "hold on" working.
4. **If you keep `numWords` at 0, raise `voiceSeconds`.** It accepts up to 0.5 seconds. A higher value filters out short noises before they count as speech.
5. **Leave `backoffSeconds` near the default of 1 second.** This is how long the assistant stays quiet after being interrupted. Too low and it talks straight back over the caller; too high and the call feels dead.

```json
{
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.3,
    "backoffSeconds": 1,
    "acknowledgementPhrases": ["yeah", "okay", "uh-huh", "mm-hmm", "right", "alright", "sure"],
    "interruptionPhrases": ["stop", "hold on", "wait", "no no", "that's wrong"]
  }
}
```

For Nigerian callers I add the acknowledgements people actually use on the phone, like "ehen", "oya" and "ok sir". Check your transcripts to see how your transcriber spells them, then use that spelling.

## Fix 3: background noise on real phone lines

Test calls from a quiet room hide this problem. A salon with a hair dryer running or a customer calling from a danfo will trigger voice activity constantly. Vapi has a `backgroundSpeechDenoisingPlan` for this. Turn it on for noisy lines and pair it with the `numWords` change above, since word based interruption is far less sensitive to noise than voice activity alone.

## Fix 4: the prompt makes interruptions more likely

Settings fix timing. The prompt fixes how often a caller feels they need to cut in. Long answers and stacked questions invite crosstalk. I add a block like this to the system prompt:

```text
## Speaking style
- Keep every reply under 2 short sentences unless the caller asks for detail.
- Ask one question at a time, then stop and wait.
- When collecting a phone number, date or reference, let the caller finish,
  then read it back once to confirm. Never repeat it digit by digit while they are still speaking.
- If the caller interrupts you, do not repeat what you were saying from the start.
  Answer what they just said.
- Never fill silence with "Are you still there?" until the caller has been quiet
  for a while.
```

This pairs well with the booking flow from my post on [building an AI receptionist with Vapi and Make.com](/blog/build-ai-receptionist-vapi-make/). Tool calls are a common place for awkward overlaps, so keep the line the assistant says while a tool runs short ("One moment, checking the calendar.").

## How to test the fix before a client hears it

Run the same five calls after every change, from a real phone as well as the browser:

1. **The slow thinker.** Pause for two seconds mid sentence. Does it wait?
2. **The number reader.** Read a phone number in chunks of three or four digits.
3. **The nodder.** Say "mm-hmm" and "okay" while it explains opening hours. It should keep going.
4. **The real interrupter.** Say "wait, that's the wrong day" halfway through its sentence. It should stop.
5. **The noisy caller.** Call with music or a TV on in the background.

Listen to the recordings as well as the transcripts. Transcripts do not show overlapping speech well.

## Common mistakes

- **Raising `waitSeconds` to 2 or 3 seconds.** The assistant stops interrupting but every reply now has a long silence, and callers start talking into it, which causes the overlap you were trying to remove.
- **Running smart endpointing on top of a transcriber that already detects end of turn.** Pick one.
- **Copying one config to every client.** A clinic line, a restaurant line and an outbound sales line need different timing. If you run voice agents as an agency (I compare the platforms in [Vapi vs Retell AI for agencies](/blog/vapi-vs-retell-ai-agencies/)), keep one starting config per call type.
- **Testing only in the web widget.** A fix that sounds right in the browser can still fail on a real phone line.

## Next step

Start with the recordings. Sort what you hear into the table above, change one plan, run the five test calls, and repeat. Most assistants sound natural after two or three rounds. You can see the kind of receptionist I build in my [AI voice receptionist project](/work/ai-voice-receptionist/), and Vapi's [speech configuration guide](https://docs.vapi.ai/customization/speech-configuration) lists every setting mentioned here.

If your voice agent is still talking over customers and you want it fixed, [tell me about it](/#contact).
