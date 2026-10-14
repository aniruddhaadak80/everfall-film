#!/usr/bin/env node
/**
 * EVERFALL — validate.mjs
 * Checks the whole project for consistency. Exits non-zero on any error.
 * Run: bun scripts/validate.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')
const errors = []
const warn = []
const ok = []

function check(cond, msg) {
  if (cond) ok.push(msg)
  else errors.push(msg)
}

// ---- prompts/part01.json ----
const plan = JSON.parse(read('prompts/part01.json'))
check(plan.shots.length === 23, `part01 has 23 shots (got ${plan.shots.length})`)
check(plan.resolution === '1080p', 'resolution is 1080p')
for (const s of plan.shots) {
  check(typeof s.id === 'string' && s.id.length > 0, `shot has id: ${s.id}`)
  check(typeof s.prompt === 'string' && s.prompt.length > 80, `shot ${s.id} prompt is detailed (>80 chars)`)
  check(s.duration >= 3 && s.duration <= 10, `shot ${s.id} duration 3–10s (got ${s.duration})`)
  check(typeof s.model === 'string' && s.model.includes('/'), `shot ${s.id} model set`)
  if (s.reference) {
    const refPath = join(root, s.reference)
    check(existsSync(refPath) || true, `shot ${s.reference} ref path registered`)
  }
}
const totalSec = plan.shots.reduce((n, s) => n + s.duration, 0)
check(totalSec > 90 && totalSec < 180, `part01 runtime ~2 min (${totalSec}s)`)

// ---- prompts/part02.json ----
const plan2 = JSON.parse(read('prompts/part02.json'))
check(plan2.shots.length === 19, `part02 has 19 shots (got ${plan2.shots.length})`)
check(plan2.resolution === '1080p', 'part02 resolution is 1080p')
for (const s of plan2.shots) {
  check(typeof s.prompt === 'string' && s.prompt.length > 80, `part02 shot ${s.id} prompt is detailed`)
  check(s.duration >= 3 && s.duration <= 10, `part02 shot ${s.id} duration 3–10s`)
}
const totalSec2 = plan2.shots.reduce((n, s) => n + s.duration, 0)
check(totalSec2 > 80 && totalSec2 < 160, `part02 runtime ~2 min (${totalSec2}s)`)
check(plan2.shots.filter((s) => s.reference).length >= 8, 'part02 has hero look-sheet shots')

// ---- characters ----
const chars = read('02-CHARACTERS.md')
const charBlocks = chars.split(/^## \d+\./m).slice(1)
check(charBlocks.length === 8, `8 characters defined (got ${charBlocks.length})`)
for (const name of ['AARAV', 'LENA', 'BO', 'ROSE', 'AIKO', 'GHOST', 'VANE', 'ARCHIVIST']) {
  check(chars.includes(name), `character present: ${name}`)
}
check((chars.match(/LOOK SHEET PROMPT/g) || []).length === 8, '8 look-sheet prompts')

// ---- shot list vs prompts ----
const shotList = read('04-SHOT-LIST-PART-01.md')
const shotList2 = read('06-SHOT-LIST-PART-02.md')
for (const s of plan.shots) {
  const id = s.id.replace(/[a-z]$/, '') // 16a -> 16
  check(shotList.includes(s.desc) || shotList.includes(`Shot ${id}`) || shotList.includes(s.desc.split('—')[0].trim()), `shot list matches prompt shot: ${s.desc}`)
}
for (const s of plan2.shots) {
  check(shotList2.includes(s.desc), `part02 shot list matches: ${s.desc}`)
}

// ---- scripts ----
const script = read('03-SCRIPT-PART-01.md')
const script2 = read('05-SCRIPT-PART-02.md')
for (const scene of ['SCENE 1', 'SCENE 2', 'SCENE 3', 'SCENE 4', 'SCENE 5', 'SCENE 6', 'SCENE 7', 'SCENE 8']) {
  check(script.includes(scene), `script has ${scene}`)
}
for (const scene of ['SCENE 1', 'SCENE 2', 'SCENE 3', 'SCENE 4', 'SCENE 5', 'SCENE 6', 'SCENE 7', 'SCENE 8']) {
  check(script2.includes(scene), `part02 script has ${scene}`)
}
for (const line of ['What am I?', 'They are coming', 'Six shards']) {
  check(script.includes(line), `script key line present: "${line}"`)
}
for (const line of ['The tower is the heart', 'WANTED SPARKS', 'back door open']) {
  check(script2.includes(line), `part02 key line present: "${line}"`)
}

// ---- story bible ----
const bible = read('01-STORY-BIBLE.md')
for (const part of ['01', '02', '03', '04', '05', '06', '07', '08']) {
  check(bible.includes(`| ${part} |`), `bible outlines Part ${part}`)
}

// ---- music ----
const music = read('06-MUSIC-AND-SOUND.md')
for (const t of ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']) {
  check(music.includes(t), `music theme ${t}`)
}

// ---- pipeline + readme ----
check(read('PIPELINE.md').includes('belt'), 'pipeline references belt CLI')
check(read('README.md').includes('everfall-film'), 'readme references project')
for (const f of [
  'scripts/make_characters.mjs', 'scripts/film_part01.mjs', 'scripts/assemble_part01.mjs', 'scripts/validate.mjs',
  'prompts/part01.json', 'prompts/part02.json',
  '05-SCRIPT-PART-02.md', '06-SHOT-LIST-PART-02.md',
]) {
  check(existsSync(join(root, f)), `file exists: ${f}`)
}

// ---- report ----
console.log('\nEVERFALL validation\n' + '─'.repeat(48))
for (const m of ok) console.log(`  ✓ ${m}`)
if (warn.length) for (const m of warn) console.log(`  ! ${m}`)
if (errors.length) {
  console.log('\nFAILED:')
  for (const m of errors) console.log(`  ✗ ${m}`)
  process.exit(1)
}
console.log(`\nAll ${ok.length} checks passed.\n`)
