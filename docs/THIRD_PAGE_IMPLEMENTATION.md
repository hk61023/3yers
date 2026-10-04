# 第三页四主题制作与验收

2026-10-04。本地完整实现40关，已完成本地验收，用户后续授权GitHub同步与线上发布。

## 接入与行为

- 四主题各5关点击、5关拖动，沿用SceneProps、TapTarget和ForgivingDrag，目标至少104像素，拖动宽容吸附与Enter/空格完成。场景ID使用原设计候选ID，旅程顺序、标题、组件路由与声音映射均已同步。
- 专用实现位于src/themes/adventure/。每关初始与成功姿态独立，角色回应与环境动作按操作生效、朋友回应、旅程继续展开；完成仅一次，卸载清理计时。正常反馈3600毫秒，降低动态效果1200毫秒。
- 40张独立环境背景、透明道具与角色图层、三张完整晚安完成背景随项目发布。盖被前背景显示床单，完成后切换盖好被子的完整画面；雪地晚安初始已盖被，点灯后切换闭眼柔光状态。
- 复查并移除背景中重复操作对象；图集导出保留透明度，排除邻格碎片。列车沿车头方向靠站，泉眼点击后出水，飞船舱门开合及登船后返航；室外角色佩戴头盔。
- 新增52条本地MP3，助手2号定向生成并验证有效时长、非零文件和完整解码。40条提示与实际控件逐条一致，另有每主题开始、夸奖、完成各1条。

## 场景与素材清单

下表坐标为实际目标中心百分比；每关独立背景位于public/images/themes/<主题>/scenes/<ID>.webp，角色与道具位于对应sprites目录。

| ID | 交互 | 目标中心 | 操作图层 | 成功结果 |
|---|---|---|---|---|

| forest-basket-ready | 拖动 | 65%,64% | forest/sprites/basket | 篮子准备好啦！ |
| forest-squirrel-guide | 点击 | 60%,57% | forest/sprites/squirrel | 松鼠来带路啦！ |
| forest-leaf-path | 点击 | 52%,62% | forest/sprites/leaf | 小路通畅啦！ |
| forest-picnic-mat | 拖动 | 50%,64% | forest/sprites/mat-folded | 野餐垫铺好啦！ |
| forest-hedgehog-apple | 拖动 | 64%,63% | forest/sprites/apple | 小刺猬吃得好开心！ |
| forest-flower-open | 点击 | 52%,58% | forest/sprites/bud | 花儿开啦！ |
| forest-rabbit-cup | 拖动 | 80%,61% | forest/sprites/cup | 小兔有杯子啦！ |
| forest-bird-song | 点击 | 58%,45% | forest/sprites/bird | 小鸟唱歌啦！ |
| forest-basket-cleanup | 拖动 | 66%,62% | forest/sprites/lunchbox | 餐盒收好啦！ |
| forest-friends-goodbye | 点击 | 56%,57% | forest/sprites/squirrel | 森林朋友，再见啦！ |
| snow-train-arrival | 点击 | 32%,62% | sky/adventure/train | 小列车到站啦！ |
| snow-bear-mittens | 拖动 | 64%,53% | snow/sprites/mittens | 手套戴好啦！ |
| snow-penguin-greeting | 点击 | 52%,60% | snow/sprites/penguin | 你好，小企鹅！ |
| snow-snowman-nose | 拖动 | 55%,45% | snow/sprites/carrot | 雪人有鼻子啦！ |
| snow-pine-snow | 点击 | 60%,47% | snow/sprites/pine-snow | 轻轻的雪落下来啦！ |
| snow-penguin-scarf | 拖动 | 56%,60% | snow/sprites/scarf | 围巾围好啦！ |
| snow-lantern-glow | 点击 | 81%,43% | snow/sprites/lantern | 雪屋暖暖的！ |
| snow-snack-plate | 拖动 | 52%,47% | snow/sprites/plate | 点心摆好啦！ |
| snow-star-decoration | 拖动 | 65%,48% | snow/sprites/star | 星星挂好啦！ |
| snow-house-goodnight | 点击 | 18%,36% | snow/sprites/lantern | 雪地朋友，晚安！ |
| dino-valley-greeting | 点击 | 64%,58% | dino/sprites/dinosaur | 你好，小恐龙！ |
| dino-leaf-breakfast | 拖动 | 64%,75% | dino/sprites/leaf | 早餐真好吃！ |
| dino-backpack-ready | 拖动 | 61%,60% | dino/sprites/backpack | 小包背好啦！ |
| dino-fern-path | 点击 | 52%,59% | dino/sprites/fern | 小路露出来啦！ |
| dino-creek-bridge | 拖动 | 53%,45% | dino/sprites/board | 小桥接好啦！ |
| dino-baby-egg | 点击 | 52%,63% | dino/sprites/egg | 你好，恐龙宝宝！ |
| dino-baby-flower | 拖动 | 64%,62% | dino/sprites/flower | 宝宝喜欢小花！ |
| dino-waterfall-discovery | 点击 | 58%,48% | dino/sprites/spring-dry | 泉水流下来啦！ |
| dino-home-door | 点击 | 62%,49% | dino/sprites/door | 一起回家啦！ |
| dino-baby-blanket | 拖动 | 55%,62% | dino/sprites/blanket | 恐龙宝宝，晚安！ |
| space-ship-launch | 点击 | 52%,64% | space/sprites/launch-button | 小飞船出发啦！ |
| space-star-guide | 点击 | 56%,50% | space/sprites/star | 跟着星星出发吧！ |
| space-bear-helmet | 拖动 | 64%,43% | space/sprites/helmet | 头盔戴好啦！ |
| space-landing-pad | 拖动 | 52%,65% | space/sprites/pad-folded | 小飞船落好啦！ |
| space-moon-flower | 点击 | 52%,58% | space/sprites/bud | 月亮花开啦！ |
| space-star-mail | 拖动 | 65%,55% | space/sprites/envelope | 星星信送好啦！ |
| space-bridge-light | 点击 | 35%,59% | space/sprites/lamp | 星光小桥亮啦！ |
| space-picnic-cushion | 拖动 | 69%,63% | space/sprites/cushion | 坐垫摆好啦！ |
| space-ship-home | 点击 | 56%,57% | space/sprites/ship-open | 我们回家啦！ |
| space-friends-blanket | 拖动 | 53%,63% | sky/adventure/blanket | 旅行朋友，晚安！ |

## 绘图与资源规格

使用内置imagegen绘制与编辑，Python导出脚本仅负责图集裁切、软透明边缘保留、压缩和格式转换。环境采用竖版2:3水彩绘本，温暖光线、圆润形状、景深与细节，保留顶部提示区和单个操作区域；背景不含主角及操作物。森林、雪地、恐龙、星空的专属场景提示来自设计文档各关初始分镜。四套图集固定主角身份、材质与配色，并提供动作与完成姿态；补绘完整卧室完成态及开合舱门等图层。生成提示与原始文件来源见THIRD_PAGE_ASSET_MANIFEST.json。

所有运行时图片为本地WebP，每张源图片和dist图片上限300,000字节。正常游戏访问不依赖生成服务。

## 验收

已验证三种宽度的完整旅程共120次场景流程（320像素降低动态、390像素键盘、768像素真实指针拖动）：单目标、触控尺寸、目标边界、提示不遮挡、图片加载、成功后禁用、反馈时长、自动推进、四个完成页和返回第三页、刷新回第一页。静音时无录音播放请求。另已验证语音映射、家长开关、音频播放失败后推进与卸载计时清理。最终素材与构图修正后已重新执行全部120次流程并通过。

最终生产构建通过（93个模块），lint无错误并保留2条既有警告，git diff --check通过。源目录与构建目录各403张WebP，最大288,528字节；新四主题118张图片的源文件与构建文件逐张校验一致，独立精灵保留透明度。52条录音与构建副本一致。

发布边界：用户已授权提交、同步两个GitHub仓库并上线；线上版本以release.json为准。

## 专属配乐与压缩更新

四主题对应Woodland Friends Gathering、Cozy Winter Village、Friendly Dinosaur Valley、Visiting the Star Friends；第三页目录使用Starry Sky Spaceship Journey。前两页继续循环原两首目录曲。

全部发布MP3按500,000字节阈值检查，15首BGM完成压缩，超过120秒的文件均不超过1,000,000字节；保留完整时长与立体声，原始muic文件不改写。浏览器通过四主题与第三页目录匹配、切页、品牌返回、声音开关及前八主题回归检查。压缩记录见[AUDIO_COMPRESSION_REPORT.json](AUDIO_COMPRESSION_REPORT.json)。
