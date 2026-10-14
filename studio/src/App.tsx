import { useEffect, useState } from 'react'
import { arc, characters, parts, themes, totalSeconds, type PartPlan, type Shot } from './data'
import { beltCommand, CopyButton, Section } from './components'

type Tab = 'overview' | 'story' | 'characters' | 'shots' | 'music' | 'pipeline'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'Story' },
  { id: 'characters', label: 'Characters' },
  { id: 'shots', label: 'Shot List' },
  { id: 'music', label: 'Music' },
  { id: 'pipeline', label: 'Pipeline' },
]

/* ---------- filmed-status tracking (localStorage) ---------- */
const LS_KEY = 'everfall:filmed'

function loadFilmed(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'))
  } catch {
    return new Set()
  }
}

function useFilmed() {
  const [filmed, setFilmed] = useState<Set<string>>(loadFilmed)
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify([...filmed]))
  }, [filmed])
  const toggle = (key: string) =>
    setFilmed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  return { filmed, toggle }
}

function ShotCard({ shot, part, filmed, onToggle }: { shot: Shot; part: string; filmed: Set<string>; onToggle: (k: string) => void }) {
  const [open, setOpen] = useState(false)
  const key = `${part}:${shot.id}`
  const done = filmed.has(key)
  return (
    <div className={`shot${shot.reference ? ' has-ref' : ''}${done ? ' filmed' : ''}`}>
      <div className="shot-head">
        <button
          type="button"
          className={`shot-check${done ? ' done' : ''}`}
          title={done ? 'mark as not filmed' : 'mark as filmed'}
          onClick={() => onToggle(key)}
        >
          {done ? '✓' : ''}
        </button>
        <button type="button" className="shot-main" onClick={() => setOpen((o) => !o)}>
          <span className="shot-id">{shot.id}</span>
          <span className="shot-desc">{shot.desc}</span>
          <span className="shot-meta">{shot.duration}s · {shot.model.split('/')[1]}</span>
          <span className={`shot-chevron${open ? ' open' : ''}`}>▾</span>
        </button>
      </div>
      {open && (
        <div className="shot-body">
          <p className="shot-prompt">{shot.prompt}</p>
          {shot.reference && <p className="shot-ref">look sheet: <code>{shot.reference}</code></p>}
          <div className="shot-actions">
            <CopyButton text={shot.prompt} label="copy prompt" />
            <CopyButton text={beltCommand(shot)} label="copy belt command" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('overview')
  const [partId, setPartId] = useState('01')
  const { filmed, toggle } = useFilmed()
  const part: PartPlan = partId === '02' ? parts[1] : parts[0]
  const partFilmed = part.shots.filter((s) => filmed.has(`${part.part}:${s.id}`)).length
  const allFilmed = parts.reduce((n, p) => n + p.shots.filter((s) => filmed.has(`${p.part}:${s.id}`)).length, 0)
  const allTotal = parts.reduce((n, p) => n + p.shots.length, 0)

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <span className="logo-mark">◉</span>
          <div>
            <h1>EVERFALL STUDIO</h1>
            <p className="tag">Part 01 “The Crack” — production dashboard</p>
          </div>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 'overview' && (
          <>
            <Section title="Production progress" right={<span className="pill">{allFilmed}/{allTotal} shots filmed</span>}>
              {parts.map((p) => {
                const done = p.shots.filter((s) => filmed.has(`${p.part}:${s.id}`)).length
                const pct = Math.round((done / p.shots.length) * 100)
                return (
                  <div key={p.part} className="progress-row">
                    <div className="progress-label">
                      <b>Part {p.part} — “{p.title}”</b>
                      <span className="muted">{done}/{p.shots.length} shots · {totalSeconds(p)}s of film</span>
                    </div>
                    <div className="progress"><span style={{ width: `${pct}%` }} /></div>
                  </div>
                )
              })}
            </Section>
            <Section title="The film" right={<span className="pill">1080p · sound + voices</span>}>
              <p className="logline">
                <b>EVERFALL.</b> The sky broke one night. Blue fire fell like rain and did not burn.
                Six strangers woke with star-shards inside them — and forty years of a patient man's
                plan woke with them.
              </p>
              <div className="stat-grid">
                <div className="stat"><b>{allTotal}</b><span>shots planned</span></div>
                <div className="stat"><b>{parts.reduce((n, p) => n + totalSeconds(p), 0)}s</b><span>of film</span></div>
                <div className="stat"><b>{characters.length}</b><span>characters</span></div>
                <div className="stat"><b>{parts[0].shots.filter((s) => s.reference).length + parts[1].shots.filter((s) => s.reference).length}</b><span>hero shots</span></div>
                <div className="stat"><b>{themes.length}</b><span>music themes</span></div>
                <div className="stat"><b>23</b><span>parts planned</span></div>
              </div>
            </Section>
            <Section title="Part 01 — “The Crack”" right={<span className="pill">8 scenes</span>}>
              <ol className="beats">
                <li>City at night. Trams, river, bridge. Nobody looks up.</li>
                <li>Aarav fixes a radio in his father's shop. News of a strange blue light.</li>
                <li><b>THE CRACK</b> — the sky splits in a straight line. One second of total silence.</li>
                <li>Bridge collapses. Aarav wakes. A girl falls — the iron stops in mid-air.</li>
                <li>Burned library, books turned to glass. Lena meets Aarav. A blue handprint on her wrist.</li>
                <li>The Four — Bo's scream, Rose's light blade, Aiko's gravity, Ghost's gold-ringed eye.</li>
                <li>Vane at the tower: <i>“Six shards. All awake.”</i> His eye glows red.</li>
                <li>The Archivist: <i>“They are coming. Good. The gods are lonely.”</i> Title card.</li>
              </ol>
            </Section>
          </>
        )}

        {tab === 'story' && (
          <>
            <Section title="The world">
              <p>3,000 years ago the star-city <b>Everfall</b> fell and buried itself under a sleeping city.
              Six gods died in the fall. Tonight the sky cracks and their power wakes in six strangers.</p>
              <ul className="rules">
                <li>Power comes from a <b>star-shard</b>. Hurt the shard, hurt the hero.</li>
                <li>Every use has a <b>price</b> — memory, warmth, time, sound.</li>
                <li>Magic looks cold blue inside the body, gold sparks when used, <b>red only for Vane</b>.</li>
                <li>Old magic fears <b>iron</b> — that is why Aarav is special.</li>
                <li>You cannot fly. Heroes jump, fall, get hurt.</li>
              </ul>
            </Section>
            <Section title="The arc — 8 parts mapped (23 total)">
              <table className="arc-table">
                <thead><tr><th>Part</th><th>Title</th><th>End beat</th></tr></thead>
                <tbody>
                  {arc.map((a) => (
                    <tr key={a.part}><td>{a.part}</td><td>{a.title}</td><td>{a.beat}</td></tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </>
        )}

        {tab === 'characters' && (
          <Section title="The cast" right={<span className="pill">look sheets = face consistency</span>}>
            <div className="char-grid">
              {characters.map((c) => (
                <article key={c.id} className="char" style={{ borderColor: c.color }}>
                  <header>
                    <span className="char-dot" style={{ background: c.color }} />
                    <div>
                      <h3>{c.name}</h3>
                      <span className="char-role">{c.role}</span>
                    </div>
                  </header>
                  <p className="char-look">{c.look}</p>
                  <dl>
                    <div><dt>Voice</dt><dd>{c.voice}</dd></div>
                    <div><dt>Power</dt><dd>{c.power}</dd></div>
                    <div><dt>Price</dt><dd>{c.price}</dd></div>
                  </dl>
                  <details className="char-prompt">
                    <summary>look-sheet prompt</summary>
                    <p>{c.lookPrompt}</p>
                    <CopyButton text={c.lookPrompt} label="copy prompt" />
                  </details>
                </article>
              ))}
            </div>
          </Section>
        )}

        {tab === 'shots' && (
          <Section
            title={`Shot list — Part ${part.part} “${part.title}”`}
            right={<span className="pill">{partFilmed}/{part.shots.length} filmed · {totalSeconds(part)}s</span>}
          >
            <div className="part-switch">
              {parts.map((p) => (
                <button
                  key={p.part}
                  type="button"
                  className={`part-btn${partId === p.part ? ' active' : ''}`}
                  onClick={() => setPartId(p.part)}
                >
                  Part {p.part} · {p.title}
                </button>
              ))}
              <span className="muted small-hint">check a shot when it is filmed — saved in this browser</span>
            </div>
            <div className="shots">
              {part.shots.map((s) => (
                <ShotCard key={s.id} shot={s} part={part.part} filmed={filmed} onToggle={toggle} />
              ))}
            </div>
          </Section>
        )}

        {tab === 'music' && (
          <Section title="The six themes" right={<span className="pill">generate once, reuse forever</span>}>
            <div className="theme-grid">
              {themes.map((t) => (
                <article key={t.id} className="theme">
                  <h3>{t.id} · {t.name}</h3>
                  <p>{t.desc}</p>
                  <span className="muted">{t.when}</span>
                </article>
              ))}
            </div>
            <p className="muted">
              Sound rules: the Crack sound = long deep CRACK + 1 second of total silence · blue fire =
              glass chimes + soft choir · Vane never gets loud music · the city (trams, river, crows) is
              always audible underneath.
            </p>
          </Section>
        )}

        {tab === 'pipeline' && (
          <>
            <Section title="How a part gets filmed">
              <ol className="pipe">
                <li><b>Look sheets</b> — one photo per character, used as reference in every shot</li>
                <li><b>Film shots</b> — text/image-to-video at 1080p with sound</li>
                <li><b>Voices</b> — text-to-speech per character + lipsync for close-ups</li>
                <li><b>Music &amp; foley</b> — the 6 themes + per-shot sound effects</li>
                <li><b>Edit</b> — merge clips, mix audio, export the final cut</li>
                <li><b>Final pass</b> — optional 4K upscale</li>
              </ol>
            </Section>
            <Section title="Commands">
              <pre className="cmd">{`# validate everything
bun run validate

# 1) character look sheets (8 images)
bun scripts/make_characters.mjs

# 2) film all 23 shots, 1080p with sound (resume-safe)
bun scripts/film_part01.mjs

# 3) assemble the final cut
bun scripts/assemble_part01.mjs`}</pre>
            </Section>
            <Section title="Rules for quality">
              <ul className="rules">
                <li>One look sheet per character, forever.</li>
                <li>Same magic colors: cold blue inside, gold sparks, red only for Vane.</li>
                <li>One camera move per shot.</li>
                <li>Keep shots under 10 seconds.</li>
                <li>Never let AI put text on screen (except the title card).</li>
                <li>Use the 1-second silence after The Crack in every part.</li>
              </ul>
            </Section>
          </>
        )}
      </main>

      <footer className="foot">
        EVERFALL · AI feature film · Part 01 “The Crack” · made with the browser + cloud video models
      </footer>
    </div>
  )
}
