import { useEffect, useRef } from 'react'
import type { JourneyId } from '../flow'

export const MENU_BGM = ['wonderland-adventure-menu.mp3', 'fairytale-world-homepage-theme.mp3'] as const
export const THIRD_PAGE_MENU_BGM = 'starry-sky-spaceship-journey.mp3'
export const JOURNEY_BGM: Partial<Record<JourneyId, string>> = {
  car: 'happy-helper-car.mp3', animals: 'little-animal-friends.mp3',
  farm: 'country-farm-day.mp3', garden: 'magical-garden-dreams.mp3',
  ocean: 'whales-pearl-journey.mp3', sky: 'floating-with-friends.mp3',
  life: 'warm-little-moments.mp3', music: 'rhythm-and-melodies.mp3',
  forest: 'woodland-friends-gathering.mp3', snow: 'cozy-winter-village.mp3',
  dino: 'friendly-dinosaur-valley.mp3', space: 'visiting-the-star-friends.mp3',
}

// A single element prevents overlapping playlists across routes and scenes.
export function useBackgroundMusic(journey: JourneyId | null, enabled: boolean, speaking: boolean, performing: boolean, thirdPage = false) {
  const menuTrack = journey === null && thirdPage ? THIRD_PAGE_MENU_BGM : undefined
  const player = useRef<HTMLAudioElement | null>(null)
  const unlocked = useRef(false)
  const current = useRef({ enabled, speaking, performing })
  const requestPlay = useRef<() => void>(() => {})

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    player.current = audio
    const unlock = (event: Event) => {
      if (event instanceof KeyboardEvent && !['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return
      unlocked.current = true
      requestPlay.current()
    }
    document.addEventListener('pointerdown', unlock, true)
    document.addEventListener('keydown', unlock, true)
    document.addEventListener('click', unlock, true)
    const visibility = () => { if (document.hidden) audio.pause(); else requestPlay.current() }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('pointerdown', unlock, true)
      document.removeEventListener('keydown', unlock, true)
      document.removeEventListener('click', unlock, true)
      document.removeEventListener('visibilitychange', visibility)
      audio.onended = null
      audio.onerror = null
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      player.current = null
      requestPlay.current = () => {}
    }
  }, [])

  useEffect(() => {
    const audio = player.current
    if (!audio) return
    const track = journey ? JOURNEY_BGM[journey] : undefined
    const playlist: readonly string[] = track ? [track] : menuTrack ? [menuTrack] : MENU_BGM
    let index = 0
    let disposed = false
    let loadingPlay = false
    const failed = new Set<string>()
    const play = () => {
      const state = current.current
      if (disposed || loadingPlay || !unlocked.current || !state.enabled || state.performing || document.hidden || failed.has(playlist[index])) return
      if (!audio.paused) return
      audio.volume = state.speaking ? 0.035 : 0.13
      loadingPlay = true
      void audio.play().catch(() => { /* Browser restrictions and missing audio never block gameplay. */ }).finally(() => {
        loadingPlay = false
        if (disposed) return
        if (!current.current.enabled || current.current.performing || document.hidden) audio.pause()
      })
    }
    const select = () => {
      audio.pause()
      audio.src = `${import.meta.env.BASE_URL}audio/bgm/${playlist[index]}?v=20261004-bgm2`
      audio.loop = playlist.length === 1
      audio.load()
      loadingPlay = false
      play()
    }
    requestPlay.current = play
    audio.onended = () => { index = (index + 1) % playlist.length; select() }
    audio.onerror = () => {
      failed.add(playlist[index])
      if (failed.size >= playlist.length) { audio.pause(); return }
      index = (index + 1) % playlist.length
      select()
    }
    select()
    return () => { disposed = true; audio.onended = null; audio.onerror = null; audio.pause() }
  }, [journey, menuTrack])

  useEffect(() => {
    current.current = { enabled, speaking, performing }
    const audio = player.current
    if (!audio) return
    audio.volume = speaking ? 0.035 : 0.13
    if (!enabled || performing || document.hidden) audio.pause()
    else requestPlay.current()
  }, [enabled, speaking, performing])
}
