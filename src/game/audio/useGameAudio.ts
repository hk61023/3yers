import { useCallback, useEffect, useRef, useState } from 'react'
import { useInstrumentPerformance } from './useInstrumentPerformance'
import { useBackgroundMusic } from './useBackgroundMusic'
import type { JourneyId } from '../flow'
import type {
  GameFeedbackCue,
  GameFeedbackEvent,
  GameFeedbackHandler,
} from '../sceneTypes'

export interface AudioSettings {
  musicEnabled: boolean
  effectsEnabled: boolean
  voiceEnabled: boolean
}

export type AudioSettingKey = keyof AudioSettings

const STORAGE_KEY = 'car-game-audio-settings-v1'
const DEFAULT_SETTINGS: AudioSettings = {
  musicEnabled: true,
  effectsEnabled: true,
  voiceEnabled: true,
}

const VOICE_FILES = {
  "forest-basket-ready": "forest-basket-ready-hint.mp3",
  "forest-squirrel-guide": "forest-squirrel-guide-hint.mp3",
  "forest-leaf-path": "forest-leaf-path-hint.mp3",
  "forest-picnic-mat": "forest-picnic-mat-hint.mp3",
  "forest-hedgehog-apple": "forest-hedgehog-apple-hint.mp3",
  "forest-flower-open": "forest-flower-open-hint.mp3",
  "forest-rabbit-cup": "forest-rabbit-cup-hint.mp3",
  "forest-bird-song": "forest-bird-song-hint.mp3",
  "forest-basket-cleanup": "forest-basket-cleanup-hint.mp3",
  "forest-friends-goodbye": "forest-friends-goodbye-hint.mp3",
  "snow-train-arrival": "snow-train-arrival-hint.mp3",
  "snow-bear-mittens": "snow-bear-mittens-hint.mp3",
  "snow-penguin-greeting": "snow-penguin-greeting-hint.mp3",
  "snow-snowman-nose": "snow-snowman-nose-hint.mp3",
  "snow-pine-snow": "snow-pine-snow-hint.mp3",
  "snow-penguin-scarf": "snow-penguin-scarf-hint.mp3",
  "snow-lantern-glow": "snow-lantern-glow-hint.mp3",
  "snow-snack-plate": "snow-snack-plate-hint.mp3",
  "snow-star-decoration": "snow-star-decoration-hint.mp3",
  "snow-house-goodnight": "snow-house-goodnight-hint.mp3",
  "dino-valley-greeting": "dino-valley-greeting-hint.mp3",
  "dino-leaf-breakfast": "dino-leaf-breakfast-hint.mp3",
  "dino-backpack-ready": "dino-backpack-ready-hint.mp3",
  "dino-fern-path": "dino-fern-path-hint.mp3",
  "dino-creek-bridge": "dino-creek-bridge-hint.mp3",
  "dino-baby-egg": "dino-baby-egg-hint.mp3",
  "dino-baby-flower": "dino-baby-flower-hint.mp3",
  "dino-waterfall-discovery": "dino-waterfall-discovery-hint.mp3",
  "dino-home-door": "dino-home-door-hint.mp3",
  "dino-baby-blanket": "dino-baby-blanket-hint.mp3",
  "space-ship-launch": "space-ship-launch-hint.mp3",
  "space-star-guide": "space-star-guide-hint.mp3",
  "space-bear-helmet": "space-bear-helmet-hint.mp3",
  "space-landing-pad": "space-landing-pad-hint.mp3",
  "space-moon-flower": "space-moon-flower-hint.mp3",
  "space-star-mail": "space-star-mail-hint.mp3",
  "space-bridge-light": "space-bridge-light-hint.mp3",
  "space-picnic-cushion": "space-picnic-cushion-hint.mp3",
  "space-ship-home": "space-ship-home-hint.mp3",
  "space-friends-blanket": "space-friends-blanket-hint.mp3",
  "forest-start": "forest-journey-start.mp3",
  "forest-praise": "forest-scene-complete.mp3",
  "forest-finish": "forest-journey-complete.mp3",
  "snow-start": "snow-journey-start.mp3",
  "snow-praise": "snow-scene-complete.mp3",
  "snow-finish": "snow-journey-complete.mp3",
  "dino-start": "dino-journey-start.mp3",
  "dino-praise": "dino-scene-complete.mp3",
  "dino-finish": "dino-journey-complete.mp3",
  "space-start": "space-journey-start.mp3",
  "space-praise": "space-scene-complete.mp3",
  "space-finish": "space-journey-complete.mp3",

  'ocean-crab-home': 'ocean-crab-home-hint.mp3',
  'ocean-hermit-shell': 'ocean-hermit-shell-hint.mp3',
  'ocean-starfish-turn': 'ocean-starfish-turn-hint.mp3',
  'ocean-octopus-wave': 'ocean-octopus-wave-hint.mp3',
  'ocean-jellyfish-glow': 'ocean-jellyfish-glow-hint.mp3',
  'ocean-whale-splash': 'ocean-whale-splash-hint.mp3',
  'ocean-seal-ball': 'ocean-seal-ball-hint.mp3',
  'ocean-coral-door': 'ocean-coral-door-hint.mp3',
  'ocean-shell-goodnight': 'ocean-shell-goodnight-hint.mp3',
  // Sky adventure preserves file/scene IDs; scripts now describe the animal targets.
  'sky-cloud-clear': 'sky-cloud-clear-hint.mp3',
  'sky-sun-hello': 'sky-sun-hello-hint.mp3',
  'sky-cloud-train': 'sky-cloud-train-hint.mp3',
  'sky-rainbow-bridge': 'sky-rainbow-bridge-hint.mp3',
  'sky-airship-letter': 'sky-airship-letter-hint.mp3',
  'sky-rain-cloud': 'sky-rain-cloud-hint.mp3',
  'sky-windmill-spin': 'sky-windmill-spin-hint.mp3',
  'sky-star-home': 'sky-star-home-hint.mp3',
  'sky-moon-blanket': 'sky-moon-blanket-hint.mp3',
  'life-wash-hands': 'life-wash-hands-hint.mp3',
  'life-dry-hands': 'life-dry-hands-hint.mp3',
  'life-bear-bib': 'life-bear-bib-hint.mp3',
  'life-breakfast-spoon': 'life-breakfast-spoon-hint.mp3',
  'life-wipe-table': 'life-wipe-table-hint.mp3',
  'life-socks-basket': 'life-socks-basket-hint.mp3',
  'life-hang-coat': 'life-hang-coat-hint.mp3',
  'life-book-shelf': 'life-book-shelf-hint.mp3',
  'life-bear-blanket': 'life-bear-blanket-hint.mp3',
  'music-bell-ring': 'music-bell-ring-hint.mp3',
  'music-shaker': 'music-shaker-hint.mp3',
  'music-xylophone': 'music-xylophone-hint.mp3',
  'music-pluck-string': 'music-pluck-string-hint.mp3',
  'music-trumpet': 'music-trumpet-hint.mp3',
  'music-accordion': 'music-accordion-hint.mp3',
  'music-bear-dance': 'music-bear-dance-hint.mp3',
  'music-note-score': 'music-note-score-hint.mp3',
  'music-box-goodnight': 'music-box-goodnight-hint.mp3',
  'ocean-praise': 'ocean-scene-complete.mp3',
  'sky-praise': 'sky-scene-complete.mp3',
  'life-praise': 'life-scene-complete.mp3',
  'music-praise': 'music-scene-complete.mp3',
  'ocean-start': 'ocean-journey-start.mp3',
  'sky-start': 'sky-journey-start.mp3',
  'life-start': 'life-journey-start.mp3',
  'music-start': 'music-journey-start.mp3',
  'ocean-shell-pearl': 'ocean-shell-pearl-hint.mp3',
  'sky-balloon-launch': 'sky-balloon-launch-hint.mp3',
  'life-slippers-pair': 'life-slippers-pair-hint.mp3',
  'music-soft-drum': 'music-soft-drum-hint.mp3',
  'ocean-finish': 'ocean-journey-complete.mp3',
  'sky-finish': 'sky-journey-complete.mp3',
  'life-finish': 'life-journey-complete.mp3',
  'music-finish': 'music-journey-complete.mp3',
  start: 'journey-start.mp3',
  'animal-start': 'animal-journey-start.mp3',
  'animal-squirrel': 'animal-squirrel-hint.mp3',
  'animal-bear': 'animal-bear-hint.mp3',
  'animal-fox': 'animal-fox-hint.mp3',
  'animal-panda': 'animal-panda-hint.mp3',
  'animal-giraffe': 'animal-giraffe-hint.mp3',
  'farm-start': 'farm-journey-start.mp3',
  'garden-start': 'garden-journey-start.mp3',
  stone: 'stone-hint.mp3',
  bridge: 'bridge-hint.mp3',
  'traffic-light': 'traffic-light-hint.mp3',
  'animal-crossing': 'animal-crossing-hint.mp3',
  'tire-change': 'tire-change-hint.mp3',
  'rainy-drive': 'rainy-drive-hint.mp3',
  'night-lights': 'night-lights-hint.mp3',
  'fuel-stop': 'fuel-stop-hint.mp3',
  'car-wash': 'car-wash-hint.mp3',
  'rabbit-feeding': 'rabbit-feeding-hint.mp3',
  'flower-watering': 'flower-watering-hint.mp3',
  'mail-delivery': 'mail-delivery-hint.mp3',
  'feed-chicks': 'feed-chicks-hint.mp3',
  'kite-flying': 'kite-flying-hint.mp3',
  'puppy-frisbee': 'puppy-frisbee-hint.mp3',
  'toy-cleanup': 'toy-cleanup-hint.mp3',
  'fish-pond': 'fish-pond-hint.mp3',
  'home-garage': 'home-garage-hint.mp3',
  'kitten-reunion': 'kitten-reunion-hint.mp3',
  'bird-nest': 'bird-nest-hint.mp3',
  'turtle-beach': 'turtle-beach-hint.mp3',
  'lamb-meadow': 'lamb-meadow-hint.mp3',
  'elephant-bath': 'elephant-bath-hint.mp3',
  'farm-feed-cow': 'farm-feed-cow-hint.mp3',
  'farm-egg-basket': 'farm-egg-basket-hint.mp3',
  'farm-pig-bath': 'farm-pig-bath-hint.mp3',
  'farm-apple-picking': 'farm-apple-picking-hint.mp3',
  'farm-seed-planting': 'farm-seed-planting-hint.mp3',
  'farm-sheep-brushing': 'farm-sheep-brushing-hint.mp3',
  'farm-pumpkin-tractor': 'farm-pumpkin-tractor-hint.mp3',
  'farm-fill-trough': 'farm-fill-trough-hint.mp3',
  'farm-carrot-harvest': 'farm-carrot-harvest-hint.mp3',
  'farm-barn-goodnight': 'farm-barn-goodnight-hint.mp3',
  'garden-water-daisy': 'garden-water-daisy-hint.mp3',
  'garden-plant-sunflower': 'garden-plant-sunflower-hint.mp3',
  'garden-butterfly-flower': 'garden-butterfly-flower-hint.mp3',
  'garden-pick-strawberry': 'garden-pick-strawberry-hint.mp3',
  'garden-sweep-leaves': 'garden-sweep-leaves-hint.mp3',
  'garden-stone-path': 'garden-stone-path-hint.mp3',
  'garden-gate-hedgehog': 'garden-gate-hedgehog-hint.mp3',
  'garden-light-lantern': 'garden-light-lantern-hint.mp3',
  'garden-dandelion-wish': 'garden-dandelion-wish-hint.mp3',
  'garden-snail-lettuce': 'garden-snail-lettuce-hint.mp3',
  praise: 'scene-complete.mp3',
  'animal-praise': 'animal-scene-complete.mp3',
  'farm-praise': 'farm-scene-complete.mp3',
  'garden-praise': 'garden-scene-complete.mp3',
  finish: 'journey-complete.mp3',
  'animal-finish': 'animal-journey-complete.mp3',
  'farm-finish': 'farm-journey-complete.mp3',
  'garden-finish': 'garden-journey-complete.mp3',
} as const

type VoiceClip = keyof typeof VOICE_FILES

function isOpeningOrPraiseClip(clip: VoiceClip | null): boolean {
  return clip === 'start' || clip === 'praise' || clip?.endsWith('-start') === true || clip?.endsWith('-praise') === true
}

const ANIMAL_SCENE_IDS = new Set([
  'animal-squirrel', 'animal-bear', 'animal-fox', 'animal-panda', 'animal-giraffe',
  'animal-crossing',
  'rabbit-feeding',
  'feed-chicks',
  'puppy-frisbee',
  'fish-pond',
  'kitten-reunion',
  'bird-nest',
  'turtle-beach',
  'lamb-meadow',
  'elephant-bath',
])

const NEW_ANIMAL_HINTS: Record<string, string> = {
  'animal-squirrel': '点一点小松鼠，一起抱住松果。',
  'animal-bear': '点一点小熊，和它挥挥手。',
  'animal-fox': '点一点小狐狸，陪它轻轻跳。',
  'animal-panda': '点一点熊猫，送它嫩竹叶。',
  'animal-giraffe': '点一点长颈鹿，帮它够树叶。',
}


function loadSettings(): AudioSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_SETTINGS

    const parsed: unknown = JSON.parse(stored)
    if (parsed === null || typeof parsed !== 'object') return DEFAULT_SETTINGS

    const saved = parsed as Partial<AudioSettings>
    return {
      musicEnabled: typeof saved.musicEnabled === 'boolean'
        ? saved.musicEnabled
        : DEFAULT_SETTINGS.musicEnabled,
      effectsEnabled: typeof saved.effectsEnabled === 'boolean'
        ? saved.effectsEnabled
        : DEFAULT_SETTINGS.effectsEnabled,
      voiceEnabled: typeof saved.voiceEnabled === 'boolean'
        ? saved.voiceEnabled
        : DEFAULT_SETTINGS.voiceEnabled,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function saveSettings(settings: AudioSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // Storage may be disabled; audio settings still work for this session.
  }
}

function getTonePattern(cue: GameFeedbackCue): {
  notes: number[]
  duration: number
  volume: number
  gap?: number
  waveform?: OscillatorType
} | null {
  switch (cue) {
    case 'journey-start':
      return { notes: [523, 659, 784], duration: 0.16, volume: 0.038, gap: 0.085 }
    case 'scene-hint':
      return { notes: [659, 784], duration: 0.13, volume: 0.022, gap: 0.08 }
    case 'target-tap':
      return { notes: [740], duration: 0.085, volume: 0.026, waveform: 'triangle' }
    case 'gentle-nudge':
      return { notes: [330, 294], duration: 0.12, volume: 0.018, gap: 0.09 }
    case 'drag-start':
      return { notes: [440], duration: 0.1, volume: 0.016 }
    case 'drag-return':
      return { notes: [392, 349], duration: 0.12, volume: 0.016, gap: 0.09 }
    case 'drag-snap':
      return { notes: [587, 740], duration: 0.15, volume: 0.03, gap: 0.08 }
    case 'object-repaired':
      return { notes: [523, 659, 784], duration: 0.19, volume: 0.034, gap: 0.07 }
    case 'scene-complete':
      return { notes: [587, 740, 880], duration: 0.2, volume: 0.032, gap: 0.075 }
    case 'journey-complete':
      return { notes: [523, 659, 784, 988], duration: 0.22, volume: 0.038, gap: 0.07 }
    default:
      return null
  }
}

function getVoiceClip(event: GameFeedbackEvent): VoiceClip | null {
  switch (event.cue) {
    case 'journey-start':
      if (event.sceneId?.startsWith('forest-')) return 'forest-start'
      if (event.sceneId?.startsWith('snow-')) return 'snow-start'
      if (event.sceneId?.startsWith('dino-')) return 'dino-start'
      if (event.sceneId?.startsWith('space-')) return 'space-start'

      if (event.sceneId === 'animal-squirrel') return 'animal-start'
      if (event.sceneId === 'ocean-shell-pearl') return 'ocean-start'
      if (event.sceneId === 'sky-balloon-launch') return 'sky-start'
      if (event.sceneId === 'life-slippers-pair') return 'life-start'
      if (event.sceneId === 'music-soft-drum') return 'music-start'
      if (event.sceneId?.startsWith('farm-')) return 'farm-start'
      if (event.sceneId?.startsWith('garden-')) return 'garden-start'
      return 'start'
    case 'scene-hint':
      return event.sceneId && Object.prototype.hasOwnProperty.call(VOICE_FILES, event.sceneId)
        ? event.sceneId as VoiceClip
        : null
    case 'scene-complete':
      if (event.sceneId?.startsWith('forest-')) return 'forest-praise'
      if (event.sceneId?.startsWith('snow-')) return 'snow-praise'
      if (event.sceneId?.startsWith('dino-')) return 'dino-praise'
      if (event.sceneId?.startsWith('space-')) return 'space-praise'

      if (event.sceneId?.startsWith('ocean-')) return 'ocean-praise'
      if (event.sceneId?.startsWith('sky-')) return 'sky-praise'
      if (event.sceneId?.startsWith('life-')) return 'life-praise'
      if (event.sceneId?.startsWith('music-')) return 'music-praise'
      if (event.sceneId && ANIMAL_SCENE_IDS.has(event.sceneId)) return 'animal-praise'
      if (event.sceneId?.startsWith('farm-')) return 'farm-praise'
      if (event.sceneId?.startsWith('garden-')) return 'garden-praise'
      return 'praise'
    case 'journey-complete':
      if (event.sceneId?.startsWith('forest-')) return 'forest-finish'
      if (event.sceneId?.startsWith('snow-')) return 'snow-finish'
      if (event.sceneId?.startsWith('dino-')) return 'dino-finish'
      if (event.sceneId?.startsWith('space-')) return 'space-finish'

      if (event.sceneId === 'ocean-shell-goodnight') return 'ocean-finish'
      if (event.sceneId === 'sky-moon-blanket') return 'sky-finish'
      if (event.sceneId === 'life-bear-blanket') return 'life-finish'
      if (event.sceneId === 'music-box-goodnight') return 'music-finish'
      if (event.sceneId === 'elephant-bath') return 'animal-finish'
      if (event.sceneId === 'farm-barn-goodnight') return 'farm-finish'
      if (event.sceneId === 'garden-snail-lettuce') return 'garden-finish'
      return 'finish'
    default:
      return null
  }
}

export function useGameAudio(journey: JourneyId | null, thirdPage = false) {
  const [settings, setSettings] = useState<AudioSettings>(loadSettings)
  const settingsRef = useRef(settings)
  const audioContextRef = useRef<AudioContext | null>(null)
  const voiceClipsRef = useRef<Partial<Record<VoiceClip, HTMLAudioElement>>>({})
  const activeVoiceRef = useRef<VoiceClip | null>(null)
  const pendingHintRef = useRef<VoiceClip | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [performing, setPerforming] = useState(false)
  useBackgroundMusic(journey, settings.musicEnabled, speaking, performing, thirdPage)

  const stopVoice = useCallback(() => {
    setSpeaking(false)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    pendingHintRef.current = null
    const active = activeVoiceRef.current
    activeVoiceRef.current = null
    if (!active) return
    const audio = voiceClipsRef.current[active]
    if (!audio) return
    audio.onended = null
    audio.onerror = null
    audio.pause()
    try {
      audio.currentTime = 0
    } catch {
      // An unloaded clip has no playback position to reset.
    }
  }, [])


  useEffect(() => {
    settingsRef.current = settings
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.Audio === 'undefined') return

    for (const clip of Object.keys(VOICE_FILES) as VoiceClip[]) {
      try {
        const audio = new window.Audio()
        audio.preload = 'auto'
        audio.volume = 0.76
        // Version revised sky recordings so returning visitors hear the new targets.
        const voiceVersion = VOICE_FILES[clip].startsWith('sky-') ? '?v=sky-adventure-20261004' : ''
        audio.src = `${import.meta.env.BASE_URL}audio/voice/${VOICE_FILES[clip]}${voiceVersion}`
        voiceClipsRef.current[clip] = audio
        audio.load()
      } catch {
        // A missing browser audio API should not affect gameplay.
      }
    }

    return () => {
      pendingHintRef.current = null
      activeVoiceRef.current = null
      for (const audio of Object.values(voiceClipsRef.current)) {
        if (!audio) continue
        audio.onended = null
        audio.onerror = null
        audio.pause()
      }
      voiceClipsRef.current = {}
    }
  }, [])

  const ensureAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return null

    try {
      const context = audioContextRef.current ?? new window.AudioContext()
      audioContextRef.current = context
      if (context.state === 'suspended') {
        void context.resume().catch(() => undefined)
      }
      return context
    } catch {
      return null
    }
  }, [])

  const { playPerformance: playInstrument, playingRef } = useInstrumentPerformance(settings.effectsEnabled, stopVoice, ensureAudioContext)
  const playPerformance = useCallback(async (...args: Parameters<typeof playInstrument>) => {
    setPerforming(true)
    try { await playInstrument(...args) } finally { if (!playingRef.current) setPerforming(false) }
  }, [playInstrument, playingRef])

  const playNotes = useCallback((
    context: AudioContext,
    notes: number[],
    duration: number,
    volume: number,
    gap = 0.075,
    waveform: OscillatorType = 'sine',
  ) => {
    const startTime = context.currentTime

    notes.forEach((frequency, index) => {
      try {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        const noteStart = startTime + index * gap
        const noteEnd = noteStart + duration

        oscillator.type = waveform
        oscillator.frequency.setValueAtTime(frequency, noteStart)
        gain.gain.setValueAtTime(0.0001, noteStart)
        gain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.025)
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.onended = () => {
          oscillator.disconnect()
          gain.disconnect()
        }
        oscillator.start(noteStart)
        oscillator.stop(noteEnd)
      } catch {
        // An unavailable audio device should never interrupt the scene.
      }
    })
  }, [])

  const playVoiceClip = useCallback(function playVoiceClip(clip: VoiceClip) {
    if (!settingsRef.current.voiceEnabled) return
    const audio = voiceClipsRef.current[clip]
    if (!audio) return

    if (activeVoiceRef.current === clip) return

    // Let the first scene prompt follow the start phrase, and the next scene
    // prompt follow the praise. Keep only the newest pending prompt.
    if (
      !isOpeningOrPraiseClip(clip) &&
      isOpeningOrPraiseClip(activeVoiceRef.current)
    ) {
      pendingHintRef.current = clip
      return
    }

    pendingHintRef.current = null
    const previous = activeVoiceRef.current
    activeVoiceRef.current = null
    if (previous) {
      const previousAudio = voiceClipsRef.current[previous]
      if (previousAudio) {
        previousAudio.onended = null
        previousAudio.onerror = null
        previousAudio.pause()
        try {
          previousAudio.currentTime = 0
        } catch {
          // An unloaded clip has no playback position to reset.
        }
      }
    }

    activeVoiceRef.current = clip
    setSpeaking(true)
    const finish = () => {
      if (activeVoiceRef.current !== clip) return
      activeVoiceRef.current = null
      setSpeaking(false)
      audio.onended = null
      audio.onerror = null
      const nextHint = pendingHintRef.current
      pendingHintRef.current = null
      if (nextHint) playVoiceClip(nextHint)
    }

    audio.onended = finish
    audio.onerror = finish
    try {
      audio.currentTime = 0
      void audio.play().catch(finish)
    } catch {
      // Audio can fail to load or play without blocking the game.
      finish()
    }
  }, [])

  const handleFeedback: GameFeedbackHandler = useCallback((event: GameFeedbackEvent) => {
    const instrumentAction = event.sceneId?.startsWith('music-') && (event.cue === 'target-tap' || event.cue === 'drag-snap')
    if (instrumentAction || playingRef.current) return
    if (settingsRef.current.effectsEnabled) {
      const context = ensureAudioContext()
      const pattern = getTonePattern(event.cue)
      if (context && pattern) {
        playNotes(
          context,
          pattern.notes,
          pattern.duration,
          pattern.volume,
          pattern.gap,
          pattern.waveform,
        )
      }
    }

    const voiceClip = getVoiceClip(event)
    if (voiceClip) playVoiceClip(voiceClip)
    else if (event.cue === 'scene-hint' && event.sceneId && settingsRef.current.voiceEnabled) {
      const hint = NEW_ANIMAL_HINTS[event.sceneId]
      if (hint && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(hint)
        utterance.lang = 'zh-CN'
        utterance.rate = .85
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }
  }, [ensureAudioContext, playNotes, playVoiceClip, playingRef])

  const setAudioSetting = useCallback((key: AudioSettingKey, value: boolean) => {
    const nextSettings = { ...settingsRef.current, [key]: value }
    settingsRef.current = nextSettings
    setSettings(nextSettings)

    if (key === 'musicEnabled' && value) {
      ensureAudioContext()
    }
    if (key === 'voiceEnabled' && !value) stopVoice()
  }, [ensureAudioContext, stopVoice])

  return {
    settings,
    setAudioSetting,
    handleFeedback,
    playPerformance,
  }
}
