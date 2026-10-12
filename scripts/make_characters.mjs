#!/usr/bin/env node
/**
 * EVERFALL — make_characters.mjs
 * Generates the 8 character look sheets (one image per character) so every
 * later shot keeps the same face. Uses the belt CLI.
 *
 * Usage: bun scripts/make_characters.mjs
 * Env:   BELT_IMAGE_MODEL — override the image app id
 *        (run `bun x belt app list --category image` to see options)
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const looksDir = join(root, 'looks')
mkdirSync(looksDir, { recursive: true })

const IMAGE_MODEL = process.env.BELT_IMAGE_MODEL || 'infsh/ai-image-generation'

const CHARACTERS = [
  {
    file: 'aarav.png',
    prompt:
      'Photorealistic portrait of a 24-year-old Indian man, short messy black hair, warm brown skin, thin tired face, small scar on left eyebrow, soft kind eyes, wearing a grey torn hoodie, blue glowing ring tattoos on his neck and left hand, cinematic studio lighting, looking straight at camera, ultra detailed skin texture, 85mm lens, movie poster quality',
  },
  {
    file: 'lena.png',
    prompt:
      'Photorealistic portrait of a 31-year-old woman detective, East European features, sharp cheekbones, short dark hair behind ears, grey-green tired eyes, wearing a worn brown leather jacket over a dark turtleneck, cinematic noir lighting, looking straight at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    file: 'bo.png',
    prompt:
      'Photorealistic portrait of a 13-year-old Bangladeshi-Indian street boy, thin build, big round glasses taped at corner, curly dusty black hair, missing front tooth, huge happy grin, wearing an oversized yellow rain jacket, cinematic warm lighting, looking at camera, ultra detailed skin, 50mm lens, movie quality',
  },
  {
    file: 'rose.png',
    prompt:
      'Photorealistic portrait of a 58-year-old Indian nun, silver hair in tight bun, dark brown skin, deep wise face lines, calm hawk-like eyes, wearing a simple white cotton saree with thin blue border, cinematic soft lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    file: 'aiko.png',
    prompt:
      'Photorealistic portrait of a 36-year-old Japanese physicist woman, sharp black bob haircut, red framed glasses, pale skin, calm expression, small burn scar on right wrist, wearing a white lab coat over black shirt, cinematic cool lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    file: 'ghost.png',
    prompt:
      'Photorealistic portrait of a mysterious 20-year-old androgynous person, long black hair with one white streak, grey eyes with a faint gold ring, soft blurry features, wearing an oversized grey sweater and loose black trousers, barefoot, cinematic moody lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    file: 'vane.png',
    prompt:
      'Photorealistic portrait of a 62-year-old wealthy man, silver hair combed back, short grey beard, deep calm blue eyes, small red mark under left eye, wearing a black three-piece suit with silver pocket watch, black leather gloves, cinematic dramatic lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    file: 'archivist.png',
    prompt:
      'Photorealistic portrait of an 80-year-old blind Indian woman, white hair, thick round glasses, deep smile lines, holding a small cup of tea, warm bookshop lighting, looking slightly up, ultra detailed, 85mm lens, movie quality',
  },
]

function belt(args) {
  execFileSync('bun', ['x', 'belt', ...args], { stdio: 'inherit' })
}

console.log(`🎨 EVERFALL character look sheets → looks/  (image model: ${IMAGE_MODEL})`)

for (const c of CHARACTERS) {
  const out = join(looksDir, c.file)
  if (existsSync(out)) {
    console.log(`✓ ${c.file} exists — skipping`)
    continue
  }
  console.log(`\n▶ ${c.file}`)
  belt(['app', 'run', IMAGE_MODEL, '--input', JSON.stringify({ prompt: c.prompt, aspect_ratio: '2:3' })])
  console.log(`  (move the generated image to looks/${c.file})`)
}

console.log('\nDone. Place each generated image in looks/ with the matching filename.')
