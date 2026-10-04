import type { SceneId } from '../../game/sceneTypes'
export type AdventureTheme = 'forest' | 'snow' | 'dino' | 'space'
export interface AdventureLayer { asset: string; after?: string; x: number; y: number; w: number; h: number; motion: string }
export interface AdventureConfig { theme: AdventureTheme; step: number; title: string; hint: string; ariaLabel: string; success: string; mode: 'tap' | 'drag'; x: number; y: number; prop: string; afterProp?: string; w: number; h: number; layers: AdventureLayer[]; afterLayers: AdventureLayer[]; motion?: string; decoration?: string; special?: string; hidePlaced?: boolean; invisibleTap?: boolean; completedBackground?: boolean }
export const ADVENTURE_SCENE_IDS = [
  "forest-basket-ready",
  "forest-squirrel-guide",
  "forest-leaf-path",
  "forest-picnic-mat",
  "forest-hedgehog-apple",
  "forest-flower-open",
  "forest-rabbit-cup",
  "forest-bird-song",
  "forest-basket-cleanup",
  "forest-friends-goodbye",
  "snow-train-arrival",
  "snow-bear-mittens",
  "snow-penguin-greeting",
  "snow-snowman-nose",
  "snow-pine-snow",
  "snow-penguin-scarf",
  "snow-lantern-glow",
  "snow-snack-plate",
  "snow-star-decoration",
  "snow-house-goodnight",
  "dino-valley-greeting",
  "dino-leaf-breakfast",
  "dino-backpack-ready",
  "dino-fern-path",
  "dino-creek-bridge",
  "dino-baby-egg",
  "dino-baby-flower",
  "dino-waterfall-discovery",
  "dino-home-door",
  "dino-baby-blanket",
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
] as const
export type AdventureSceneId = typeof ADVENTURE_SCENE_IDS[number]
export const ADVENTURE_SCENES: Record<AdventureSceneId, AdventureConfig> = {
  "forest-basket-ready": {
    "theme": "forest",
    "step": 1,
    "title": "野餐篮准备好",
    "hint": "把野餐篮送给小熊吧。",
    "ariaLabel": "把野餐篮拖到小熊身边，也可以按回车或空格完成。",
    "success": "篮子准备好啦！",
    "mode": "drag",
    "x": 65,
    "y": 64,
    "prop": "forest/sprites/basket",
    "w": 32,
    "h": 22,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 27,
        "y": 54,
        "w": 28,
        "h": 32,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 65,
        "y": 51,
        "w": 30,
        "h": 35,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": []
  },
  "forest-squirrel-guide": {
    "theme": "forest",
    "step": 2,
    "title": "松鼠来领路",
    "hint": "点一点松鼠，请它带路吧。",
    "ariaLabel": "点击松鼠。",
    "success": "松鼠来带路啦！",
    "mode": "tap",
    "x": 60,
    "y": 57,
    "prop": "forest/sprites/squirrel",
    "w": 30,
    "h": 29,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 16,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 37,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "forest/sprites/squirrel-wave",
    "motion": "guide"
  },
  "forest-leaf-path": {
    "theme": "forest",
    "step": 3,
    "title": "大叶子让路",
    "hint": "点一点大叶子，让让路吧。",
    "ariaLabel": "点击挡路的大叶子。",
    "success": "小路通畅啦！",
    "mode": "tap",
    "x": 52,
    "y": 62,
    "prop": "forest/sprites/leaf",
    "w": 45,
    "h": 31,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 16,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 32,
        "y": 48,
        "w": 23,
        "h": 25,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "leaf-clear"
  },
  "forest-picnic-mat": {
    "theme": "forest",
    "step": 4,
    "title": "铺好野餐垫",
    "hint": "把野餐垫放到草地上吧。",
    "ariaLabel": "把折叠野餐垫拖到草地轮廓，也可以按回车或空格完成。",
    "success": "野餐垫铺好啦！",
    "mode": "drag",
    "x": 50,
    "y": 64,
    "prop": "forest/sprites/mat-folded",
    "w": 52,
    "h": 27,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 27,
        "y": 48,
        "w": 23,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 67,
        "y": 49,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "forest/sprites/squirrel",
        "x": 79,
        "y": 60,
        "w": 20,
        "h": 22,
        "after": "forest/sprites/squirrel-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "forest/sprites/mat-open"
  },
  "forest-hedgehog-apple": {
    "theme": "forest",
    "step": 5,
    "title": "小刺猬吃苹果",
    "hint": "把苹果片放进小刺猬的餐盘吧。",
    "ariaLabel": "把苹果片拖到小刺猬餐盘，也可以按回车或空格完成。",
    "success": "小刺猬吃得好开心！",
    "mode": "drag",
    "x": 64,
    "y": 63,
    "prop": "forest/sprites/apple",
    "w": 20,
    "h": 15,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "forest/sprites/hedgehog",
        "x": 70,
        "y": 51,
        "w": 30,
        "h": 24,
        "after": "forest/sprites/hedgehog-eat",
        "motion": "eat"
      }
    ],
    "afterLayers": [],
    "decoration": "plate"
  },
  "forest-flower-open": {
    "theme": "forest",
    "step": 6,
    "title": "野餐旁的花开啦",
    "hint": "点一点花苞，开花吧。",
    "ariaLabel": "点击大花苞。",
    "success": "花儿开啦！",
    "mode": "tap",
    "x": 52,
    "y": 58,
    "prop": "forest/sprites/bud",
    "w": 32,
    "h": 35,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 77,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [
      {
        "asset": "forest/sprites/butterfly",
        "x": 66,
        "y": 42,
        "w": 16,
        "h": 14,
        "motion": "flutter"
      }
    ],
    "afterProp": "forest/sprites/flower"
  },
  "forest-rabbit-cup": {
    "theme": "forest",
    "step": 7,
    "title": "给小兔摆杯子",
    "hint": "把杯子放到小兔的杯垫上吧。",
    "ariaLabel": "把杯子拖到小兔面前的杯垫，也可以按回车或空格完成。",
    "success": "小兔有杯子啦！",
    "mode": "drag",
    "x": 80,
    "y": 61,
    "prop": "forest/sprites/cup",
    "w": 22,
    "h": 20,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 63,
        "y": 49,
        "w": 30,
        "h": 32,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 26,
        "y": 48,
        "w": 29,
        "h": 30,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "special": "meal"
  },
  "forest-bird-song": {
    "theme": "forest",
    "step": 8,
    "title": "小鸟唱欢迎歌",
    "hint": "点一点小鸟，唱首小歌吧。",
    "ariaLabel": "点击枝头小鸟。",
    "success": "小鸟唱歌啦！",
    "mode": "tap",
    "x": 58,
    "y": 45,
    "prop": "forest/sprites/bird",
    "w": 30,
    "h": 29,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 19,
        "y": 66,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 38,
        "y": 66,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "song",
    "decoration": "branch"
  },
  "forest-basket-cleanup": {
    "theme": "forest",
    "step": 9,
    "title": "把空餐盒收好",
    "hint": "把空餐盒放回野餐篮吧。",
    "ariaLabel": "把空餐盒拖到野餐篮，也可以按回车或空格完成。",
    "success": "餐盒收好啦！",
    "mode": "drag",
    "x": 66,
    "y": 62,
    "prop": "forest/sprites/lunchbox",
    "w": 25,
    "h": 18,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "forest/sprites/basket",
        "x": 66,
        "y": 60,
        "w": 39,
        "h": 28,
        "after": "forest/sprites/basket-closed",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true
  },
  "forest-friends-goodbye": {
    "theme": "forest",
    "step": 10,
    "title": "森林朋友再见",
    "hint": "点一点松鼠，说再见吧。",
    "ariaLabel": "点击松鼠。",
    "success": "森林朋友，再见啦！",
    "mode": "tap",
    "x": 56,
    "y": 57,
    "prop": "forest/sprites/squirrel",
    "w": 30,
    "h": 29,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 21,
        "y": 59,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "depart-left"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 37,
        "y": 60,
        "w": 24,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "depart-left"
      },
      {
        "asset": "forest/sprites/hedgehog",
        "x": 79,
        "y": 64,
        "w": 22,
        "h": 19,
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "forest/sprites/squirrel-wave",
    "motion": "wave"
  },
  "snow-train-arrival": {
    "theme": "snow",
    "step": 1,
    "title": "雪地小列车到站",
    "hint": "点一点车头，到站吧。",
    "ariaLabel": "点击车头。",
    "success": "小列车到站啦！",
    "mode": "tap",
    "x": 32,
    "y": 62,
    "prop": "sky/adventure/train",
    "w": 40,
    "h": 32,
    "layers": [],
    "afterLayers": [],
    "special": "train",
    "invisibleTap": true
  },
  "snow-bear-mittens": {
    "theme": "snow",
    "step": 2,
    "title": "给小熊戴手套",
    "hint": "给小熊戴上手套吧。",
    "ariaLabel": "把成对手套拖到小熊手边，也可以按回车或空格完成。",
    "success": "手套戴好啦！",
    "mode": "drag",
    "x": 64,
    "y": 53,
    "prop": "snow/sprites/mittens",
    "w": 35,
    "h": 28,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 25,
        "y": 56,
        "w": 26,
        "h": 31,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 64,
        "y": 53,
        "w": 35,
        "h": 40,
        "after": "snow/sprites/bear-mittens",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true
  },
  "snow-penguin-greeting": {
    "theme": "snow",
    "step": 3,
    "title": "小企鹅打招呼",
    "hint": "点一点小企鹅，打个招呼吧。",
    "ariaLabel": "点击小企鹅。",
    "success": "你好，小企鹅！",
    "mode": "tap",
    "x": 52,
    "y": 60,
    "prop": "snow/sprites/penguin",
    "w": 30,
    "h": 29,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 23,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 43,
        "y": 60,
        "w": 26,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "snow/sprites/penguin-greeting-wave",
    "motion": "wave"
  },
  "snow-snowman-nose": {
    "theme": "snow",
    "step": 4,
    "title": "雪人装鼻子",
    "hint": "把胡萝卜放到雪人的鼻子上吧。",
    "ariaLabel": "把胡萝卜拖到雪人鼻子轮廓，也可以按回车或空格完成。",
    "success": "雪人有鼻子啦！",
    "mode": "drag",
    "x": 55,
    "y": 45,
    "prop": "snow/sprites/carrot",
    "w": 19,
    "h": 14,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 23,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 43,
        "y": 60,
        "w": 26,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/snowman",
        "x": 55,
        "y": 57,
        "w": 36,
        "h": 43,
        "after": "snow/sprites/snowman-complete",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "snow/sprites/carrot",
    "hidePlaced": true
  },
  "snow-pine-snow": {
    "theme": "snow",
    "step": 5,
    "title": "松树抖抖雪",
    "hint": "点一点树枝，抖抖雪吧。",
    "ariaLabel": "点击松树低处的大树枝。",
    "success": "轻轻的雪落下来啦！",
    "mode": "tap",
    "x": 60,
    "y": 47,
    "prop": "snow/sprites/pine-snow",
    "w": 42,
    "h": 29,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 14,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 34,
        "y": 60,
        "w": 26,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [
      {
        "asset": "snow/sprites/star",
        "x": 74,
        "y": 57,
        "w": 8,
        "h": 8,
        "motion": "snowfall"
      }
    ],
    "afterProp": "snow/sprites/pine-clear",
    "motion": "shake-snow"
  },
  "snow-penguin-scarf": {
    "theme": "snow",
    "step": 6,
    "title": "给小企鹅围围巾",
    "hint": "给小企鹅围上围巾吧。",
    "ariaLabel": "把围巾拖到小企鹅颈前，也可以按回车或空格完成。",
    "success": "围巾围好啦！",
    "mode": "drag",
    "x": 56,
    "y": 60,
    "prop": "snow/sprites/scarf",
    "w": 29,
    "h": 19,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 23,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 79,
        "y": 58,
        "w": 23,
        "h": 27,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/penguin",
        "x": 56,
        "y": 56,
        "w": 29,
        "h": 33,
        "after": "snow/sprites/penguin-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true
  },
  "snow-lantern-glow": {
    "theme": "snow",
    "step": 7,
    "title": "雪屋灯亮啦",
    "hint": "点一点灯笼，亮起来吧。",
    "ariaLabel": "点击门边大灯笼。",
    "success": "雪屋暖暖的！",
    "mode": "tap",
    "x": 81,
    "y": 43,
    "prop": "snow/sprites/lantern",
    "w": 24,
    "h": 28,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 23,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 43,
        "y": 60,
        "w": 26,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "glow",
    "decoration": "wall-hook"
  },
  "snow-snack-plate": {
    "theme": "snow",
    "step": 8,
    "title": "给朋友摆点心",
    "hint": "把饼干盘放到小桌上吧。",
    "ariaLabel": "把饼干盘拖到矮桌轮廓，也可以按回车或空格完成。",
    "success": "点心摆好啦！",
    "mode": "drag",
    "x": 52,
    "y": 47,
    "prop": "snow/sprites/plate",
    "w": 35,
    "h": 20,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 27,
        "y": 37,
        "w": 24,
        "h": 27,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 75,
        "y": 37,
        "w": 25,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/penguin",
        "x": 52,
        "y": 33,
        "w": 22,
        "h": 24,
        "after": "snow/sprites/penguin-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "special": "meal",
    "decoration": ""
  },
  "snow-star-decoration": {
    "theme": "snow",
    "step": 9,
    "title": "雪屋挂星星",
    "hint": "把星星挂到雪屋门旁吧。",
    "ariaLabel": "把星星装饰拖到门旁挂位，也可以按回车或空格完成。",
    "success": "星星挂好啦！",
    "mode": "drag",
    "x": 65,
    "y": 48,
    "prop": "snow/sprites/star",
    "w": 30,
    "h": 29,
    "layers": [
      {
        "asset": "snow/sprites/rabbit",
        "x": 23,
        "y": 59,
        "w": 24,
        "h": 28,
        "after": "snow/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "snow/sprites/bear",
        "x": 43,
        "y": 60,
        "w": 26,
        "h": 28,
        "after": "snow/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "glow",
    "decoration": "wall-hook"
  },
  "snow-house-goodnight": {
    "theme": "snow",
    "step": 10,
    "title": "雪地朋友晚安",
    "hint": "点一点小灯，晚安吧。",
    "ariaLabel": "点击床头小灯。",
    "success": "雪地朋友，晚安！",
    "mode": "tap",
    "x": 18,
    "y": 36,
    "prop": "snow/sprites/lantern",
    "w": 25,
    "h": 25,
    "layers": [],
    "afterLayers": [],
    "special": "sleep",
    "completedBackground": true,
    "motion": "dim",
    "invisibleTap": true
  },
  "dino-valley-greeting": {
    "theme": "dino",
    "step": 1,
    "title": "小恐龙欢迎你",
    "hint": "点一点小恐龙，打个招呼吧。",
    "ariaLabel": "点击小恐龙。",
    "success": "你好，小恐龙！",
    "mode": "tap",
    "x": 64,
    "y": 58,
    "prop": "dino/sprites/dinosaur",
    "w": 38,
    "h": 40,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "dino/sprites/dinosaur-wave",
    "motion": "wave"
  },
  "dino-leaf-breakfast": {
    "theme": "dino",
    "step": 2,
    "title": "小恐龙吃早餐",
    "hint": "把嫩叶放进小恐龙的餐盘吧。",
    "ariaLabel": "把嫩叶拖到小恐龙餐盘，也可以按回车或空格完成。",
    "success": "早餐真好吃！",
    "mode": "drag",
    "x": 64,
    "y": 75,
    "prop": "dino/sprites/leaf",
    "w": 23,
    "h": 17,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/dinosaur",
        "x": 67,
        "y": 52,
        "w": 42,
        "h": 44,
        "after": "dino/sprites/dinosaur-eat",
        "motion": "eat"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true,
    "decoration": "plate"
  },
  "dino-backpack-ready": {
    "theme": "dino",
    "step": 3,
    "title": "小恐龙背小包",
    "hint": "给小恐龙背上小包吧。",
    "ariaLabel": "把背包拖到小恐龙背部轮廓，也可以按回车或空格完成。",
    "success": "小包背好啦！",
    "mode": "drag",
    "x": 61,
    "y": 60,
    "prop": "dino/sprites/backpack",
    "w": 23,
    "h": 26,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/dinosaur",
        "x": 67,
        "y": 52,
        "w": 42,
        "h": 44,
        "after": "dino/sprites/dinosaur-bag",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true,
    "decoration": ""
  },
  "dino-fern-path": {
    "theme": "dino",
    "step": 4,
    "title": "蕨叶让让路",
    "hint": "点一点蕨叶，让让路吧。",
    "ariaLabel": "点击挡路的大蕨叶。",
    "success": "小路露出来啦！",
    "mode": "tap",
    "x": 52,
    "y": 59,
    "prop": "dino/sprites/fern",
    "w": 44,
    "h": 38,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/dinosaur-bag",
        "x": 74,
        "y": 54,
        "w": 34,
        "h": 36,
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "leaf-clear"
  },
  "dino-creek-bridge": {
    "theme": "dino",
    "step": 5,
    "title": "小桥接起来",
    "hint": "把桥板放到空缺里吧。",
    "ariaLabel": "把唯一桥板拖到桥的缺口，也可以按回车或空格完成。",
    "success": "小桥接好啦！",
    "mode": "drag",
    "x": 53,
    "y": 45,
    "prop": "dino/sprites/board",
    "w": 32,
    "h": 16,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 14,
        "y": 36,
        "w": 20,
        "h": 23,
        "motion": "cross"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 28,
        "y": 36,
        "w": 20,
        "h": 22,
        "motion": "cross"
      },
      {
        "asset": "dino/sprites/dinosaur-bag",
        "x": 38,
        "y": 36,
        "w": 27,
        "h": 29,
        "motion": "cross"
      }
    ],
    "afterLayers": [],
    "decoration": ""
  },
  "dino-baby-egg": {
    "theme": "dino",
    "step": 6,
    "title": "恐龙宝宝探头",
    "hint": "点一点恐龙蛋，和宝宝打招呼吧。",
    "ariaLabel": "点击恐龙蛋。",
    "success": "你好，恐龙宝宝！",
    "mode": "tap",
    "x": 52,
    "y": 63,
    "prop": "dino/sprites/egg",
    "w": 29,
    "h": 29,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/dinosaur-bag",
        "x": 77,
        "y": 54,
        "w": 31,
        "h": 33,
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "dino/sprites/egg-open",
    "motion": "hatch"
  },
  "dino-baby-flower": {
    "theme": "dino",
    "step": 7,
    "title": "送宝宝一朵花",
    "hint": "把小花送给恐龙宝宝吧。",
    "ariaLabel": "把小花拖到恐龙宝宝面前，也可以按回车或空格完成。",
    "success": "宝宝喜欢小花！",
    "mode": "drag",
    "x": 64,
    "y": 62,
    "prop": "dino/sprites/flower",
    "w": 20,
    "h": 19,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/baby",
        "x": 67,
        "y": 53,
        "w": 31,
        "h": 31,
        "after": "dino/sprites/baby-flower",
        "motion": "eat"
      },
      {
        "asset": "dino/sprites/dinosaur",
        "x": 83,
        "y": 42,
        "w": 23,
        "h": 28,
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true
  },
  "dino-waterfall-discovery": {
    "theme": "dino",
    "step": 8,
    "title": "小瀑布唱歌",
    "hint": "点一点小泉眼，让水流下来吧。",
    "ariaLabel": "点击泉水出口。",
    "success": "泉水流下来啦！",
    "mode": "tap",
    "x": 58,
    "y": 48,
    "prop": "dino/sprites/spring-dry",
    "w": 30,
    "h": 26,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "dino/sprites/dinosaur-bag",
        "x": 77,
        "y": 60,
        "w": 29,
        "h": 32,
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "special": "water",
    "afterProp": "dino/sprites/spring"
  },
  "dino-home-door": {
    "theme": "dino",
    "step": 9,
    "title": "山谷小屋开门",
    "hint": "点一点木门，回家吧。",
    "ariaLabel": "点击大木门。",
    "success": "一起回家啦！",
    "mode": "tap",
    "x": 62,
    "y": 49,
    "prop": "dino/sprites/door",
    "w": 38,
    "h": 35,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 23,
        "y": 57,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "enter-house"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 43,
        "y": 58,
        "w": 25,
        "h": 26,
        "after": "sky/adventure/bear-wave",
        "motion": "enter-house"
      },
      {
        "asset": "dino/sprites/dinosaur-bag",
        "x": 78,
        "y": 64,
        "w": 32,
        "h": 35,
        "motion": "enter-house"
      }
    ],
    "afterLayers": [],
    "motion": "door-open"
  },
  "dino-baby-blanket": {
    "theme": "dino",
    "step": 10,
    "title": "恐龙宝宝盖被子",
    "hint": "给恐龙宝宝盖上被子吧。",
    "ariaLabel": "把被子拖到宝宝身上，也可以按回车或空格完成。",
    "success": "恐龙宝宝，晚安！",
    "mode": "drag",
    "x": 55,
    "y": 62,
    "prop": "dino/sprites/blanket",
    "w": 48,
    "h": 32,
    "layers": [],
    "afterLayers": [],
    "special": "sleep",
    "completedBackground": true
  },
  "space-ship-launch": {
    "theme": "space",
    "step": 1,
    "title": "小飞船出发",
    "hint": "点一点大按钮，出发吧。",
    "ariaLabel": "点击大启动按钮。",
    "success": "小飞船出发啦！",
    "mode": "tap",
    "x": 52,
    "y": 64,
    "prop": "space/sprites/launch-button",
    "w": 28,
    "h": 20,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 32,
        "y": 43,
        "w": 27,
        "h": 31,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 66,
        "y": 43,
        "w": 28,
        "h": 31,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "special": "cockpit",
    "motion": "glow"
  },
  "space-star-guide": {
    "theme": "space",
    "step": 2,
    "title": "星星朋友领路",
    "hint": "点一点星星朋友，请它带路吧。",
    "ariaLabel": "点击星星朋友。",
    "success": "跟着星星出发吧！",
    "mode": "tap",
    "x": 56,
    "y": 50,
    "prop": "space/sprites/star",
    "w": 34,
    "h": 32,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 25,
        "y": 66,
        "w": 25,
        "h": 27,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 76,
        "y": 66,
        "w": 26,
        "h": 27,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "space/sprites/star-wave",
    "motion": "guide",
    "special": "cockpit"
  },
  "space-bear-helmet": {
    "theme": "space",
    "step": 3,
    "title": "小熊戴头盔",
    "hint": "给小熊戴上头盔吧。",
    "ariaLabel": "把头盔拖到小熊头上，也可以按回车或空格完成。",
    "success": "头盔戴好啦！",
    "mode": "drag",
    "x": 64,
    "y": 43,
    "prop": "space/sprites/helmet",
    "w": 32,
    "h": 26,
    "layers": [
      {
        "asset": "space/sprites/rabbit",
        "x": 26,
        "y": 55,
        "w": 28,
        "h": 34,
        "after": "space/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "space/sprites/bear",
        "x": 64,
        "y": 54,
        "w": 35,
        "h": 42,
        "after": "space/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "hidePlaced": true
  },
  "space-landing-pad": {
    "theme": "space",
    "step": 4,
    "title": "着陆垫铺好",
    "hint": "把着陆垫放到空位里吧。",
    "ariaLabel": "把圆形着陆垫拖到星球地面轮廓，也可以按回车或空格完成。",
    "success": "小飞船落好啦！",
    "mode": "drag",
    "x": 52,
    "y": 65,
    "prop": "space/sprites/pad-folded",
    "w": 57,
    "h": 22,
    "layers": [],
    "afterLayers": [
      {
        "asset": "space/sprites/star",
        "x": 79,
        "y": 63,
        "w": 24,
        "h": 27,
        "after": "space/sprites/star-wave",
        "motion": "respond"
      }
    ],
    "afterProp": "space/sprites/pad-open",
    "special": "landing"
  },
  "space-moon-flower": {
    "theme": "space",
    "step": 5,
    "title": "月亮花开啦",
    "hint": "点一点月亮花，开花吧。",
    "ariaLabel": "点击大花苞。",
    "success": "月亮花开啦！",
    "mode": "tap",
    "x": 52,
    "y": 58,
    "prop": "space/sprites/bud",
    "w": 33,
    "h": 35,
    "layers": [
      {
        "asset": "space/sprites/rabbit",
        "x": 23,
        "y": 60,
        "w": 24,
        "h": 29,
        "after": "space/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "space/sprites/bear-wave",
        "x": 78,
        "y": 60,
        "w": 25,
        "h": 29,
        "after": "space/sprites/bear-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "afterProp": "space/sprites/flower",
    "motion": "glow"
  },
  "space-star-mail": {
    "theme": "space",
    "step": 6,
    "title": "送一封星星信",
    "hint": "把信放进星星邮筒吧。",
    "ariaLabel": "把信封拖到星星邮筒，也可以按回车或空格完成。",
    "success": "星星信送好啦！",
    "mode": "drag",
    "x": 65,
    "y": 55,
    "prop": "space/sprites/envelope",
    "w": 21,
    "h": 16,
    "layers": [
      {
        "asset": "space/sprites/rabbit",
        "x": 23,
        "y": 60,
        "w": 24,
        "h": 29,
        "after": "space/sprites/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "space/sprites/bear-wave",
        "x": 43,
        "y": 60,
        "w": 25,
        "h": 29,
        "after": "space/sprites/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "space/sprites/mailbox",
        "x": 65,
        "y": 59,
        "w": 35,
        "h": 40,
        "motion": "respond"
      }
    ],
    "afterLayers": [
      {
        "asset": "space/sprites/star-wave",
        "x": 65,
        "y": 46,
        "w": 22,
        "h": 23,
        "motion": "peek"
      }
    ],
    "hidePlaced": true
  },
  "space-bridge-light": {
    "theme": "space",
    "step": 7,
    "title": "星光小桥亮起来",
    "hint": "点一点桥头灯，亮起来吧。",
    "ariaLabel": "点击桥头大灯。",
    "success": "星光小桥亮啦！",
    "mode": "tap",
    "x": 35,
    "y": 59,
    "prop": "space/sprites/lamp",
    "w": 25,
    "h": 27,
    "layers": [
      {
        "asset": "space/sprites/rabbit",
        "x": 20,
        "y": 54,
        "w": 23,
        "h": 28,
        "after": "space/sprites/rabbit-wave",
        "motion": "up-path"
      },
      {
        "asset": "space/sprites/bear-wave",
        "x": 49,
        "y": 54,
        "w": 23,
        "h": 28,
        "motion": "up-path"
      }
    ],
    "afterLayers": [],
    "motion": "glow",
    "decoration": "bridge-lights"
  },
  "space-picnic-cushion": {
    "theme": "space",
    "step": 8,
    "title": "给星星摆坐垫",
    "hint": "把坐垫放到星星朋友旁边吧。",
    "ariaLabel": "把坐垫拖到星星朋友旁的轮廓，也可以按回车或空格完成。",
    "success": "坐垫摆好啦！",
    "mode": "drag",
    "x": 69,
    "y": 63,
    "prop": "space/sprites/cushion",
    "w": 31,
    "h": 16,
    "layers": [
      {
        "asset": "sky/adventure/rabbit",
        "x": 27,
        "y": 40,
        "w": 24,
        "h": 28,
        "after": "sky/adventure/rabbit-wave",
        "motion": "respond"
      },
      {
        "asset": "sky/adventure/bear",
        "x": 46,
        "y": 40,
        "w": 24,
        "h": 27,
        "after": "sky/adventure/bear-wave",
        "motion": "respond"
      },
      {
        "asset": "space/sprites/star",
        "x": 70,
        "y": 44,
        "w": 28,
        "h": 26,
        "after": "space/sprites/star-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "special": "meal",
    "decoration": ""
  },
  "space-ship-home": {
    "theme": "space",
    "step": 9,
    "title": "小飞船回家",
    "hint": "点一点舱门，回家吧。",
    "ariaLabel": "点击飞船舱门。",
    "success": "我们回家啦！",
    "mode": "tap",
    "x": 56,
    "y": 57,
    "prop": "space/sprites/ship-open",
    "w": 61,
    "h": 47,
    "layers": [
      {
        "asset": "space/sprites/rabbit",
        "x": 25,
        "y": 62,
        "w": 20,
        "h": 25,
        "after": "space/sprites/rabbit-wave",
        "motion": "board-ship"
      },
      {
        "asset": "space/sprites/bear-wave",
        "x": 40,
        "y": 62,
        "w": 21,
        "h": 25,
        "motion": "board-ship"
      },
      {
        "asset": "space/sprites/star",
        "x": 83,
        "y": 62,
        "w": 23,
        "h": 25,
        "after": "space/sprites/star-wave",
        "motion": "respond"
      }
    ],
    "afterLayers": [],
    "motion": "ship-depart",
    "afterProp": "space/sprites/ship-closed"
  },
  "space-friends-blanket": {
    "theme": "space",
    "step": 10,
    "title": "星空旅行晚安",
    "hint": "给小兔和小熊盖上被子吧。",
    "ariaLabel": "把星空被子拖到两位伙伴身上，也可以按回车或空格完成。",
    "success": "旅行朋友，晚安！",
    "mode": "drag",
    "x": 53,
    "y": 63,
    "prop": "sky/adventure/blanket",
    "w": 48,
    "h": 32,
    "layers": [],
    "afterLayers": [],
    "special": "sleep",
    "completedBackground": true
  }
}
export function isAdventureScene(id: SceneId): id is AdventureSceneId { return Object.hasOwn(ADVENTURE_SCENES, id) }
