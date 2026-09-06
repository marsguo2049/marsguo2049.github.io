# Mars Guo · 2049

`marsguo2049` 工作账号的全屏双语 GitHub Pages 主页。  
Fullscreen bilingual GitHub Pages portfolio for the `marsguo2049` work account.

## 主题 / Themes

- **Research Tools / 科研工具** — 围绕真实科研流程构建工具。
- **Local AI Lab / 本地 AI 实验室** — 从本地模型，到可复用工作流，再到多模型工作流优化。
- **City2049** — 为独立运筹优化实验提供共享的未来语境。
- **Autonomous Systems Lab / 无人实验室** — 从单体自主能力走向多智能体、异构协同与系统级 OR。

`Projects` 和 `Ideas` 不再作为同级主题。所有已发布项目、开发中项目与研究构想统一收录在顶部的 **All Projects / 全部项目** 目录中。

`Projects` and `Ideas` are no longer treated as peer themes. Published work, active development and research directions are classified in the **All Projects** catalogue.

## Research Tools / 科研工具

The tool map follows a research workflow:

`Discover → Translate → Write → Implement → Verify`

- **Literature Review Workspace / 文献综述工作台** — 输入学术主题，通过期刊 API 检索、收集证据并形成综述；开发中。
- **Academic Translation / 学术翻译** — 英文论文翻译为中文，并连接本地大模型工作流；开发中。
- **Patent Translation & Drafting / 专利翻译与撰写** — 将翻译扩展为符合中文专利体例的文本；概念扩展。
- **OR Writing / 运筹学写作** — 运筹学论文的结构、数学解释与语言支持；开发中。
- **Py2Cpp4OR** — 文档优先的 Python 至 C++ 运筹优化迁移与跨语言核验框架；当前为公开 Phase 0 文档基础，不是端到端自动翻译器。
- **Visual Verification for OR / 运筹优化可视化核验** — 将模型和算法输出转化为人类可检查的可视化；开发中。

## Local AI Lab / 本地 AI 实验室

- **[My LLM](https://github.com/marsguo2049/my-llm)** — 本地大模型部署、实验与实际使用记录。
- **[ComfyUI Py Workflow](https://github.com/marsguo2049/comfyui-py-workflow)** — 用 Python 调用并串联本地 ComfyUI 图像与视频工作流。
- **[Multi-Model Workflow Optimization](https://github.com/marsguo2049/multi-model-workflow-optimization)** — 研究质量、成本与资源权衡下的模型、参数与工作流选择。

## Language and interaction / 语言与交互

- Complete English/Chinese switch with saved preference / 完整中英文切换并记忆选择。
- Bottom switcher changes themes; All Projects opens the full catalogue / 底部切换主题，顶部项目目录展示全部项目。
- Mobile menu and horizontal swipe / 移动端菜单与左右滑动。
- Keyboard arrows or numbers `1`–`4` / 键盘方向键或数字 `1`–`4`。
- Reduced-motion preferences and a motion pause button are supported / 支持减少动态效果与手动暂停动效。
- Four shareable scene URLs: `#research`, `#local-ai`, `#city`, `#autonomy` / 四个主题可直接分享定位。
- All Projects includes bilingual search, keyboard focus containment and Escape to close / 全部项目支持跨中英文搜索、键盘焦点约束和 Esc 关闭。

## Account boundary / 账号边界

`marsguo2049` 用于研究、科研工具、本地 AI 与 City2049；生活观察、趣味交互和创意实验继续放在 [Moltpany](https://moltpany.github.io)。

## Local preview and publishing / 本地预览与发布

Open `index.html` directly. No build step or external JavaScript dependency is required. GitHub Pages publishes from the repository root on `main`.

## Animated window scenes / 动态窗景

Four themes share a panoramic window and a desk. The view and desktop objects change together: a blue mountain-lake research setting with books, a space window with a local AI terminal, a future city with an architectural model, and a robotics garden with a small experimental robot. The artwork uses animated-feature styling and is clearly illustrative.

四个主题共享窗框与书桌：科研窗口是蓝色山湖与书本；本地 AI 是太空舷窗与计算终端；City2049 是未来城市与建筑模型；无人实验室是机器人花园与小型实验模型。场景采用动画电影式视觉，均为主题插画。

The window view, atmospheric animation, frame and transparent desk foreground are separate layers. The exterior drifts gently while mist, water glints, stars or leaves animate independently. The frame and desk stay fixed after the theme transition. These are real-time web animations, not recordings of physical experiments. Motion pauses on request, in the background or with reduced-motion preferences; modal dialogs pause the atmospheric layer.

窗外、云雾/星光等动画、窗框与透明桌面前景分层。远景缓慢移动，雾气、水面闪光、星点或叶片独立变化；主题切换完成后窗框和桌面保持固定。动效为网页实时呈现，不是物理实验录像。支持手动暂停、后台暂停和减少动态效果；弹窗打开时暂停窗外气氛动画。

Each scene keeps three quiet project links at a time, with arrows for the rest: 6 research tools, 3 local AI projects, 7 city/interactive projects, and 6 robotics/guide/reference entries. The full catalogue retains all 26 original entries and statuses. Names, URLs and statuses come from the catalogue. The browser title remains **Mars Guo · 2049** in both languages.

每屏仍先显示三个轻量项目入口，箭头切换其余内容。名称、链接和状态取自原目录；完整目录保留原 26 项。标题统一为 **Mars Guo · 2049**。

Only the selected window scene and desk image are requested initially; the remaining scenes load when selected. The site uses responsive WebP images, preserves foreground transparency and requires no external font, JavaScript or video dependency for its backgrounds. The existing MuJoCo video remains click-to-play in a separate dialog, explicitly labelled as a scripted physical demonstration with OR integration pending. Closing it or changing scenes pauses playback.

首次只请求当前窗景与桌面图，其余主题按需加载。WebP 保留前景透明度，背景不依赖外部字体、脚本或视频下载。既有 MuJoCo 演示仍点击后弹窗播放，明确为脚本物理演示、OR 待接入；关闭或切换主题会暂停。

AOR-021 workspace source: `docs/showcase/portfolio/`; the current layered assets originate in `window-art/`. Publication serves only this repository. No research run, model, raw image, prompt archive or local preview recording is published.
