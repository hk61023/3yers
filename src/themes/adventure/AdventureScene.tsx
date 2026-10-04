import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { SceneProps } from '../../game/sceneTypes'
import { TapTarget } from '../../game/interaction/TapTarget'
import { ForgivingDrag } from '../../game/interaction/ForgivingDrag'
import { ADVENTURE_SCENES, type AdventureLayer, type AdventureSceneId } from './adventureScenes'
import './adventure.css'

const image = (asset: string) => `/images/themes/${asset}.webp`
const place = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` })

function Layer({ layer, helped }: { layer: AdventureLayer; helped: boolean }) {
  return <div className={`adventure-layer${helped ? ` adventure-motion--${layer.motion}` : ''}`} style={place(layer.x, layer.y, layer.w, layer.h)} aria-hidden="true"><img src={image(helped && layer.after ? layer.after : layer.asset)} alt="" draggable={false} /></div>
}

export function AdventureScene({ sceneId, onComplete, onFeedback, onInteractionActivity, hintVisible }: SceneProps & { sceneId: AdventureSceneId }) {
  const config = ADVENTURE_SCENES[sceneId]
  const [helped, setHelped] = useState(false)
  const started = useRef(false)
  const finished = useRef(false)
  const timer = useRef<number | null>(null)
  const target = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const assets = [...config.layers.flatMap(layer => layer.after ? [layer.after] : []), ...config.afterLayers.map(layer => layer.asset)]
    if (config.afterProp) assets.push(config.afterProp)
    if (config.completedBackground) assets.push(`${config.theme}/scenes/${sceneId}-complete`)
    assets.forEach(asset => { const preload = new Image(); preload.src = image(asset) })
    return () => { if (timer.current !== null) window.clearTimeout(timer.current) }
  }, [config, sceneId])

  function help() {
    if (started.current) return
    started.current = true
    setHelped(true)
    onFeedback({ cue: 'object-repaired', sceneId })
    timer.current = window.setTimeout(() => {
      if (finished.current) return
      finished.current = true
      onComplete()
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1200 : 3600)
  }

  const fullCompletion = helped && config.completedBackground
  const art = config.afterProp && helped ? config.afterProp : config.prop
  const actionStyle = { ...place(config.x, config.y, config.w, config.h), '--action-x': `${config.x}%`, '--action-y': `${config.y}%` } as CSSProperties
  return <section className={`adventure-scene adventure-scene--${config.theme} adventure-scene--${config.special || 'regular'}${helped ? ' adventure-scene--helped' : ''}`} role="group" aria-label={config.title} data-adventure-id={sceneId} data-helped={helped}>
    <img className="adventure-background" src={image(`${config.theme}/scenes/${sceneId}${fullCompletion ? '-complete' : ''}`)} alt="" draggable={false} />
    <div className="adventure-prompt" aria-live="polite" aria-atomic="true"><h2>{helped ? config.success : config.title}</h2><p>{helped ? (config.step === 10 ? (config.theme === 'forest' ? '谢谢你，野餐旅行完成啦。' : '谢谢你，朋友们安心休息啦。') : '谢谢你，一起继续旅行吧。') : config.hint}</p></div>

    {!fullCompletion && <>
      {config.decoration && <div className={`adventure-decoration adventure-decoration--${config.decoration}`} style={place(config.x, config.decoration === 'wall-hook' ? config.y - config.h / 2 - 2 : config.y, config.decoration.includes('bridge') ? 85 : 34, config.decoration.includes('bridge') ? 15 : 20)} aria-hidden="true">{config.decoration.includes('bridge') && <><i /><i /><i /><i /></>}</div>}
      {config.layers.map((layer, index) => <Layer key={index} layer={layer} helped={helped} />)}
      {helped && config.afterLayers.map((layer, index) => <Layer key={`after-${index}`} layer={layer} helped />)}

      {config.special === 'train' && <div className="adventure-train" aria-hidden="true">
        <img className="adventure-train__engine" src={image('sky/adventure/train')} alt="" />
        <img className="adventure-train__carriage" src={image('sky/adventure/carriage')} alt="" />
        <div className="adventure-train__passengers"><img src={image(`snow/sprites/rabbit${helped ? '-wave' : ''}`)} alt="" /><img src={image(`snow/sprites/bear${helped ? '-wave' : ''}`)} alt="" /></div>
        <Layer layer={{ asset: 'snow/sprites/penguin', after: 'snow/sprites/penguin-wave', x: 88, y: 87, w: 23, h: 26, motion: 'respond' }} helped={helped} />
      </div>}
      {config.special === 'landing' && <div className="adventure-landing-ship" aria-hidden="true"><img src={image('space/sprites/ship')} alt="" /><span><img src={image('space/sprites/rabbit-wave')} alt="" /><img src={image('space/sprites/bear-wave')} alt="" /></span></div>}
      {config.special === 'water' && helped && <span className="adventure-water" style={{ left: `${config.x}%`, top: `${config.y + 6}%` }} aria-hidden="true" />}
      {config.motion === 'song' && helped && <span className="adventure-song" style={{ left: `${config.x + 10}%`, top: `${config.y - 5}%` }} aria-hidden="true">♪ ♫</span>}
      {config.motion === 'shake-snow' && helped && <div className="adventure-snowflakes" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ left: `${49 + i * 5}%`, animationDelay: `${i * 100}ms` }} />)}</div>}
      {config.special === 'sleep' && <div className="adventure-sleepers" aria-hidden="true">
        {config.theme === 'dino' ? <img src={image('space/sprites/baby-rest-awake')} alt="" /> : <><img src={image('space/sprites/rabbit-rest-awake')} alt="" /><img src={image('space/sprites/bear-rest-awake')} alt="" />{config.theme === 'snow' && <img src={image('space/sprites/penguin-rest-awake')} alt="" />}</>}
      </div>}
    </>}

    {config.mode === 'tap' ? <div className="adventure-tap-position" style={actionStyle}><TapTarget sceneId={sceneId} ariaLabel={config.ariaLabel} disabled={helped} onActivate={help} onFeedback={onFeedback} onInteractionActivity={onInteractionActivity} className={`adventure-tap${hintVisible ? ' adventure-hinted' : ''}`}>
      <span className={`adventure-action-art${helped ? ` adventure-motion--${config.motion || 'respond'}` : ''}`}>{!config.invisibleTap && !fullCompletion && <img src={image(art)} alt="" draggable={false} />}</span>
    </TapTarget></div> : <>
      <div ref={target} className={`adventure-drop${helped ? ' adventure-drop--done' : ''}`} style={actionStyle} aria-hidden="true">{!helped && <img src={image(config.prop)} alt="" draggable={false} />}</div>
      {!helped && <div className={`adventure-source${hintVisible ? ' adventure-hinted' : ''}`}><ForgivingDrag sceneId={sceneId} ariaLabel={config.ariaLabel} targetRef={target} onDrop={help} onFeedback={onFeedback} onInteractionActivity={onInteractionActivity}><img src={image(config.prop)} alt="" draggable={false} /></ForgivingDrag></div>}
      {helped && !config.hidePlaced && !fullCompletion && <Layer layer={{ asset: art, x: config.x, y: config.y, w: config.w, h: config.h, motion: 'placed' }} helped />}
    </>}
    {helped && !fullCompletion && <span className="adventure-thanks" aria-hidden="true">♥</span>}
  </section>
}
