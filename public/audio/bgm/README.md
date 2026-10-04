# 背景音乐

用户提供的原始音乐来自本机 `T:\codeX\game01\muic`，运行时使用本目录的15首本地 MP3。保留原始文件，压缩网站发布副本。

| 旅程 | 曲目 | 发布文件 |
|---|---|---|
| 小汽车帮帮号 | Happy Helper Car | happy-helper-car.mp3 |
| 小动物朋友 | Little Animal Friends | little-animal-friends.mp3 |
| 快乐农场 | Country Farm Day | country-farm-day.mp3 |
| 奇妙花园 | Magical Garden Dreams | magical-garden-dreams.mp3 |
| 海洋奇遇 | Whale's Pearl Journey | whales-pearl-journey.mp3 |
| 天空旅行 | Floating with Friends | floating-with-friends.mp3 |
| 生活小帮手 | Warm Little Moments | warm-little-moments.mp3 |
| 音乐派对 | Rhythm & Melodies | rhythm-and-melodies.mp3 |
| 森林野餐 | Woodland Friends Gathering | woodland-friends-gathering.mp3 |
| 雪地朋友 | Cozy Winter Village | cozy-winter-village.mp3 |
| 恐龙山谷 | Friendly Dinosaur Valley | friendly-dinosaur-valley.mp3 |
| 星空探访 | Visiting the Star Friends | visiting-the-star-friends.mp3 |
| 目录 | Wonderland Adventure Menu | wonderland-adventure-menu.mp3 |
| 目录 | Fairytale World Homepage Theme | fairytale-world-homepage-theme.mp3 |
| 第三页目录 | Starry Sky Spaceship Journey | starry-sky-spaceship-journey.mp3 |

第一页和第二页目录依次循环两首原目录曲。第三页目录单曲循环《Starry Sky Spaceship Journey》；十二个主题各自单曲循环对应曲目，场景推进不重启配乐。

播放器由 `src/game/audio/useBackgroundMusic.ts` 管理：首次用户操作后解锁，单个音频元素避免重叠；语音播放时降低音乐音量，音乐派对乐器演奏时暂停配乐，演奏结束恢复。家长背景音乐开关独立保存，页面隐藏时暂停；加载或播放失败不阻塞游戏，组件卸载清理播放器和事件。

## 压缩规则

检查全部发布MP3；超过500,000字节时压缩。时长超过120秒的文件不超过1,000,000字节，其他被压缩文件不超过500,000字节。`scripts/compress-mp3.py` 根据时长选取不超过64 kbps的合适码率，保留立体声，采样率24 kHz，剥离元数据和封面；不裁剪时长。每个压缩产物验证完整解码与时长偏差小于0.25秒后才替换发布副本。

本次15首BGM由42,208,319字节降至13,130,940字节，逐曲记录见 `docs/AUDIO_COMPRESSION_REPORT.json`。短语音与乐器音频低于阈值时保留原样。音频URL增加资源版本，避免缓存继续播放旧大文件。图片的300,000字节限制不适用于音频。
