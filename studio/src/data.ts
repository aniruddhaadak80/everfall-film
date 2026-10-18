import planData from './part01.json'
import planData2 from './part02.json'
import planData3 from './part03.json'
import planData4 from './part04.json'
import planData5 from './part05.json'

export interface Shot {
  id: string
  desc: string
  duration: number
  model: string
  generate_audio: boolean
  reference?: string
  prompt: string
}

export interface PartPlan {
  part: string
  title: string
  resolution: string
  defaultModel: string
  shots: Shot[]
}

export const plan = planData as PartPlan
export const plan2 = planData2 as PartPlan
export const plan3 = planData3 as PartPlan
export const plan4 = planData4 as PartPlan
export const plan5 = planData5 as PartPlan
export const parts = [plan, plan2, plan3, plan4, plan5]

export const totalSeconds = (p: PartPlan) => p.shots.reduce((n, s) => n + s.duration, 0)

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
  voiceSettings?: VoiceSettings
}

export interface VoiceSettings {
  provider: 'elevenlabs' | 'openai' | 'azure' | 'local'
  voiceId: string
  stability?: number
  similarityBoost?: number
  style?: number
  speed?: number
}

export const characters: Character[] = [
  {
    id: 'aarav', name: 'Aarav Mehta', role: 'The Iron Boy · main hero', color: '#38bdf8',
    age: '24', look: 'Indian man, short messy black hair, small scar on left eyebrow, tired soft eyes, grey hoodie with torn sleeve, blue ring tattoos',
    voice: 'low, slow, soft', power: 'pulls iron from anything — buildings, roads, trams', price: 'body gets colder each use',
    lookPrompt: 'Photorealistic portrait of a 24-year-old Indian man, short messy black hair, warm brown skin, thin tired face, small scar on left eyebrow, soft kind eyes, wearing a grey torn hoodie, blue glowing ring tattoos on his neck and left hand, cinematic studio lighting, looking straight at camera, ultra detailed skin texture, 85mm lens, movie poster quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'pNInz6obpgDQGcFmaJgB', stability: 0.5, similarityBoost: 0.75, style: 0.2, speed: 0.95 },
  },
  {
    id: 'lena', name: 'Lena Kovac', role: 'The Shadow Detective · co-lead', color: '#a78bfa',
    age: '31', look: 'White woman, sharp cheekbones, short dark hair, grey-green tired eyes, brown leather jacket, detective badge',
    voice: 'flat, dry, quiet', power: 'steps through shadows — one shadow to another', price: 'loses 1 minute of memory per jump',
    lookPrompt: 'Photorealistic portrait of a 31-year-old woman detective, East European features, sharp cheekbones, short dark hair behind ears, grey-green tired eyes, wearing a worn brown leather jacket over a dark turtleneck, cinematic noir lighting, looking straight at camera, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: '21m00Tcm4TlvDq8ikWAM', stability: 0.6, similarityBoost: 0.8, style: 0.1, speed: 1.0 },
  },
  {
    id: 'bo', name: 'Bo', role: 'The Loud Boy · heart of the team', color: '#fbbf24',
    age: '13', look: 'Bengali street boy, big taped glasses, curly dusty hair, missing front tooth, oversized yellow rain jacket',
    voice: 'fast, high, funny', power: 'sound — shockwave screams, rides sound waves', price: 'slowly goes deaf',
    lookPrompt: 'Photorealistic portrait of a 13-year-old Bangladeshi-Indian street boy, thin build, big round glasses taped at corner, curly dusty black hair, missing front tooth, huge happy grin, wearing an oversized yellow rain jacket, cinematic warm lighting, looking at camera, ultra detailed skin, 50mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'ThT5KzBeYPXaubU1d5uQ', stability: 0.4, similarityBoost: 0.7, style: 0.6, speed: 1.15 },
  },
  {
    id: 'rose', name: 'Sister Rose', role: 'The Light Blade · the warrior', color: '#f97316',
    age: '58', look: 'Indian nun, silver hair in tight bun, hawk-like eyes, white cotton saree with thin blue border',
    voice: 'deep, warm, slow', power: 'light into a solid blade — cuts anything', price: 'one year of life per fight',
    lookPrompt: 'Photorealistic portrait of a 58-year-old Indian nun, silver hair in tight bun, dark brown skin, deep wise face lines, calm hawk-like eyes, wearing a simple white cotton saree with thin blue border, cinematic soft lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'ErXwobaYiN019PkySvjV', stability: 0.7, similarityBoost: 0.85, style: 0.15, speed: 0.9 },
  },
  {
    id: 'aiko', name: 'Dr. Aiko Tanaka', role: 'The Gravity Woman · the brain', color: '#22d3ee',
    age: '36', look: 'Japanese woman, sharp black bob, red framed glasses, white lab coat, burn scar on right wrist',
    voice: 'precise, fast, no feelings at first', power: 'gravity wells — float or crush, can hold a building', price: 'bones get heavier',
    lookPrompt: 'Photorealistic portrait of a 36-year-old Japanese physicist woman, sharp black bob haircut, red framed glasses, pale skin, calm expression, small burn scar on right wrist, wearing a white lab coat over black shirt, cinematic cool lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'EXAVITQu4vr4xnSDxMaL', stability: 0.65, similarityBoost: 0.8, style: 0.2, speed: 1.05 },
  },
  {
    id: 'ghost', name: 'Ghost', role: 'The Skipped One · the mystery', color: '#e2e8f0',
    age: '??? (looks 20)', look: 'androgynous, long black hair with one white streak, grey eyes with gold ring, oversized grey sweater, barefoot',
    voice: 'very quiet, double echo', power: 'time skips — 3 seconds forward, nothing can hit him', price: 'forgets one day of his life per skip',
    lookPrompt: 'Photorealistic portrait of a mysterious 20-year-old androgynous person, long black hair with one white streak, grey eyes with a faint gold ring, soft blurry features, wearing an oversized grey sweater and loose black trousers, barefoot, cinematic moody lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'MF3mGyEYCl7XYWbV9V6O', stability: 0.3, similarityBoost: 0.6, style: 0.5, speed: 0.85 },
  },
  {
    id: 'vane', name: 'Malachi Vane', role: 'The Man Who Waited · villain', color: '#ef4444',
    age: '62', look: 'white man, silver hair combed back, short grey beard, deep calm blue eyes, red mark under left eye, black three-piece suit, black gloves',
    voice: 'soft, deep, warm — never shouts', power: 'memory — takes memories out of heads', price: 'has no memories of his own left',
    lookPrompt: 'Photorealistic portrait of a 62-year-old wealthy man, silver hair combed back, short grey beard, deep calm blue eyes, small red mark under left eye, wearing a black three-piece suit with silver pocket watch, black leather gloves, cinematic dramatic lighting, looking at camera, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'VR6AewLTigWG4xSOdkGw', stability: 0.75, similarityBoost: 0.9, style: 0.1, speed: 0.9 },
  },
  {
    id: 'archivist', name: 'The Archivist', role: 'The Mentor', color: '#34d399',
    age: '80+', look: 'blind Indian woman, white hair, thick round glasses, always holding tea',
    voice: 'old and warm', power: 'none — and does not need one', price: 'none — already paid everything',
    lookPrompt: 'Photorealistic portrait of an 80-year-old blind Indian woman, white hair, thick round glasses, deep smile lines, holding a small cup of tea, warm bookshop lighting, looking slightly up, ultra detailed, 85mm lens, movie quality',
    voiceSettings: { provider: 'elevenlabs', voiceId: 'ZF6FPAbjXT4488VcRRnw', stability: 0.8, similarityBoost: 0.95, style: 0.05, speed: 0.8 },
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

export interface DialogueLine {
  part: string
  scene: number
  characterId: string
  text: string
  emotionalContext?: string
  voiceDirective?: string
}

export const dialogueScript: DialogueLine[] = [
  { part: '01', scene: 1, characterId: 'archivist', text: 'Before the sky broke, nobody looked up. We were all too busy looking down. That is how it happens. That is how it always happens.', emotionalContext: 'ancient wisdom, weariness', voiceDirective: 'slow, measured, ancient weight' },
  { part: '01', scene: 3, characterId: 'aarav', text: 'What am I?', emotionalContext: 'terror, confusion, awakening', voiceDirective: 'whisper, trembling, raw fear' },
  { part: '01', scene: 5, characterId: 'lena', text: 'Hey. Hey! Look at me.', emotionalContext: 'commanding, urgent, suspicious', voiceDirective: 'sharp, authoritative, cutting through chaos' },
  { part: '01', scene: 5, characterId: 'lena', text: 'What are you?', emotionalContext: 'quiet realization, fear underneath', voiceDirective: 'barely above whisper, trembling' },
  { part: '01', scene: 7, characterId: 'vane', text: 'Six shards. All awake. Forty years of waiting. And the city gave them to me.', emotionalContext: 'quiet triumph, patient satisfaction', voiceDirective: 'warm, intimate, chillingly gentle' },
  { part: '01', scene: 8, characterId: 'archivist', text: 'They are coming. Good. The gods are lonely.', emotionalContext: 'ancient knowing, anticipation', voiceDirective: 'slow, certain, faint smile in voice' },

  { part: '02', scene: 2, characterId: 'bo', text: 'You\'re the bridge guy. I watched you. I watched you all night. I\'ve been watching you since the tram.', emotionalContext: 'fanboy excitement, nervous energy', voiceDirective: 'fast, breathless, trembling excitement' },
  { part: '02', scene: 2, characterId: 'bo', text: '…Cool.', emotionalContext: 'awe, fear, acceptance', voiceDirective: 'barely a whisper, wonderstruck' },
  { part: '02', scene: 4, characterId: 'rose', text: 'Count to sixty. We are leaving in sixty.', emotionalContext: 'commanding calm, maternal authority', voiceDirective: 'steady, unshakeable, maternal steel' },
  { part: '02', scene: 4, characterId: 'aiko', text: '…I\'m sorry. I have to know.', emotionalContext: 'guilt, scientific obsession, resignation', voiceDirective: 'whisper, breaking, intellectual desperation' },
  { part: '02', scene: 5, characterId: 'lena', text: '…You were there. You were just a kid. And you\'ve been planning this ever since.', emotionalContext: 'horror, realization, betrayal', voiceDirective: 'cracking, horrified, slow realization' },
  { part: '02', scene: 6, characterId: 'vane', text: 'These six are dangerous. They broke the sky. Find them before I have to. My foundation has already donated the drones. Use them.', emotionalContext: 'corporate polish, veiled threat', voiceDirective: 'executive smooth, warm but commanding' },
  { part: '02', scene: 7, characterId: 'ghost', text: 'The tower is the heart. Cut it, and the shards sleep. He is not your enemy. He is your door.', emotionalContext: 'ancient knowing, dual presence', voiceDirective: 'dual voice, echoing, timeless' },

  { part: '03', scene: 1, characterId: 'vane', text: 'Iron is the one thing old magic cannot control. Did you know that? Your shard grew around iron. That makes you… special. That makes you the key.', emotionalContext: 'teacher revealing truth, academic fascination', voiceDirective: 'gentle, lecturing, fascinated' },
  { part: '03', scene: 2, characterId: 'aarav', text: 'I\'m not a key. I\'m a person.', emotionalContext: 'defiance, hurt, reclaiming identity', voiceDirective: 'firm, quiet, steel underneath' },
  { part: '03', scene: 2, characterId: 'vane', text: 'Of course you are. And people can be keys. I\'m not cruel, Aarav. I\'m precise.', emotionalContext: 'chilling kindness, absolute conviction', voiceDirective: 'warm, intimate, terrifyingly reasonable' },
  { part: '03', scene: 3, characterId: 'aarav', text: '…What did you take?', emotionalContext: 'violation, hollow emptiness', voiceDirective: 'barely a whisper, hollow, devastated' },
  { part: '03', scene: 3, characterId: 'vane', text: 'A face. A father\'s face. I keep them like books. When this is over, I\'ll give it back. I promise.', emotionalContext: 'gentle horror, collector\'s pride', voiceDirective: 'gentle, librarian-like, chilling promise' },
  { part: '03', scene: 4, characterId: 'aiko', text: '…I don\'t know how to be good yet. But I know how to open doors.', emotionalContext: 'redemption, self-loathing, determination', voiceDirective: 'cracking, raw, desperate honesty' },
  { part: '03', scene: 6, characterId: 'ghost', text: 'He\'s at the tower. He\'s coming back.', emotionalContext: 'dual presence, ancient urgency', voiceDirective: 'dual voice, echoing, urgent' },
  { part: '03', scene: 7, characterId: 'aiko', text: 'I got you in. One problem. The glove is the connection. Cut the glove, cut the signal. And when you see him… he will be kind. He is always kind. That is the trap.', emotionalContext: 'confession, warning, fear', voiceDirective: 'urgent, honest, terrified' },
  { part: '03', scene: 8, characterId: 'aarav', text: 'He took my father\'s face. I want it back. And then I\'m going to close the sky.', emotionalContext: 'resolve, grief, final declaration of war', voiceDirective: 'iron resolve, quiet fury, declaration' },

  { part: '04', scene: 1, characterId: 'lena', text: 'Every shadow I\'ve ever crossed in this city… I can jump through. But lately, something has been jumping back.', emotionalContext: 'unease, confession, case-file voiceover', voiceDirective: 'dry noir narration, controlled, tired' },
  { part: '04', scene: 2, characterId: 'lena', text: 'Case 1986/4419. Girl, age nine, separated from guardian. Status: unresolved.', emotionalContext: 'detective ritual, dawning dread', voiceDirective: 'flat procedural read, cracking at "unresolved"' },
  { part: '04', scene: 3, characterId: 'vane', text: 'Dad? Dad — the light. Dad… dad\'s gone into the light.', emotionalContext: 'young grief, origin wound, 1986 echo', voiceDirective: 'young male voice, breaking, raw first loss' },
  { part: '04', scene: 4, characterId: 'aarav', text: 'He keeps faces the way you keep case files. Mine is the newest.', emotionalContext: 'cold anger, violation, need for justice', voiceDirective: 'low, clipped, frost-edged fury' },
  { part: '04', scene: 4, characterId: 'ghost', text: 'The girl in the yellow coat did not die. Nothing crosses a shard and dies. It is kept.', emotionalContext: 'impossible comfort, ancient calm', voiceDirective: 'dual echo voice, gentle, weightless' },
  { part: '04', scene: 5, characterId: 'lena', text: 'Mara. I know you don\'t remember me, but—', emotionalContext: 'hope, fear of rejection, sisterhood', voiceDirective: 'trembling, warm, restrained tears' },
  { part: '04', scene: 5, characterId: 'bo', text: 'One minute per jump. That\'s what they take. You\'re up to hours now, Lee. I can always tell. You smell like torn paper.', emotionalContext: 'matter-of-fact affection, eerie child wisdom', voiceDirective: 'nine-year-old girl, dry humor, old soul' },
  { part: '04', scene: 6, characterId: 'vane', text: 'If you took him into the light, then I will reach into the light and take something back. Every year. Whatever it costs. Whatever it eats.', emotionalContext: 'the vow, origin of forty years of patience', voiceDirective: 'young Vane, vow screamed into glass rain' },
  { part: '04', scene: 7, characterId: 'lena', text: 'You knew her. You\'ve known about her for forty years.', emotionalContext: 'betrayal, controlled rage', voiceDirective: 'low, even, authoritative menace' },
  { part: '04', scene: 7, characterId: 'vane', text: 'Your sister is not dead, Detective. She is stored. Between stamps, in the dark, dry and nine. I could show you where.', emotionalContext: 'librarian calm, terrible offer', voiceDirective: 'warm, precise, endlessly patient' },
  { part: '04', scene: 8, characterId: 'aarav', text: 'My father\'s face. Your sister. Bo\'s hearing. Rose\'s years. He keeps receipts for all of it.', emotionalContext: 'inventory of losses, shared resolve', voiceDirective: 'quiet, deliberate, cataloguing anger' },
  { part: '04', scene: 8, characterId: 'lena', text: 'Then we rob him.', emotionalContext: 'declaration, partnership sealed, smirk under exhaustion', voiceDirective: 'dry, certain, half a laugh' },

  { part: '05', scene: 1, characterId: 'lena', text: 'He kept every price on a shelf. Fine. Before we open the sky — we learn to reach through it. One pull. One proof.', emotionalContext: 'leadership by exhaustion, campaign logic', voiceDirective: 'level, tired authority, chalk-wall briefing' },
  { part: '05', scene: 1, characterId: 'aiko', text: 'Theory: two bound shadows make a door. Through a door, one item comes back. Small. Dry. Unaged.', emotionalContext: 'clinical wonder, alpha-physicist cadence', voiceDirective: 'precise, fast, quietly thrilled' },
  { part: '05', scene: 3, characterId: 'bo', text: 'That\'s Mara\'s shoe. That means Mara\'s IN there. That means rescue Saturday.', emotionalContext: 'hope arithmetic, ten-year-old planner', voiceDirective: 'bright staccato, deliberate joy' },
  { part: '05', scene: 3, characterId: 'ghost', text: 'Careful. Doors that open one way… open the other way too.', emotionalContext: 'genuine fear, lived knowledge', voiceDirective: 'soft double-echo, warning, weightless' },
  { part: '05', scene: 4, characterId: 'aiko', text: 'He\'s lost another day. He doesn\'t remember the plan. He doesn\'t remember us.', emotionalContext: 'horrified arithmetic, guilt at witnessed cost', voiceDirective: 'under the breath, flat, shaken' },
  { part: '05', scene: 5, characterId: 'bo', text: 'Why is it quiet? Why can\'t you hear me? Why can\'t I—', emotionalContext: 'screaming into permanent silence, terror of invisibility', voiceDirective: 'silent-scream delivery, all consonants, no volume' },
  { part: '05', scene: 5, characterId: 'rose', text: 'Enough, little thunder. You\'re done. Done.', emotionalContext: 'maternal steel cutting through panic and cost alike', voiceDirective: 'deep warm steadiness, two hard syllables at the end' },
  { part: '05', scene: 6, characterId: 'bo', text: 'I can still see it. In the floor. Everything loud makes circles.', emotionalContext: 'grief turned into a discovery', voiceDirective: 'hoarse, quiet lightning, read out by Lena over it' },
  { part: '05', scene: 6, characterId: 'aarav', text: 'You\'re the only one of us whose power was kindness that got loud. It doesn\'t leave. It just learned a new door.', emotionalContext: 'brother-quiet, naming him back into the team', voiceDirective: 'low, slow, iron-soft' },
  { part: '05', scene: 7, characterId: 'archivist', text: 'You came in with the light rain. Forty years ago. Child\'s ticket. I still have your book. You paid with the only day you had.', emotionalContext: 'tender interrogation of memory, proof of personhood', voiceDirective: 'old and warm, deliberate, no pity' },
  { part: '05', scene: 7, characterId: 'archivist', text: 'You are not a ghost, child. You are what the sky threw away empty. Sit, Tobi. This tea is garbage and you always drank it.', emotionalContext: 'the name given, terrible comfort, homecoming', voiceDirective: 'warm wrecking ball, small laugh at the end' },
  { part: '05', scene: 8, characterId: 'lena', text: 'Six bruises, one each. We\'re not alive because we\'re strong. We\'re alive because we stopped charging interest.', emotionalContext: 'ethos of the team, voiceover close', voiceDirective: 'dry noir V.O., leaning on the last two words' },
]

export interface PartPlan {
  part: string
  title: string
  resolution: string
  defaultModel: string
  shots: Shot[]
}

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
  voiceSettings?: VoiceSettings
}

export interface VoiceSettings {
  provider: 'elevenlabs' | 'openai' | 'azure' | 'local'
  voiceId: string
  stability?: number
  similarityBoost?: number
  style?: number
  speed?: number
}

export interface DialogueLine {
  part: string
  scene: number
  characterId: string
  text: string
  emotionalContext?: string
  voiceDirective?: string
}

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