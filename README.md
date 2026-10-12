# EVERFALL — AI Feature Film Project

**Project folder:** `everfall-film/` — your complete AI feature-film production system.

🔗 **Studio (live):** https://studio-j4308uw0q-aniruddha-adaks-projects.vercel.app · **Repo:** https://github.com/aniruddhaadak80/everfall-film

**Genre:** Superhero action-fantasy (Avengers-style team movie)
**Language of the film:** Simple English (easy to understand), with some Bengali flavor for the city
**Target quality:** 1080p minimum, 4K final pass planned. Photorealistic looks.
**Made by:** You (the director) + AI (me, the production pipeline)

---

## The honest plan (read this first)

A 10–20 hour movie is a huge job. A normal studio needs **2–3 years and $200M+** for that,
with 500+ artists. AI makes it 100× cheaper and faster, but still real work.

So we do it **part by part**, like you said. Each part is 4–8 minutes and is fully finished
(music, sound, voices, color). Later parts slot in like chapters.

| Stage | What we make | Status |
|---|---|---|
| Pre-production | Story bible, characters, script, shot list, music plan | DONE (this folder) |
| Part 01 "The Crack" | 16 shots, 1080p, sound + voices, final cut | READY TO FILM (needs video API credits) |
| Parts 02–20 | Same pipeline, repeat | Later — you join in |

Cost/time math for Part 01 (16 shots × ~8 seconds):
- Video generation: ~2 minutes of footage → roughly $10–$60 in API credits (depends on model)
- Everything else (script, prompts, edit plan): done by AI, free

Full movie scope (honest): a 2-hour movie ≈ 7,000+ shots. With this pipeline that is
about 6–12 months of part-by-part work — very doable with AI, not doable in one night.

---

## What is inside this folder

```
01-STORY-BIBLE.md      the world, the rules, the full story arc (all parts)
02-CHARACTERS.md       all 7 characters: face, body, voice, costume, power — ultra detailed
03-SCRIPT-PART-01.md   the full script for Part 01 with dialogue
04-SHOT-LIST-PART-01.md every shot: camera, time, sound, exact AI prompt
05-PROMPTS.md          copy-paste prompt bank for each video model
06-MUSIC-AND-SOUND.md  music themes + cue sheet + sound design plan
PIPELINE.md            how to film a part from start to finish
scripts/               one-command generators and assembly
shots/                 where finished video clips get saved
```

## How to start

```bash
bun install
bun run validate     # 170 consistency checks across the whole project
bun run test         # 22 vitest cases
bun run dev          # → http://localhost:5173 (film studio dashboard)
```

Video pipeline (needs the `belt` CLI + API credits):

1. Install the video CLI (`belt`) — ask permission for global install first
2. `bun scripts/make_characters.mjs` → makes 8 character look sheets
3. `bun scripts/film_part01.mjs` → generates all 23 shots in 1080p with sound
4. `bun scripts/assemble_part01.mjs` → cuts them into the final Part 01 movie file
