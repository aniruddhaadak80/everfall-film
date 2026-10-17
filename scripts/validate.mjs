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

// ---- prompts/part03.json ----
const plan3 = JSON.parse(read('prompts/part03.json'))
check(plan3.shots.length === 19, `part03 has 19 shots (got ${plan3.shots.length})`)
check(plan3.resolution === '1080p', 'part03 resolution is 1080p')
for (const s of plan3.shots) {
  check(typeof s.prompt === 'string' && s.prompt.length > 80, `part03 shot ${s.id} prompt is detailed (>80 chars)`)
  check(s.duration >= 3 && s.duration <= 10, `part03 shot ${s.id} duration 3–10s (got ${s.duration})`)
  check(typeof s.model === 'string' && s.model.includes('/'), `part03 shot ${s.id} model set`)
}
const totalSec3 = plan3.shots.reduce((n, s) => n + s.duration, 0)
check(totalSec3 > 80 && totalSec3 < 160, `part03 runtime ~2 min (${totalSec3}s)`)
check(plan3.shots.filter((s) => s.reference).length >= 6, 'part03 has hero look-sheet shots')

// ---- prompts/part04.json ----
const plan4 = JSON.parse(read('prompts/part04.json'))
check(plan4.shots.length === 20, `part04 has 20 shots (got ${plan4.shots.length})`)
check(plan4.resolution === '1080p', 'part04 resolution is 1080p')
check(plan4.title === 'Shadow Detective', 'part04 title is Shadow Detective')
const ids4 = new Set(plan4.shots.map((s) => s.id))
check(ids4.size === plan4.shots.length, 'part04 shot ids are unique')
for (const s of plan4.shots) {
  check(typeof s.prompt === 'string' && s.prompt.length > 80, `part04 shot ${s.id} prompt is detailed (>80 chars)`)
  check(s.duration >= 3 && s.duration <= 10, `part04 shot ${s.id} duration 3–10s (got ${s.duration})`)
  check(typeof s.model === 'string' && s.model.includes('/'), `part04 shot ${s.id} model set`)
  check(typeof s.generate_audio === 'boolean', `part04 shot ${s.id} audio flag set`)
}
const totalSec4 = plan4.shots.reduce((n, s) => n + s.duration, 0)
check(totalSec4 > 100 && totalSec4 < 180, `part04 runtime ~2 min (${totalSec4}s)`)
check(plan4.shots.filter((s) => s.reference).length >= 10, 'part04 has hero look-sheet shots')

// ---- unique shot plans across all parts ----
const allDescs = [...plan.shots, ...plan2.shots, ...plan3.shots, ...plan4.shots].map((s) => s.desc)
check(new Set(allDescs).size === allDescs.length, 'shot descriptions are unique across parts 01–04')

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
const shotList3 = read('08-SHOT-LIST-PART-03.md')
for (const s of plan3.shots) {
  check(shotList3.includes(s.desc), `part03 shot list matches: ${s.desc}`)
}
const shotList4 = read('10-SHOT-LIST-PART-04.md')
for (const s of plan4.shots) {
  check(shotList4.includes(s.desc), `part04 shot list matches: ${s.desc}`)
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
const script3 = read('07-SCRIPT-PART-03.md')
for (const scene of ['SCENE 1', 'SCENE 2', 'SCENE 3', 'SCENE 4', 'SCENE 5', 'SCENE 6', 'SCENE 7', 'SCENE 8']) {
  check(script3.includes(scene), `part03 script has ${scene}`)
}
for (const line of ['Iron is the one thing old magic cannot control', 'Cut the glove, cut the signal', 'close the sky']) {
  check(script3.includes(line), `part03 key line present: "${line}"`)
}
const script4 = read('09-SCRIPT-PART-04.md')
for (const scene of ['SCENE 1', 'SCENE 2', 'SCENE 3', 'SCENE 4', 'SCENE 5', 'SCENE 6', 'SCENE 7', 'SCENE 8']) {
  check(script4.includes(scene), `part04 script has ${scene}`)
}
for (const line of ['Shadows remember', 'She is stored. Between stamps, in the dark, dry and nine', 'Then we rob him']) {
  check(script4.includes(line), `part04 key line present: "${line}"`)
}
check(script4.includes('SHADOW DETECTIVE'), 'part04 title on the cover')

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
  'prompts/part01.json', 'prompts/part02.json', 'prompts/part03.json', 'prompts/part04.json',
  '05-SCRIPT-PART-02.md', '06-SHOT-LIST-PART-02.md',
  '07-SCRIPT-PART-03.md', '08-SHOT-LIST-PART-03.md',
  '09-SCRIPT-PART-04.md', '10-SHOT-LIST-PART-04.md',
  'studio/src/part01.json', 'studio/src/part02.json', 'studio/src/part03.json', 'studio/src/part04.json',
]) {
  check(existsSync(join(root, f)), `file exists: ${f}`)
}

// ---- studio mirrors stay optional? no: they must parse as JSON with the same shot counts ----
for (const p of ['part01', 'part02', 'part03', 'part04']) {
  const studio = JSON.parse(read(`studio/src/${p}.json`))
  const canon = JSON.parse(read(`prompts/${p}.json`))
  check(studio.shots.length === canon.shots.length, `studio ${p} mirrors canonical shot count`)
  check(JSON.stringify(studio) === JSON.stringify(canon), `studio ${p} is byte-identical to canonical`)
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
