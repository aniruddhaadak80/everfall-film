# EVERFALL — How to film a part (the pipeline)

*Simple English. This is the factory. You give it a shot list, it gives you a finished movie file.*

---

## The 6 steps of one part

```
SHOT LIST ──► 1. LOOK SHEETS ──► 2. FILM SHOTS ──► 3. VOICES ──► 4. SOUND ──► 5. EDIT ──► 6. FINAL CUT
 (done)      (images)          (video AI)       (TTS)       (foley/music)   (assemble)   (1080p/4K)
```

### 1. Look sheets (character consistency)
Make ONE photo per character. Every shot after uses that photo as the "reference" so the
same face appears in the whole movie. Without this step, the faces change every shot.

- Tool: any good image AI (or `belt app list --category image`)
- Prompts: see **02-CHARACTERS.md** (each character has a LOOK SHEET PROMPT)
- Save as: `looks/aarav.png`, `looks/lena.png`, `looks/bo.png`, `looks/rose.png`,
  `looks/aiko.png`, `looks/ghost.png`, `looks/vane.png`, `looks/archivist.png`

### 2. Film the shots
- Tool: `belt app run bytedance/seedance-2-0` (best: 1080p + sound) or
  `belt app run google/veo-3-1` (best quality) — see 04-SHOT-LIST-PART-01.md for exact prompts
- Shots with characters use **image-to-video or reference** so the face stays the same
- Save each clip as `shots/shot01.mp4` … `shots/shot20.mp4`

### 3. Voices (dialogue)
- Uses text-to-speech with the voice settings per character (see 06-MUSIC-AND-SOUND.md)
- For talking close-ups, use a lipsync model (OmniHuman / Fabric / PixVerse) with the voice file
- Save as `audio/vox_aarav_01.mp3` etc.

### 4. Music and sound
- Generate the 6 themes ONCE (keep the files forever, reuse in every part)
- Add foley per shot with `belt app run infsh/hunyuanvideo-foley`

### 5. Edit
- `bun scripts/assemble_part01.mjs` — cuts the 20 clips in order, adds crossfades,
  mixes music + voices + foley, and exports `EVERFALL_PART01_final.mp4` (1080p)

### 6. Final pass
- Upscale to 4K with `belt app run falai/topaz-video-upscaler` (optional)
- Ship it.

---

## Commands (quick reference)

```bash
# look sheets + everything about the CLI
bun scripts/make_characters.mjs        # generates the 8 look-sheet images
bun scripts/film_part01.mjs            # generates all 20 video shots, 1080p
bun scripts/assemble_part01.mjs        # cuts + mixes the final movie file

# manual single shot (example)
belt app run bytedance/seedance-2-0 --input '{
  "prompt": "<paste one shot prompt from 04-SHOT-LIST-PART-01.md>",
  "duration": 8,
  "resolution": "1080p",
  "generate_audio": true
}'
```

## Money and time (honest)

| Part | Shots | Video seconds | API cost (rough) | Wall time |
|---|---|---|---|---|
| Part 01 (this one) | 20 | ~122s | $10–$60 | 1–2 hours (models run in parallel) |
| A 45-min episode | ~500 | ~4,000s | $400–$2,000 | 1–2 days |
| The full 2h movie | ~7,200 | ~58,000s | $6k–$40k + your patience | months |

*The pipeline is the only hard part. Once it runs, every later part is copy-paste.*

## Rules for quality (do not break these)

1. **One look sheet per character, forever.** Never regenerate a face mid-movie.
2. **Same magic colors** every time: cold blue inside, gold sparks, red ONLY for Vane.
3. **One camera move per shot.** AI fights you if the shot moves twice.
4. **Keep shots under 10 seconds.** Longer clips lose detail.
5. **Never let AI put text on screen.** Only the title card is allowed.
6. **Silence is a tool.** Use the 1-second silence after The Crack every part.
