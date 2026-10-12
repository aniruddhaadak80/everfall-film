import { useState } from 'react'

export function CopyButton({ text, label = 'copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="cb"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1400)
        } catch {
          setCopied(false)
        }
      }}
    >
      {copied ? 'copied ✓' : label}
    </button>
  )
}

export function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card">
      <header className="card-head">
        <h2>{title}</h2>
        {right}
      </header>
      {children}
    </section>
  )
}

export function beltCommand(shot: { model: string; prompt: string; duration: number; resolution?: string; reference?: string; generate_audio?: boolean }): string {
  const input: Record<string, unknown> = {
    prompt: shot.prompt,
    duration: shot.duration,
    resolution: shot.resolution ?? '1080p',
    generate_audio: shot.generate_audio !== false,
  }
  if (shot.reference) input.reference_image = `looks/${shot.reference.split('/').pop()}`
  return `bun x belt app run ${shot.model} --input '${JSON.stringify(input)}'`
}
