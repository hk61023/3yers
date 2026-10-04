import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { TapTarget } from '../../game/interaction/TapTarget'
import { ForgivingDrag } from '../../game/interaction/ForgivingDrag'
import type { SceneProps } from '../../game/sceneTypes'
import { SKY_SCENES, type SkySceneId } from './skyScenes'
import './sky-adventure.css'

const image = (name: string) => `/images/themes/sky/adventure/${name}.webp`
const position = (x: number, y: number, width: number, height = width): CSSProperties => ({ left: `${x}%`, top: `${y}%`, width: `${width}%`, height: `${height}%` })

function Sprite({ name, x, y, w, h = w, className = '' }: {name: string; x: number; y: number; w: number; h?: number; className?: string}) {
  return <div className={`sky-sprite ${className}`} style={position(x, y, w, h)} aria-hidden="true"><img src={image(name)} alt="" draggable={false} /></div>
}

export function SkyAdventureScene({ sceneId, onComplete, onFeedback, onInteractionActivity, hintVisible }: SceneProps & {sceneId: SkySceneId}) {
  const config = SKY_SCENES[sceneId]
  const n = config.step
  const [helped, setHelped] = useState(false)
  const started = useRef(false)
  const completed = useRef(false)
  const timer = useRef<number | null>(null)
  const dropTarget = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const assets = ['rabbit-wave', 'bear-wave', 'bear-hat', 'bear-blow', 'bird-fly', 'pigeon-fly', 'blanket-open', 'bed-covered', 'bed-covered-mobile']
    for (const name of assets) { const preload = new Image(); preload.src = image(name) }
    return () => { if (timer.current !== null) window.clearTimeout(timer.current) }
  }, [])

  function help() {
    if (started.current) return
    started.current = true
    setHelped(true)
    onFeedback({ cue: 'object-repaired', sceneId })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = window.setTimeout(() => {
      if (completed.current) return
      completed.current = true
      onComplete()
    }, reduced ? 1200 : 3600)
  }

  const rabbit = helped ? 'rabbit-wave' : 'rabbit'
  const bear = helped ? 'bear-wave' : 'bear'
  const balloonScene = [1, 2, 3, 8, 9].includes(n)
  const closeBasket = [2, 3, 8].includes(n)
  const tapInvisible = [1, 4].includes(n)

  return <section className={`sky-adventure sky-adventure--${n}${helped ? ' sky-adventure--helped' : ''}`} style={{ '--action-x': `${config.x}%`, '--action-y': `${config.y}%` } as CSSProperties} role="group" aria-label={config.title} data-sky-step={n} data-helped={helped}>
    <picture className="sky-adventure__background">
      {n === 10 && <source media="(max-width:600px)" srcSet={image(helped ? 'bed-covered-mobile' : 'bed-mobile')} />}
      <img src={image(n === 10 && helped ? 'bed-covered' : `bg-${String(n).padStart(2, '0')}`)} alt="" draggable={false} />
    </picture>
    <div className="sky-adventure__prompt" aria-live="polite" aria-atomic="true"><h2>{helped ? config.success : config.title}</h2><p>{helped ? (n === 10 ? '朋友们安心休息啦。' : '谢谢你，一起继续旅行吧。') : config.hint}</p></div>

    {balloonScene && <div className={`sky-balloon-group${closeBasket ? ' sky-balloon-group--close' : ''}`} aria-hidden="true">
      {!closeBasket && <img className="sky-balloon-canopy" src={image('balloon')} alt="" draggable={false} />}
      <div className="sky-balloon-friends">
        <img className={`sky-rabbit${helped ? ' sky-respond' : ''}`} src={image(helped ? 'rabbit-seated' : 'rabbit')} alt="" draggable={false} />
        <img className={`sky-bear${helped ? ' sky-respond' : ''}`} src={image(n === 8 && helped ? 'bear-blow' : n > 3 || (n === 3 && helped) ? 'bear-hat' : bear)} alt="" draggable={false} />
      </div>
      <img className="sky-basket-front" src={image('basket')} alt="" draggable={false} />
    </div>}
    {n === 2 && <><span className="sky-blocking-cloud sky-blocking-cloud--left" aria-hidden="true" /><span className="sky-blocking-cloud sky-blocking-cloud--right" aria-hidden="true" /></>}
    {n === 4 && <>
      <Sprite name="balloon" x={87} y={36} w={12} h={25} className="sky-parked" />
      <Sprite name="bird" x={83} y={51} w={15} h={18} />
      <div className="sky-train-group" aria-hidden="true">
        <img className="sky-train-engine" src={image('train')} alt="" draggable={false} />
        <div className="sky-train-passengers"><div><img src={image(helped ? 'rabbit-wave' : 'rabbit')} alt="" /></div><div><img src={image('bear-hat')} alt="" /></div></div>
        <img className="sky-train-carriage" src={image('carriage')} alt="" draggable={false} />
        {helped && <div className="sky-moving-wheels"><i /><i /><i /><i /></div>}
      </div>
    </>}
    {n === 5 && <>
      <span className="sky-friend-cloud sky-friend-cloud--left" aria-hidden="true" /><span className="sky-friend-cloud sky-friend-cloud--right" aria-hidden="true" />
      <div className="sky-rainbow-bridge" aria-hidden="true"><img src={image('rainbow')} alt="" /><span className={helped ? 'sky-bridge-gap sky-bridge-gap--closed' : 'sky-bridge-gap'} /></div>
      <Sprite name={rabbit} x={25} y={55} w={22} h={27} className="sky-crossing-rabbit" />
      <Sprite name="bear-hat" x={78} y={55} w={23} h={26} className={helped ? 'sky-respond' : ''} />
      <Sprite name="balloon" x={89} y={26} w={11} h={23} className="sky-parked" />
    </>}
    {[6, 7].includes(n) && <>
      <span className="sky-cloud-deck" aria-hidden="true" />
      <Sprite name={rabbit} x={23} y={58} w={21} h={30} className={helped ? 'sky-respond' : ''} />
      <Sprite name="bear-hat" x={43} y={59} w={23} h={29} className={helped ? 'sky-respond' : ''} />
      <Sprite name="balloon" x={12} y={32} w={12} h={27} className="sky-parked" />
    </>}
    {n === 6 && <Sprite name={helped ? 'pigeon-fly' : 'pigeon'} x={72} y={54} w={29} h={33} className="sky-post-pigeon" />}
    {n === 7 && <>
      <div className="sky-rain-shelter" aria-hidden="true"><i /><i /></div><span className="sky-bird-branch" aria-hidden="true" />
      <Sprite name={helped ? 'bird-fly' : 'bird'} x={68} y={59} w={24} h={25} className={helped ? 'sky-bird-shake' : ''} />
      <div className="sky-rain" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--rain-index': i } as CSSProperties} />)}</div>
      {helped && <><Sprite name="umbrella" x={68} y={40} w={34} h={31} /><span className="sky-umbrella-support" aria-hidden="true" /><span className="sky-rain-edge" aria-hidden="true" /></>}
    </>}
    {n === 8 && <><span className="sky-pinwheel-stick" aria-hidden="true" />{helped && <span className="sky-breath" aria-hidden="true">〰</span>}</>}
    {n === 10 && !helped && <>
      <Sprite name="rabbit-awake" x={39} y={62} w={27} h={34} />
      <Sprite name="bear-awake" x={66} y={63} w={27} h={33} />
      <Sprite name="hat" x={86} y={76} w={13} h={14} />
    </>}

    {config.mode === 'tap' ? <TapTarget sceneId={sceneId} ariaLabel={config.ariaLabel} disabled={helped} onActivate={help} onFeedback={onFeedback} onInteractionActivity={onInteractionActivity} className={`sky-action sky-action--${config.prop}${hintVisible ? ' sky-hinted' : ''}`}>
      <span className="sky-action__art">{!tapInvisible && <img src={image(n === 2 && helped ? 'bird-fly' : config.prop)} alt="" draggable={false} />}</span>
    </TapTarget> : <>
      <div ref={dropTarget} className={`sky-drop sky-drop--${config.prop}${helped ? ' sky-drop--done' : ''}`} style={position(config.x, config.y, n === 10 ? 47 : 26, n === 10 ? 35 : 25)} aria-hidden="true">{!helped && <img src={image(config.prop)} alt="" draggable={false} />}</div>
      {!helped && <div className={`sky-source${hintVisible ? ' sky-hinted' : ''}`}><ForgivingDrag sceneId={sceneId} ariaLabel={config.ariaLabel} targetRef={dropTarget} disabled={helped} onDrop={help} onFeedback={onFeedback} onInteractionActivity={onInteractionActivity}><img src={image(n === 5 ? 'rainbow-piece' : config.prop)} alt="" draggable={false} /></ForgivingDrag></div>}
    </>}
    {helped && n !== 10 && <span className="sky-thank-you" aria-hidden="true">♥</span>}
  </section>
}
