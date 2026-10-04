import type { SceneId } from './sceneTypes'

export type AdventureJourneyId = 'forest' | 'snow' | 'dino' | 'space'

export type NewThemeJourneyId = 'ocean' | 'sky' | 'life' | 'music'
export type JourneyId = 'car' | 'animals' | 'farm' | 'garden' | NewThemeJourneyId | AdventureJourneyId

const ADVENTURE_JOURNEY_ORDER: Record<AdventureJourneyId, readonly SceneId[]> = {
  "forest": [
    "forest-basket-ready",
    "forest-squirrel-guide",
    "forest-leaf-path",
    "forest-picnic-mat",
    "forest-hedgehog-apple",
    "forest-flower-open",
    "forest-rabbit-cup",
    "forest-bird-song",
    "forest-basket-cleanup",
    "forest-friends-goodbye"
  ],
  "snow": [
    "snow-train-arrival",
    "snow-bear-mittens",
    "snow-penguin-greeting",
    "snow-snowman-nose",
    "snow-pine-snow",
    "snow-penguin-scarf",
    "snow-lantern-glow",
    "snow-snack-plate",
    "snow-star-decoration",
    "snow-house-goodnight"
  ],
  "dino": [
    "dino-valley-greeting",
    "dino-leaf-breakfast",
    "dino-backpack-ready",
    "dino-fern-path",
    "dino-creek-bridge",
    "dino-baby-egg",
    "dino-baby-flower",
    "dino-waterfall-discovery",
    "dino-home-door",
    "dino-baby-blanket"
  ],
  "space": [
    "space-ship-launch",
    "space-star-guide",
    "space-bear-helmet",
    "space-landing-pad",
    "space-moon-flower",
    "space-star-mail",
    "space-bridge-light",
    "space-picnic-cushion",
    "space-ship-home",
    "space-friends-blanket"
  ]
}

const NEW_THEME_JOURNEY_ORDER: Record<NewThemeJourneyId, readonly SceneId[]> = {
  ocean: [
    'ocean-shell-pearl',
    'ocean-crab-home',
    'ocean-hermit-shell',
    'ocean-starfish-turn',
    'ocean-octopus-wave',
    'ocean-jellyfish-glow',
    'ocean-whale-splash',
    'ocean-seal-ball',
    'ocean-coral-door',
    'ocean-shell-goodnight',
  ],
  sky: [
    'sky-balloon-launch',
    'sky-cloud-clear',
    'sky-sun-hello',
    'sky-cloud-train',
    'sky-rainbow-bridge',
    'sky-airship-letter',
    'sky-rain-cloud',
    'sky-windmill-spin',
    'sky-star-home',
    'sky-moon-blanket',
  ],
  life: [
    'life-slippers-pair',
    'life-wash-hands',
    'life-dry-hands',
    'life-bear-bib',
    'life-breakfast-spoon',
    'life-wipe-table',
    'life-socks-basket',
    'life-hang-coat',
    'life-book-shelf',
    'life-bear-blanket',
  ],
  music: [
    'music-soft-drum',
    'music-bell-ring',
    'music-shaker',
    'music-xylophone',
    'music-pluck-string',
    'music-trumpet',
    'music-accordion',
    'music-bear-dance',
    'music-note-score',
    'music-box-goodnight',
  ],
}

export const CAR_JOURNEY_ORDER: readonly SceneId[] = [
  'stone',
  'bridge',
  'traffic-light',
  'animal-crossing',
  'tire-change',
  'rainy-drive',
  'night-lights',
  'fuel-stop',
  'car-wash',
  'rabbit-feeding',
  'flower-watering',
  'mail-delivery',
  'feed-chicks',
  'kite-flying',
  'puppy-frisbee',
  'toy-cleanup',
  'fish-pond',
  'home-garage',
]

export const SCENE_ORDER: readonly SceneId[] = CAR_JOURNEY_ORDER

export const ANIMAL_JOURNEY_ORDER: readonly SceneId[] = [
  'animal-squirrel',
  'animal-bear',
  'animal-fox',
  'animal-panda',
  'animal-giraffe',
  'kitten-reunion',
  'bird-nest',
  'turtle-beach',
  'lamb-meadow',
  'elephant-bath',
]

export const FARM_JOURNEY_ORDER: readonly SceneId[] = [
  'farm-feed-cow',
  'farm-egg-basket',
  'farm-pig-bath',
  'farm-apple-picking',
  'farm-seed-planting',
  'farm-sheep-brushing',
  'farm-pumpkin-tractor',
  'farm-fill-trough',
  'farm-carrot-harvest',
  'farm-barn-goodnight',
]

export const GARDEN_JOURNEY_ORDER: readonly SceneId[] = [
  'garden-water-daisy',
  'garden-plant-sunflower',
  'garden-butterfly-flower',
  'garden-pick-strawberry',
  'garden-sweep-leaves',
  'garden-stone-path',
  'garden-gate-hedgehog',
  'garden-light-lantern',
  'garden-dandelion-wish',
  'garden-snail-lettuce',
]

export function getJourneySceneOrder(journeyId: JourneyId): readonly SceneId[] {
  switch (journeyId) {
    case 'forest':
    case 'snow':
    case 'dino':
    case 'space':
      return ADVENTURE_JOURNEY_ORDER[journeyId]
    case 'ocean':
    case 'sky':
    case 'life':
    case 'music':
      return NEW_THEME_JOURNEY_ORDER[journeyId]
    case 'animals':
      return ANIMAL_JOURNEY_ORDER
    case 'farm':
      return FARM_JOURNEY_ORDER
    case 'garden':
      return GARDEN_JOURNEY_ORDER
    case 'car':
      return CAR_JOURNEY_ORDER
  }
}

export const SCENE_DETAILS: Record<SceneId, { title: string }> = {
  "forest-basket-ready": { title: "野餐篮准备好" },
  "forest-squirrel-guide": { title: "松鼠来领路" },
  "forest-leaf-path": { title: "大叶子让路" },
  "forest-picnic-mat": { title: "铺好野餐垫" },
  "forest-hedgehog-apple": { title: "小刺猬吃苹果" },
  "forest-flower-open": { title: "野餐旁的花开啦" },
  "forest-rabbit-cup": { title: "给小兔摆杯子" },
  "forest-bird-song": { title: "小鸟唱欢迎歌" },
  "forest-basket-cleanup": { title: "把空餐盒收好" },
  "forest-friends-goodbye": { title: "森林朋友再见" },
  "snow-train-arrival": { title: "雪地小列车到站" },
  "snow-bear-mittens": { title: "给小熊戴手套" },
  "snow-penguin-greeting": { title: "小企鹅打招呼" },
  "snow-snowman-nose": { title: "雪人装鼻子" },
  "snow-pine-snow": { title: "松树抖抖雪" },
  "snow-penguin-scarf": { title: "给小企鹅围围巾" },
  "snow-lantern-glow": { title: "雪屋灯亮啦" },
  "snow-snack-plate": { title: "给朋友摆点心" },
  "snow-star-decoration": { title: "雪屋挂星星" },
  "snow-house-goodnight": { title: "雪地朋友晚安" },
  "dino-valley-greeting": { title: "小恐龙欢迎你" },
  "dino-leaf-breakfast": { title: "小恐龙吃早餐" },
  "dino-backpack-ready": { title: "小恐龙背小包" },
  "dino-fern-path": { title: "蕨叶让让路" },
  "dino-creek-bridge": { title: "小桥接起来" },
  "dino-baby-egg": { title: "恐龙宝宝探头" },
  "dino-baby-flower": { title: "送宝宝一朵花" },
  "dino-waterfall-discovery": { title: "小瀑布唱歌" },
  "dino-home-door": { title: "山谷小屋开门" },
  "dino-baby-blanket": { title: "恐龙宝宝盖被子" },
  "space-ship-launch": { title: "小飞船出发" },
  "space-star-guide": { title: "星星朋友领路" },
  "space-bear-helmet": { title: "小熊戴头盔" },
  "space-landing-pad": { title: "着陆垫铺好" },
  "space-moon-flower": { title: "月亮花开啦" },
  "space-star-mail": { title: "送一封星星信" },
  "space-bridge-light": { title: "星光小桥亮起来" },
  "space-picnic-cushion": { title: "给星星摆坐垫" },
  "space-ship-home": { title: "小飞船回家" },
  "space-friends-blanket": { title: "星空旅行晚安" },

  'ocean-crab-home': { title: "小螃蟹回沙窝" },
  'ocean-hermit-shell': { title: "给寄居蟹新家" },
  'ocean-starfish-turn': { title: "小海星翻个身" },
  'ocean-octopus-wave': { title: "小章鱼打招呼" },
  'ocean-jellyfish-glow': { title: "水母亮起来" },
  'ocean-whale-splash': { title: "小鲸鱼喷水" },
  'ocean-seal-ball': { title: "小海豹玩皮球" },
  'ocean-coral-door': { title: "珊瑚小屋开门" },
  'ocean-shell-goodnight': { title: "海底朋友晚安" },
  'sky-cloud-clear': { title: "小鸟来领路" },
  'sky-sun-hello': { title: "小熊戴帽子" },
  'sky-cloud-train': { title: "云火车接朋友" },
  'sky-rainbow-bridge': { title: "小兔过彩虹桥" },
  'sky-airship-letter': { title: "鸽子送天空信" },
  'sky-rain-cloud': { title: "给小鸟撑伞" },
  'sky-windmill-spin': { title: "小熊的小风车" },
  'sky-star-home': { title: "萤火虫带路" },
  'sky-moon-blanket': { title: "旅行朋友晚安" },
  'life-wash-hands': { title: "泡泡洗小手" },
  'life-dry-hands': { title: "毛巾擦擦手" },
  'life-bear-bib': { title: "小熊戴围兜" },
  'life-breakfast-spoon': { title: "早餐摆勺子" },
  'life-wipe-table': { title: "纸巾擦桌子" },
  'life-socks-basket': { title: "袜子进篮子" },
  'life-hang-coat': { title: "挂好小外套" },
  'life-book-shelf': { title: "图画书回书架" },
  'life-bear-blanket': { title: "小朋友盖被子" },
  'music-bell-ring': { title: "铃铛叮叮" },
  'music-shaker': { title: "沙锤沙沙" },
  'music-xylophone': { title: "木琴小旋律" },
  'music-pluck-string': { title: "拨一下琴弦" },
  'music-trumpet': { title: "小号唱歌" },
  'music-accordion': { title: "手风琴伸伸腰" },
  'music-bear-dance': { title: "古筝小旋律" },
  'music-note-score': { title: "二胡唱小曲" },
  'music-box-goodnight': { title: "八音盒晚安" },
  'ocean-shell-pearl': { title: '贝壳打开啦' },
  'sky-balloon-launch': { title: '朋友坐气球' },
  'life-slippers-pair': { title: '拖鞋摆整齐' },
  'music-soft-drum': { title: '小鼓咚咚' },
  stone: {
    title: '石头挡路',
  },
  bridge: {
    title: '修好小桥',
  },
  'traffic-light': {
    title: '红绿灯放行',
  },
  'animal-crossing': {
    title: '小鸭子过马路',
  },
  'tire-change': {
    title: '换上新轮胎',
  },
  'rainy-drive': {
    title: '雨天开雨刷',
  },
  'night-lights': {
    title: '夜间开车灯',
  },
  'fuel-stop': {
    title: '给小车加油',
  },
  'car-wash': {
    title: '泡泡洗车',
  },
  'rabbit-feeding': {
    title: '给兔子送胡萝卜',
  },
  'flower-watering': {
    title: '给花浇水',
  },
  'mail-delivery': {
    title: '帮忙送信',
  },
  'feed-chicks': {
    title: '喂小鸡吃谷粒',
  },
  'kite-flying': {
    title: '放飞小风筝',
  },
  'puppy-frisbee': {
    title: '陪小狗玩飞盘',
  },
  'toy-cleanup': {
    title: '收好玩具',
  },
  'fish-pond': {
    title: '帮助小鱼回池塘',
  },
  'home-garage': {
    title: '回家停车',
  },
  'kitten-reunion': {
    title: '小猫找到妈妈',
  },
  'bird-nest': {
    title: '小鸟回鸟窝',
  },
  'turtle-beach': {
    title: '小海龟回海边',
  },
  'lamb-meadow': {
    title: '小绵羊吃青草',
  },
  'elephant-bath': {
    title: '小象洗澡啦',
  },
  'animal-squirrel': { title: '小松鼠抱松果' },
  'animal-bear': { title: '小熊挥挥手' },
  'animal-fox': { title: '小狐狸跳一跳' },
  'animal-panda': { title: '熊猫吃竹叶' },
  'animal-giraffe': { title: '长颈鹿够树叶' },
  'farm-feed-cow': { title: '给奶牛喂干草' },
  'farm-egg-basket': { title: '收鸡蛋啦' },
  'farm-pig-bath': { title: '给小猪洗澡' },
  'farm-apple-picking': { title: '摘苹果装篮' },
  'farm-seed-planting': { title: '种下一粒种子' },
  'farm-sheep-brushing': { title: '帮绵羊梳梳毛' },
  'farm-pumpkin-tractor': { title: '南瓜装上拖拉机' },
  'farm-fill-trough': { title: '给小水槽添水' },
  'farm-carrot-harvest': { title: '拔出胡萝卜' },
  'farm-barn-goodnight': { title: '农场朋友晚安' },
  'garden-water-daisy': { title: '给小雏菊浇水' },
  'garden-plant-sunflower': { title: '种下向日葵种子' },
  'garden-butterfly-flower': { title: '蝴蝶来做客' },
  'garden-pick-strawberry': { title: '摘一颗红草莓' },
  'garden-sweep-leaves': { title: '把叶子扫成堆' },
  'garden-stone-path': { title: '铺好花园小路' },
  'garden-gate-hedgehog': { title: '打开花园小门' },
  'garden-light-lantern': { title: '点亮花园灯' },
  'garden-dandelion-wish': { title: '吹散蒲公英' },
  'garden-snail-lettuce': { title: '小蜗牛吃生菜' },
}

export type GameFlowState =
  | { screen: 'home' }
  | { screen: 'scene'; sceneId: SceneId; journeyId: JourneyId }
  | { screen: 'complete'; journeyId: JourneyId }

export type GameFlowAction =
  | { type: 'start'; journeyId: JourneyId }
  | { type: 'go-home' }
  | { type: 'complete-scene'; sceneId: SceneId }

export const INITIAL_GAME_FLOW: GameFlowState = { screen: 'home' }

export function gameFlowReducer(state: GameFlowState, action: GameFlowAction): GameFlowState {
  switch (action.type) {
    case 'start':
      return {
        screen: 'scene',
        sceneId: getJourneySceneOrder(action.journeyId)[0],
        journeyId: action.journeyId,
      }
    case 'go-home':
      return INITIAL_GAME_FLOW
    case 'complete-scene': {
      if (state.screen !== 'scene' || state.sceneId !== action.sceneId) return state

      const sceneOrder = getJourneySceneOrder(state.journeyId)
      const currentIndex = sceneOrder.indexOf(action.sceneId)
      if (currentIndex < 0) return state
      const nextScene = sceneOrder[currentIndex + 1]

      return nextScene
        ? { ...state, sceneId: nextScene }
        : { screen: 'complete', journeyId: state.journeyId }
    }
    default:
      return state
  }
}

export function getSceneNumber(sceneId: SceneId, journeyId: JourneyId = 'car'): number {
  return getJourneySceneOrder(journeyId).indexOf(sceneId) + 1
}
