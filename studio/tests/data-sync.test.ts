import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
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
})
