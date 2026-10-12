import planData from './part01.json'

export interface Shot {
  id: string
  desc: string
  duration: number
  model: string
  generate_audio: boolean
  reference?: string
  prompt: string
}

export const plan = planData as {
  part: string
  title: string
  resolution: string
  defaultModel: string
  shots: Shot[]
}

export const totalSeconds = plan.shots.reduce((n, s) => n + s.duration, 0)

export interface Character {
  id: string
  name: string
  role: string
  color: string
  age: string
  look: string
  voice: string
  power: string
  price: string
  lookPrompt: string
}

export const characters: Character[] = [
  {
    id: 'aarav', name: 'Aarav Mehta', role: 'The Iron Boy · main hero', color: '#38bdf8',
    age: '24', look: 'Indian man, short messy black hair, small scar on left eyebrow, tired soft eyes, grey hoodie with torn sleeve, blue ring tattoos',
    voice: 'low, slow, soft', power: 'pulls iron from anything — buildings, roads, trams', price: 'body gets colder each use',
    lookPrompt: 'Photorealistic portrait of a 24-year-old Indian man, short messy black hair, warm brown skin, thin tired face, small scar on left eyebrow, soft kind eyes, wearing a grey torn hoodie, blue glowing ring tattoos on his neck and left hand, cinematic studio lighting, looking straight at camera, ultra detailed skin texture, 85mm lens, movie poster quality',
  },
  {
    id: 'lena', name: 'Lena Kovac', role: 'The Shadow Detective · co-lead', color: '#a78bfa',
    age: '31', look: 'White woman, sharp cheekbones, short dark hair, grey-green tired eyes, brown leather jacket, detective badge',
    voice: 'flat, dry, quiet', power: 'steps through shadows — one shadow to another', price: 'loses 1 minute of memory per jump',
    lookPrompt: 'Photorealistic portrait of a 31-year-old woman detective, East European features, sharp cheekbones, short dark hair behind ears, grey-green tired eyes, wearing a worn brown leather jacket over a dark turtleneck, cinematic noir lighting, looking straight at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    id: 'bo', name: 'Bo', role: 'The Loud Boy · heart of the team', color: '#fbbf24',
    age: '13', look: 'Bengali street boy, big taped glasses, curly dusty hair, missing front tooth, oversized yellow rain jacket',
    voice: 'fast, high, funny', power: 'sound — shockwave screams, rides sound waves', price: 'slowly goes deaf',
    lookPrompt: 'Photorealistic portrait of a 13-year-old Bangladeshi-Indian street boy, thin build, big round glasses taped at corner, curly dusty black hair, missing front tooth, huge happy grin, wearing an oversized yellow rain jacket, cinematic warm lighting, looking at camera, ultra detailed skin, 50mm lens, movie quality',
  },
  {
    id: 'rose', name: 'Sister Rose', role: 'The Light Blade · the warrior', color: '#f97316',
    age: '58', look: 'Indian nun, silver hair in tight bun, hawk-like eyes, white cotton saree with thin blue border',
    voice: 'deep, warm, slow', power: 'light into a solid blade — cuts anything', price: 'one year of life per fight',
    lookPrompt: 'Photorealistic portrait of a 58-year-old Indian nun, silver hair in tight bun, dark brown skin, deep wise face lines, calm hawk-like eyes, wearing a simple white cotton saree with thin blue border, cinematic soft lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    id: 'aiko', name: 'Dr. Aiko Tanaka', role: 'The Gravity Woman · the brain', color: '#22d3ee',
    age: '36', look: 'Japanese woman, sharp black bob, red framed glasses, white lab coat, burn scar on right wrist',
    voice: 'precise, fast, no feelings at first', power: 'gravity wells — float or crush, can hold a building', price: 'bones get heavier',
    lookPrompt: 'Photorealistic portrait of a 36-year-old Japanese physicist woman, sharp black bob haircut, red framed glasses, pale skin, calm expression, small burn scar on right wrist, wearing a white lab coat over black shirt, cinematic cool lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    id: 'ghost', name: 'Ghost', role: 'The Skipped One · the mystery', color: '#e2e8f0',
    age: '??? (looks 20)', look: 'androgynous, long black hair with one white streak, grey eyes with gold ring, oversized grey sweater, barefoot',
    voice: 'very quiet, double echo', power: 'time skips — 3 seconds forward, nothing can hit him', price: 'forgets one day of his life per skip',
    lookPrompt: 'Photorealistic portrait of a mysterious 20-year-old androgynous person, long black hair with one white streak, grey eyes with a faint gold ring, soft blurry features, wearing an oversized grey sweater and loose black trousers, barefoot, cinematic moody lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    id: 'vane', name: 'Malachi Vane', role: 'The Man Who Waited · villain', color: '#ef4444',
    age: '62', look: 'white man, silver hair combed back, short grey beard, deep calm blue eyes, red mark under left eye, black three-piece suit, black gloves',
    voice: 'soft, deep, warm — never shouts', power: 'memory — takes memories out of heads', price: 'has no memories of his own left',
    lookPrompt: 'Photorealistic portrait of a 62-year-old wealthy man, silver hair combed back, short grey beard, deep calm blue eyes, small red mark under left eye, wearing a black three-piece suit with silver pocket watch, black leather gloves, cinematic dramatic lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
  },
  {
    id: 'archivist', name: 'The Archivist', role: 'The Mentor', color: '#34d399',
    age: '80+', look: 'blind Indian woman, white hair, thick round glasses, always holding tea',
    voice: 'old and warm', power: 'none — and does not need one', price: 'none — already paid everything',
    lookPrompt: 'Photorealistic portrait of an 80-year-old blind Indian woman, white hair, thick round glasses, deep smile lines, holding a small cup of tea, warm bookshop lighting, looking slightly up, ultra detailed, 85mm lens, movie quality',
  },
]

export interface Theme { id: string; name: string; desc: string; when: string }
export const themes: Theme[] = [
  { id: 'T1', name: 'Everfall Main Theme', desc: 'Big orchestra + Indian dhol drums + crying synth', when: 'title card, team scenes, endings' },
  { id: 'T2', name: "Aarav's Theme", desc: 'Solo sitar with slow strings. Sad but warm.', when: 'Aarav alone, his father, quiet moments' },
  { id: 'T3', name: "Vane's Theme", desc: 'Solo cello + a whisper under it. Very quiet. Very scary.', when: 'Vane on screen' },
  { id: 'T4', name: 'Battle Theme', desc: 'Fast tabla + electric guitar + brass. Heavy.', when: 'fights' },
  { id: 'T5', name: 'Wonder Theme', desc: 'Church organ + children\'s choir. Big and open.', when: 'magic, the Crack, flying shots' },
  { id: 'T6', name: 'Price Theme', desc: 'One piano note, repeating, getting slower each time.', when: 'a hero pays for their power' },
]

export const arc = [
  { part: '01', title: 'The Crack', beat: 'Sky breaks. Aarav gets power. The six meet. Vane reveals himself.' },
  { part: '02', title: 'Wanted Sparks', beat: 'City blames the six. They hide. Bo and Rose join. Lena finds a dead shard in evidence.' },
  { part: '03', title: 'The Iron Boy', beat: 'Vane captures Aarav. Iron is the key. Aiko betrays Vane to save him.' },
  { part: '04', title: 'Shadow Detective', beat: "Lena's past: her sister died in the first Crack, 40 years ago." },
  { part: '05', title: 'Six Bruises', beat: "Each hero's price is paid. One loses their power. Ghost's identity shown." },
  { part: '06', title: 'Beneath the City', beat: 'The team enters buried Everfall. The six gods are sleeping — and waking.' },
  { part: '07', title: 'Gods Wake', beat: 'A god uses Vane. Vane dies saving Bo — last-minute hero turn.' },
  { part: '08', title: 'Everfall Rises', beat: 'The city lifts into the sky. They save both — but the sky stays open.' },
]
