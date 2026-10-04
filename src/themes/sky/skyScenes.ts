import type { SceneId } from '../../game/sceneTypes'

// Existing journey IDs remain stable; each now routes to its new story and animation.
export const SKY_SCENES = {
  'sky-balloon-launch': { step: 1, title: '朋友坐气球', hint: '点一点气球篮，出发吧。', ariaLabel: '点击气球篮，让小兔和小熊出发', success: '小兔挥挥手，我们出发啦！', mode: 'tap', prop: 'basket', x: 50, y: 73 },
  'sky-cloud-clear': { step: 2, title: '小鸟来领路', hint: '点一点小鸟，请它带路吧。', ariaLabel: '点击小鸟，请它为气球带路', success: '小鸟展开翅膀，云朵让开啦！', mode: 'tap', prop: 'bird', x: 73, y: 47 },
  'sky-sun-hello': { step: 3, title: '小熊戴帽子', hint: '给小熊戴上帽子吧。', ariaLabel: '把遮阳帽拖到小熊头上，也可以按回车或空格', success: '帽子戴好啦，小兔拍手谢谢你！', mode: 'drag', prop: 'hat', x: 65, y: 38 },
  'sky-cloud-train': { step: 4, title: '云火车接朋友', hint: '点一点车头，开车吧。', ariaLabel: '点击向左的车头，让云火车出发', success: '朋友们挥手，云火车向前开啦！', mode: 'tap', prop: 'train', x: 30, y: 62 },
  'sky-rainbow-bridge': { step: 5, title: '小兔过彩虹桥', hint: '把彩虹片放到空缺里吧。', ariaLabel: '把唯一的彩虹片放进桥的缺口，也可以按回车或空格', success: '彩虹桥接好啦，小熊迎接小兔！', mode: 'drag', prop: 'rainbow-piece', x: 50, y: 60 },
  'sky-airship-letter': { step: 6, title: '鸽子送天空信', hint: '把信放进鸽子的邮袋吧。', ariaLabel: '把信封拖进鸽子的邮袋，也可以按回车或空格', success: '鸽子带着信飞回家，朋友们挥挥手！', mode: 'drag', prop: 'letter', x: 70, y: 61 },
  'sky-rain-cloud': { step: 7, title: '给小鸟撑伞', hint: '把小伞送到小鸟上方吧。', ariaLabel: '把展开的小伞拖到小鸟上方，也可以按回车或空格', success: '小鸟淋不到雨啦，开心地抖抖羽毛！', mode: 'drag', prop: 'umbrella', x: 68, y: 42 },
  'sky-windmill-spin': { step: 8, title: '小熊的小风车', hint: '点一点小风车，让小熊吹吹吧。', ariaLabel: '点击玩具风车，让小熊吹动叶片', success: '小熊吹吹，风车转起来，准备回家啦！', mode: 'tap', prop: 'rotor', x: 49, y: 59 },
  'sky-star-home': { step: 9, title: '萤火虫带路', hint: '点一点萤火虫，请它带路吧。', ariaLabel: '点击萤火虫，请它为朋友们照亮回家的路', success: '萤火虫亮起柔光，朋友们到家啦！', mode: 'tap', prop: 'firefly', x: 60, y: 65 },
  'sky-moon-blanket': { step: 10, title: '旅行朋友晚安', hint: '给小兔和小熊盖上被子吧。', ariaLabel: '把云朵被子拖到小兔和小熊身上，也可以按回车或空格', success: '被子盖好啦，小兔和小熊晚安！', mode: 'drag', prop: 'blanket', x: 53, y: 65 },
} as const satisfies Partial<Record<SceneId, {step: number; title: string; hint: string; ariaLabel: string; success: string; mode: 'tap' | 'drag'; prop: string; x: number; y: number}>>

export type SkySceneId = keyof typeof SKY_SCENES
export function isSkyScene(id: SceneId): id is SkySceneId { return Object.hasOwn(SKY_SCENES, id) }
