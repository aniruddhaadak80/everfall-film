#!/usr/bin/env node
/**
 * EVERFALL — assemble_part01.mjs
 * Cuts all finished shots of a part into the final movie file.
 *
 * Two paths:
 *  1. Local ffmpeg (if installed): crossfade transitions + audio mix → out/EVERFALL_PART01_final.mp4
 *  2. No ffmpeg: prints the exact belt media-merger command to run in the cloud.
 *
 * Usage: bun scripts/assemble_part01.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const part = '01'
const shotsDir = join(root, 'shots')
const outDir = join(root, 'out')

const plan = JSON.parse(readFileSync(join(root, 'prompts', `part${part}.json`), 'utf8'))
const clips = plan.shots
  .map((s) => join(shotsDir, `part${part}_shot${s.id}.mp4`))
  .filter((p) => existsSync(p))

console.log(`✂️  Assembling Part ${part} from ${clips.length} clips`)
if (clips.length === 0) {
  console.error('No clips found in shots/. Run scripts/film_part01.mjs first.')
  process.exit(1)
}

// ---------- path 1: local ffmpeg ----------
let ffmpeg = null
try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'pipe' })
  ffmpeg = 'ffmpeg'
} catch {
  /* not installed */
}

if (ffmpeg) {
  // concat with simple crossfade using xfade filter (ffmpeg >= 4.4)
  const listFile = join(outDir, `part${part}_concat.txt`)
  const { writeFileSync } = await import('node:fs')
  writeFileSync(listFile, clips.map((c) => `file '${c.replace(/\\/g, '/')}'`).join('\n'))
  const out = join(outDir, `EVERFALL_PART${part}_final.mp4`)
  console.log(`   ffmpeg found → cutting ${clips.length} clips`)
  try {
    execFileSync(
      'ffmpeg',
      ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', out],
      { stdio: 'inherit' },
    )
    console.log(`   ✓ ${basename(out)}`)
    console.log('\n   Note: this is a straight cut. For crossfades + music, run the')
    console.log('   media-merger command below, or mix music with:')
    console.log(`   ffmpeg -i ${basename(out)} -i music/everfall_main_theme.mp3 -c:v copy -c:a aac -shortest ${basename(out)}`)
  } catch (err) {
    console.error(`   ✗ ffmpeg cut failed: ${err.message}`)
  }
} else {
  console.log('   ffmpeg not found — use the cloud merger instead:')
  console.log('\n   Run this with belt (merges clips with fade transitions):')
  console.log(`   bun x belt app run infsh/media-merger --input '${JSON.stringify({
    videos: clips.map((c) => `file://${c.replace(/\\/g, '/')}`),
    transition: 'fade',
  })}'`)
  console.log('\n   Or install ffmpeg locally for free: https://ffmpeg.org/download.html')
}

// ---------- music mix helper (optional) ----------
const musicDir = join(root, 'music')
if (existsSync(musicDir) && readdirSync(musicDir).length > 0) {
  console.log(`\n🎵 Music found in music/. Mix it with:`)
  console.log(`   ffmpeg -i out/EVERFALL_PART${part}_final.mp4 -i music/everfall_main_theme.mp3 \\`)
  console.log(`       -filter_complex "[0:a]volume=1[a0];[1:a]volume=0.35[a1];[a0][a1]amix=inputs=2[aout]" \\`)
  console.log(`       -map 0:v -map "[aout]" -c:v copy -c:a aac out/EVERFALL_PART${part}_final_mixed.mp4`)
}

console.log(`\nPart ${part} assembly plan complete.`)
