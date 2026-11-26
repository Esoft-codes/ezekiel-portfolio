---
title: How to keep a product consistent in Google Flow video ads
date: 2026-11-26
description: How to keep a product consistent in Google Flow video ads with clean ingredient images, one fixed product description, and a shot list that stops label drift.
tags: AI Video, Product Ads
---

To keep a product consistent in Google Flow, stop asking the model to imagine your product. Give it clean reference images through Ingredients to Video, describe the product with the same exact block of text in every prompt, and plan the ad as short shots so each clip has one job. Then add the logo, price and call to action in the edit, not in the generation.

That is the short version. Below is the full method I use when I make AI product ads, including the shot list, a prompt you can copy, and the checks I run before a clip goes into the edit.

## Why products drift in AI video

A video model is good at "a bottle of serum on a marble counter". It is bad at "this bottle, with this cap, this label and this shade of amber". Every generation is a fresh guess, so with text alone you get a slightly different product in every shot: the cap changes shape, the label text turns to nonsense, the colour shifts between scenes.

For a character in a short film, small drift is forgivable. For a product ad it is not. The buyer needs to recognise the exact item they will receive. So consistency is the whole job.

## Which Google Flow models support product references

Flow changes often, so here is what Google's own [Flow models and features page](https://support.google.com/flow/answer/16352836?hl=en) lists, checked on 26 November 2026:

| Model | Ingredients/References to Video | Clip length | Video to Video editing |
|---|---|---|---|
| Omni Flash 1.2 (free) | Yes | 3 to 10 seconds | Yes |
| Omni Flash 1.2 (Google AI Plus, Pro, Ultra) | Yes | 3 to 15 seconds | Yes |
| Veo 3.1 Lite | Yes | 8 seconds only | No |

Two things to note. Google says Veo 3.1 Fast, Veo 3.1 Quality and Omni Flash 1.1 retire on 5 December 2026, so build new projects on Omni Flash 1.2 or Veo 3.1 Lite. And Omni Flash 1.2 can generate at 360p for one third of the credit cost of 720p, which matters a lot for the drafting step below.

## How to keep a product consistent in Google Flow, step by step

### 1. Start from real photos of the real product

Everything downstream copies your references, including their flaws. I ask for four photos, shot on a phone in daylight against a plain wall:

1. Front, straight on, label fully readable.
2. Three quarter angle.
3. Back or side, if it has text or a shape worth showing.
4. Close-up of the label or logo.

If the product has a lid, pump or strap, one extra photo of that detail saves a lot of regenerations later.

### 2. Clean them into ingredient images

Raw phone photos carry reflections, clutter and odd lighting into every scene. I clean each one into a studio-style packshot: product centred, neutral background, soft even light, nothing else in frame. Flow's built-in Nano Banana image models can do this edit. The rule while editing is simple: change the background and light, never the product. Zoom in and compare the label letter by letter with the original photo before you accept it.

### 3. Write one product block and never change it

This is the step most people skip. Write a short, factual description of the product and paste it, word for word, into every prompt. For example:

```text
PRODUCT: a 30ml amber glass dropper bottle with a matte black
rubber bulb and a gold collar. White rectangular label on the
front with the brand name in thin black capitals and a small
leaf icon above it. The bottle is about the height of a hand.
```

Same words, same order, every shot. If you describe the cap as "black" in one prompt and "dark grey" in the next, you have just asked for two different products.

### 4. Plan the ad as a shot list

A 15 to 30 second product ad is usually four to six shots. Plan them before you open Flow so each generation has one clear job. Here is the structure I start from:

| Shot | Purpose | Length | Flow mode |
|---|---|---|---|
| 1. Hook | Product in an unexpected, eye-catching moment | 3 to 5s | Ingredients to Video |
| 2. Problem or context | The situation the product fixes | 3 to 5s | Text to Video (product not needed) |
| 3. In use | A hand or person using it | 4 to 6s | Ingredients to Video |
| 4. Detail | Macro on texture, label or mechanism | 3 to 4s | Frames to Video from a cleaned packshot |
| 5. Hero | Clean product shot, room for text | 3 to 5s | Frames to Video, first and last frame |

Shots where the product is small or absent can go to plain text to video. Save the reference-driven modes for the shots where the product must be exact.

### 5. Prompt for the scene, not the product

The ingredients already show what the product looks like. The prompt should spend its words on camera, light and action. A shot 3 prompt might look like this:

```text
[PRODUCT block from step 3]

SHOT: close-up, slow push in. A woman's hand lifts the bottle
from a bathroom shelf and squeezes the dropper. Morning light
from a window on the left, soft shadows. Shallow depth of field,
background softly blurred. The label faces the camera the whole
time and stays readable.

AVOID: changing the bottle shape, extra text, a second bottle.
```

"The label faces the camera" sounds obvious, but if you don't say it, the model often turns the product around and invents a back label.

### 6. Draft cheap, then render the winners

I generate first passes in Omni Flash 1.2 at 360p. At one third of the 720p cost, I can afford several takes per shot and pick the one where the product holds up best. Only the chosen takes get regenerated at full resolution and, if the plan allows, upscaled. Always check the live credit cost in the prompt box settings before you generate, because Google adjusts pricing.

### 7. Fix clips instead of starting over

If a take is right except for one thing (the light is too warm, a background object is distracting), use Video to Video editing in Omni Flash 1.2 to change that one thing. Rerolling the whole shot risks losing the product consistency you already got.

### 8. Put the brand text in the edit

Generated text is still the weakest part of AI video. I let Flow make the moving images and add the logo, offer, price and call to action as overlays in the editor, on top of the hero shot. That way the words are always spelled right and you can change the offer without regenerating anything.

## Consistency checklist before a clip goes in the edit

I pause on the first frame, a middle frame and the last frame of every clip and check:

- Label text matches the real product, letter by letter.
- Cap, pump or closure has the same shape and colour as the reference.
- Proportions are right next to hands or other objects.
- Colour of the product matches across all shots under different light.
- There is only one product in frame (models love to duplicate).
- Nothing touches the product in a way that bends or melts it.

If a clip fails one of these, it does not go in the ad. A viewer forgives a strange background long before they forgive a wrong-looking product.

## Common mistakes

- **Using a cluttered product photo as the reference.** The model copies the clutter and mixes it into the product.
- **Describing the product differently in each prompt.** Small wording changes become visible design changes.
- **Asking one long clip to do everything.** A 15 second clip that has to hook, demonstrate and close will drift. Short shots with one job each stay on model.
- **Generating the logo and price.** Add them in the edit.
- **Skipping the frame-by-frame check.** Drift often shows up only in the last second of a clip, right where your cut is.
- **Building on models that are about to retire.** Check Google's model page before starting a long project.

## Where this fits in a real ad project

Product consistency is the foundation, but it is only one part of an ad that sells. Hook, pacing, sound and the offer matter just as much. You can see the kind of work this method feeds into on my [AI product ads](/work/ai-product-ads/) page, and the longer, story-driven side of it in [cinematic AI video](/work/ai-cinematic-video/). I'm writing up the craft side of AI video as part of this [daily working log](/blog/why-this-blog/), so expect posts on ad structure and UGC-style scripts next.

## Get a product ad made

If you sell a physical product and want ads where it looks exactly like the thing your customers will get, send me a few photos and tell me where the ad will run. [Tell me about it here](/#contact) and we can plan the shots together.
