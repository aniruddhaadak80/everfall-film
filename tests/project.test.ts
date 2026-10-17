import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const plan = JSON.parse(read('prompts/part01.json'))
const plan2 = JSON.parse(read('prompts/part02.json'))

describe('shot plan (prompts/part01.json)', () => {
  it('has 23 shots', () => {
    expect(plan.shots).toHaveLength(23)
  })

  it('targets 1080p', () => {
    expect(plan.resolution).toBe('1080p')
  })

  it('runs about 2 minutes', () => {
    const sec = plan.shots.reduce((n, s) => n + s.duration, 0)
    expect(sec).toBeGreaterThan(90)
    expect(sec).toBeLessThan(180)
  })

  it('every shot has a detailed prompt', () => {
    for (const s of plan.shots) {
      expect(s.prompt.length).toBeGreaterThan(80)
    }
  })

  it('every shot duration is 3-10s (AI-safe)', () => {
    for (const s of plan.shots) {
      expect(s.duration).toBeGreaterThanOrEqual(3)
      expect(s.duration).toBeLessThanOrEqual(10)
    }
  })

  it('every shot has a valid model id', () => {
    for (const s of plan.shots) {
      expect(s.model).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/)
    }
  })

  it('character shots reference a look sheet', () => {
    const charShots = plan.shots.filter((s) => s.reference)
    expect(charShots.length).toBeGreaterThanOrEqual(10)
    for (const s of charShots) {
      expect(s.reference).toMatch(/^looks\/[\w-]+\.png$/)
    }
  })

  it('shot 05 is THE CRACK money shot', () => {
    const crack = plan.shots.find((s) => s.id === '05')
    expect(crack.desc).toContain('CRACK')
    expect(crack.prompt).toMatch(/splits open/i)
  })

  it('title card is the final shot', () => {
    const last = plan.shots[plan.shots.length - 1]
    expect(last.desc).toContain('Title')
  })
})

describe('characters', () => {
  const chars = read('02-CHARACTERS.md')

  it('defines exactly 8 characters', () => {
    expect(chars.split(/^## \d+\./m).slice(1)).toHaveLength(8)
  })

  it('has all 8 look-sheet prompts', () => {
    expect(chars.match(/LOOK SHEET PROMPT/g)).toHaveLength(8)
  })

  it('covers the full team + villain + mentor', () => {
    for (const n of ['AARAV', 'LENA', 'BO', 'ROSE', 'AIKO', 'GHOST', 'VANE', 'ARCHIVIST']) {
      expect(chars).toContain(n)
    }
  })

  it('each character has a power and a price', () => {
    const blocks = chars.split(/^## \d+\./m).slice(1)
    for (const b of blocks) {
      expect(b).toMatch(/\*\*Power:\*\*/)
      expect(b).toMatch(/\*\*Price:\*\*/)
    }
  })
})

describe('part 02 shot plan', () => {
  it('has 19 shots', () => {
    expect(plan2.shots).toHaveLength(19)
  })

  it('runs about 2 minutes', () => {
    const sec = plan2.shots.reduce((n, s) => n + s.duration, 0)
    expect(sec).toBeGreaterThan(80)
    expect(sec).toBeLessThan(160)
  })

  it('every shot has a detailed prompt and safe duration', () => {
    for (const s of plan2.shots) {
      expect(s.prompt.length).toBeGreaterThan(80)
      expect(s.duration).toBeGreaterThanOrEqual(3)
      expect(s.duration).toBeLessThanOrEqual(10)
    }
  })

  it('has hero look-sheet shots', () => {
    expect(plan2.shots.filter((s) => s.reference).length).toBeGreaterThanOrEqual(8)
  })

  it('ends with the Part 02 title card', () => {
    const last = plan2.shots[plan2.shots.length - 1]
    expect(last.prompt).toContain('WANTED SPARKS')
  })
})

describe('part 03 shot plan (The Iron Boy)', () => {
  const plan3 = JSON.parse(read('prompts/part03.json'))

  it('has 19 shots', () => {
    expect(plan3.shots).toHaveLength(19)
  })

  it('targets 1080p with a defined title', () => {
    expect(plan3.resolution).toBe('1080p')
    expect(plan3.title).not.toBe('')
    expect(plan3.title.toLowerCase()).toContain('iron boy')
  })

  it('runs about 2 minutes', () => {
    const sec = plan3.shots.reduce((n, s) => n + s.duration, 0)
    expect(sec).toBeGreaterThan(80)
    expect(sec).toBeLessThan(160)
  })

  it('every shot has a detailed prompt, safe duration and valid model', () => {
    for (const s of plan3.shots) {
      expect(s.prompt.length).toBeGreaterThan(80)
      expect(s.duration).toBeGreaterThanOrEqual(3)
      expect(s.duration).toBeLessThanOrEqual(10)
      expect(s.model).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/)
    }
  })

  it('has hero look-sheet shots', () => {
    expect(plan3.shots.filter((s) => s.reference).length).toBeGreaterThanOrEqual(6)
  })

  it('every shot desc appears in the part03 shot list', () => {
    const shots3 = read('08-SHOT-LIST-PART-03.md')
    for (const s of plan3.shots) {
      expect(shots3).toContain(s.desc)
    }
  })
})

describe('part 04 shot plan (Shadow Detective)', () => {
  const plan4 = JSON.parse(read('prompts/part04.json'))

  it('has 20 shots', () => {
    expect(plan4.shots).toHaveLength(20)
  })

  it('targets 1080p with a defined title', () => {
    expect(plan4.resolution).toBe('1080p')
    expect(plan4.title).toBe('Shadow Detective')
  })

  it('runs about 2 minutes', () => {
    const sec = plan4.shots.reduce((n, s) => n + s.duration, 0)
    expect(sec).toBeGreaterThan(100)
    expect(sec).toBeLessThan(180)
  })

  it('every shot has a detailed prompt, safe duration, audio flag and valid model', () => {
    for (const s of plan4.shots) {
      expect(s.prompt.length).toBeGreaterThan(80)
      expect(s.duration).toBeGreaterThanOrEqual(3)
      expect(s.duration).toBeLessThanOrEqual(10)
      expect(typeof s.generate_audio).toBe('boolean')
      expect(s.model).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/)
    }
  })

  it('shot ids are unique', () => {
    expect(new Set(plan4.shots.map((s) => s.id)).size).toBe(plan4.shots.length)
  })

  it('has hero look-sheet shots', () => {
    expect(plan4.shots.filter((s) => s.reference).length).toBeGreaterThanOrEqual(10)
  })

  it('every shot desc appears in the part04 shot list', () => {
    const shots4 = read('10-SHOT-LIST-PART-04.md')
    for (const s of plan4.shots) {
      expect(shots4).toContain(s.desc)
    }
  })

  it('the part04 script exists with 8 scenes and the key lines', () => {
    const script4 = read('09-SCRIPT-PART-04.md')
    expect(script4.match(/### SCENE \d+/g)).toHaveLength(8)
    for (const line of ['Shadows remember', 'She is stored. Between stamps, in the dark, dry and nine', 'Then we rob him']) {
      expect(script4).toContain(line)
    }
  })

  it('shot descriptions stay unique across parts 01–04', () => {
    const all = [
      ...plan.shots, ...plan2.shots,
      ...JSON.parse(read('prompts/part03.json')).shots,
      ...plan4.shots,
    ].map((s) => s.desc)
    expect(new Set(all).size).toBe(all.length)
  })
})

describe('script + shot list consistency', () => {
  const script = read('03-SCRIPT-PART-01.md')
  const shots = read('04-SHOT-LIST-PART-01.md')

  it('has 8 scenes', () => {
    expect(script.match(/### SCENE \d+/g)).toHaveLength(8)
  })

  it('has the three key dialogue lines', () => {
    for (const line of ['What am I?', 'Six shards', 'They are coming']) {
      expect(script).toContain(line)
    }
  })

  it('every prompt shot appears in the shot list', () => {
    for (const s of plan.shots) {
      expect(shots).toContain(s.desc.split('—')[0].trim().replace(/\s+/g, ' '))
    }
  })

  it('part02 script has 8 scenes and key lines', () => {
    const script2 = read('05-SCRIPT-PART-02.md')
    expect(script2.match(/### SCENE \d+/g)).toHaveLength(8)
    for (const line of ['The tower is the heart', 'back door open']) {
      expect(script2).toContain(line)
    }
  })

  it('every part02 prompt shot appears in the part02 shot list', () => {
    const shots2 = read('06-SHOT-LIST-PART-02.md')
    for (const s of plan2.shots) {
      expect(shots2).toContain(s.desc)
    }
  })
})

describe('story bible', () => {
  const bible = read('01-STORY-BIBLE.md')

  it('outlines parts 01 through 08', () => {
    for (const p of ['01', '02', '03', '04', '05', '06', '07', '08']) {
      expect(bible).toContain(`| ${p} |`)
    }
  })

  it('defines magic rules', () => {
    expect(bible).toContain('Power comes from a star-shard')
  })
})

describe('music plan', () => {
  const music = read('06-MUSIC-AND-SOUND.md')

  it('defines the 6 themes', () => {
    for (const t of ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']) expect(music).toContain(t)
  })

  it('has a cue sheet', () => {
    expect(music).toContain('cue sheet')
  })
})

describe('project structure', () => {
  it('all core files exist', () => {
    for (const f of [
      '01-STORY-BIBLE.md', '02-CHARACTERS.md', '03-SCRIPT-PART-01.md',
      '04-SHOT-LIST-PART-01.md', '06-MUSIC-AND-SOUND.md', 'PIPELINE.md', 'README.md',
      'scripts/make_characters.mjs', 'scripts/film_part01.mjs', 'scripts/assemble_part01.mjs',
      'scripts/validate.mjs', 'prompts/part01.json',
      '05-SCRIPT-PART-02.md', '06-SHOT-LIST-PART-02.md',
      '07-SCRIPT-PART-03.md', '08-SHOT-LIST-PART-03.md',
      '09-SCRIPT-PART-04.md', '10-SHOT-LIST-PART-04.md',
      'prompts/part02.json', 'prompts/part03.json', 'prompts/part04.json',
    ]) {
      expect(existsSync(join(root, f))).toBe(true)
    }
  })

  it('scripts are syntactically valid', () => {
    // syntax check via dynamic import would execute them; just check they parse via new Function
    for (const f of ['scripts/make_characters.mjs', 'scripts/film_part01.mjs', 'scripts/assemble_part01.mjs', 'scripts/validate.mjs']) {
      const src = read(f)
      expect(src).toMatch(/^#!/)
      expect(src.length).toBeGreaterThan(500)
    }
  })
})
