import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const filmRoot = join(studioRoot, '..')

describe('studio data sync', () => {
  it('studio shot plan matches the canonical prompts/part01.json', () => {
    const a = readFileSync(join(studioRoot, 'src', 'part01.json'), 'utf8')
    const b = readFileSync(join(filmRoot, 'prompts', 'part01.json'), 'utf8')
    expect(a).toBe(b)
  })

  it('studio part02 copy matches the canonical prompts/part02.json', () => {
    const a = readFileSync(join(studioRoot, 'src', 'part02.json'), 'utf8')
    const b = readFileSync(join(filmRoot, 'prompts', 'part02.json'), 'utf8')
    expect(a).toBe(b)
  })

  it('studio part03 copy matches the canonical prompts/part03.json', () => {
    const a = readFileSync(join(studioRoot, 'src', 'part03.json'), 'utf8')
    const b = readFileSync(join(filmRoot, 'prompts', 'part03.json'), 'utf8')
    expect(a).toBe(b)
  })

  it('studio part04 copy matches the canonical prompts/part04.json', () => {
    const a = readFileSync(join(studioRoot, 'src', 'part04.json'), 'utf8')
    const b = readFileSync(join(filmRoot, 'prompts', 'part04.json'), 'utf8')
    expect(a).toBe(b)
  })

  it('studio part05 copy matches the canonical prompts/part05.json', () => {
    const a = readFileSync(join(studioRoot, 'src', 'part05.json'), 'utf8')
    const b = readFileSync(join(filmRoot, 'prompts', 'part05.json'), 'utf8')
    expect(a).toBe(b)
  })

  it('every part folder copy exists for parts 01-05', () => {
    for (const p of ['part01', 'part02', 'part03', 'part04', 'part05']) {
      expect(existsSync(join(studioRoot, 'src', `${p}.json`))).toBe(true)
    }
  })
})
