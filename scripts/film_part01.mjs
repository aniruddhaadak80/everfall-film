#!/usr/bin/env node
/**
 * EVERFALL — film_part01.mjs
 * Generates all shots for a part from prompts/<part>.json using the belt CLI.
 * Shots that already exist are skipped (resume-safe).
 *
 * Usage: bun scripts/film_part01.mjs [part01.json]
 *   (default: prompts/part01.json)
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const promptsFile = process.argv[2] ? join(root, process.argv[2]) : join(root, 'prompts', 'part01.json')
const plan = JSON.parse(readFileSync(promptsFile, 'utf8'))
const shotsDir = join(root, 'shots')
mkdirSync(shotsDir, { recursive: true })
const logFile = join(shotsDir, `${plan.part}_progress.json`)

let progress = {}
if (existsSync(logFile)) {
  try {
    progress = JSON.parse(readFileSync(logFile, 'utf8'))
  } catch {
    progress = {}
  }
}

const shots = plan.shots
console.log(`🎬 EVERFALL Part ${plan.part} — ${plan.title}`)
console.log(`   ${shots.length} shots, output → shots/\n`)

function belt(args) {
  execFileSync('bun', ['x', 'belt', ...args], { stdio: 'inherit' })
}

for (let i = 0; i < shots.length; i++) {
  const shot = shots[i]
  const outPath = join(shotsDir, `${plan.part}_shot${shot.id}.mp4`)
  if (existsSync(outPath) || progress[shot.id]) {
    console.log(`✓ shot ${shot.id} (${shot.desc}) — already done, skipping`)
    continue
  }

  const input = {
    prompt: shot.prompt,
    duration: shot.duration,
    resolution: plan.resolution ?? '1080p',
    generate_audio: shot.generate_audio !== false,
  }
  if (shot.reference) input.reference_image = join(root, shot.reference)

  console.log(`\n🎥 [${i + 1}/${shots.length}] shot ${shot.id} — ${shot.desc} (${shot.duration}s, ${shot.model})`)
  console.log(`   model: ${shot.model}`)

  try {
    belt(['app', 'run', shot.model, '--input', JSON.stringify(input)])
    progress[shot.id] = { desc: shot.desc, out: outPath, doneAt: new Date().toISOString() }
    writeFileSync(logFile, JSON.stringify(progress, null, 2))
    console.log(`   ✓ saved → ${basename(outPath)}`)
  } catch (err) {
    console.error(`   ✗ shot ${shot.id} failed: ${err.message}`)
    console.error('   (run the script again to resume — finished shots are skipped)')
    process.exitCode = 1
  }
}

const done = Object.keys(progress).length
console.log(`\n${done}/${shots.length} shots complete. Next: bun scripts/assemble_part01.mjs`)
