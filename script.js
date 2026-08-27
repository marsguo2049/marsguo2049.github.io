const labMarkup = `
  <div class="backdrop backdrop-local" data-backdrop="3">
    <div class="model-glow"></div>
    <svg class="scene-art local-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="rgba(138,226,218,.22)" stroke-width="2"><path d="M120 690C330 480 510 620 720 410s430-160 720-300"/><path d="M160 260C420 390 560 180 820 320s390 290 700 120"/><path d="M330 520 560 390 790 540 1020 350 1260 470"/></g>
      <g class="ai-nodes"><circle cx="330" cy="520" r="10"/><circle cx="560" cy="390" r="14"/><circle cx="790" cy="540" r="8"/><circle cx="1020" cy="350" r="16"/><circle cx="1260" cy="470" r="11"/></g>
      <g class="pipeline-labels"><text x="260" y="485">WORLD</text><text x="505" y="350">ABILITY</text><text x="950" y="305">COORDINATION</text><text x="1195" y="430">OR</text></g>
    </svg>
  </div>`

document.querySelector('.backdrop-stack')?.insertAdjacentHTML('beforeend', labMarkup)

document.querySelector('.slide-stage')?.insertAdjacentHTML('beforeend', `
  <article class="slide" data-slide="3" aria-hidden="true">
    <div class="slide-inner">
      <div class="hero-copy">
        <div class="scene-badge liquid-glass"><span class="pulse-dot violet"></span><span data-i18n data-en="One question · Six-step research map" data-zh="一个问题 · 六步研究地图">One question · Six-step research map</span></div>
        <p class="kicker local-kicker" data-i18n data-en="04 / AUTONOMOUS SYSTEMS LAB" data-zh="04 / 无人实验室">04 / AUTONOMOUS SYSTEMS LAB</p>
        <h1><span data-i18n data-en="What comes after autonomy?" data-zh="当智能体已经会行动，">What comes after autonomy?</span><br/><em data-i18n data-en="Coordination." data-zh="下一步是协同。">Coordination.</em></h1>
        <p class="lead" data-i18n
          data-en="Cars can drive, robots can manipulate and drones can fly. We study the next question: how should many autonomous agents work together, and how can OR make the whole system better?"
          data-zh="车已经会自己开，机器人已经会操作，无人机已经会飞。我们研究下一步：这些自主智能体怎样一起干活，以及怎样用 OR 把整个系统调度得更好。">Cars can drive, robots can manipulate and drones can fly. We study the next question: how should many autonomous agents work together, and how can OR make the whole system better?</p>
        <div class="actions"><a class="primary-action" href="autonomous-lab/" data-i18n data-en="See the six-step map →" data-zh="查看六步研究地图 →">See the six-step map →</a><a class="text-action" href="autonomous-lab/#experiments" data-i18n data-en="See current experiments" data-zh="查看当前实验">See current experiments</a></div>
      </div>
      <section class="content-window liquid-glass" aria-label="Autonomous systems overview">
        <div class="window-bar"><div><i></i><i></i><i></i></div><span>autonomous-lab / simple-map</span><b>04</b></div>
        <div class="window-body workflow-list compact-five">
          <article><span class="step">01–02</span><div><h2 data-i18n data-en="World + individual ability" data-zh="世界 + 单体能力">World + individual ability</h2><p data-i18n data-en="Build a virtual world, then make one agent able to drive, navigate or manipulate." data-zh="先搭实验世界，再让一个智能体会开车、导航或操作。">Build a virtual world, then make one agent able to drive, navigate or manipulate.</p></div><small class="status development" data-i18n data-en="Foundation" data-zh="基础">Foundation</small></article>
          <article><span class="step">03–04</span><div><h2 data-i18n data-en="Connect + coordinate" data-zh="连接 + 协同">Connect + coordinate</h2><p data-i18n data-en="Connect modules, then let many agents share tasks and resources." data-zh="把模块接起来，再让多个智能体分任务、共享资源。">Connect modules, then let many agents share tasks and resources.</p></div><small class="status development" data-i18n data-en="Multi-agent" data-zh="多智能体">Multi-agent</small></article>
          <article><span class="step">05</span><div><h2 data-i18n data-en="Heterogeneous agents" data-zh="异构智能体">Heterogeneous agents</h2><p data-i18n data-en="Vehicle + robot + drone + rail + boat: different capabilities, one mission." data-zh="车辆 + 机器人 + 无人机 + 铁路 + 船舶：能力不同，但共同完成一个任务。">Vehicle + robot + drone + rail + boat: different capabilities, one mission.</p></div><small class="status concept" data-i18n data-en="Our focus" data-zh="重点">Our focus</small></article>
          <article><span class="step">06</span><div><h2 data-i18n data-en="System OR" data-zh="系统级 OR">System OR</h2><p data-i18n data-en="Who? What? When? Which route, mode and resource? How to replan?" data-zh="谁来做？做什么？什么时候？走哪条路、用什么方式和资源？变化后怎么重规划？">Who? What? When? Which route, mode and resource? How to replan?</p></div><small class="status published">OR</small></article>
        </div>
      </section>
    </div>
  </article>`)

const mobileMenuInner = document.querySelector('.mobile-menu-inner')
if (mobileMenuInner) {
  const catalogButton = mobileMenuInner.querySelector('.catalog-trigger')
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.sceneTarget = '3'
  button.style.setProperty('--delay', '225ms')
  button.dataset.i18n = ''
  button.dataset.en = 'Autonomous Systems Lab'
  button.dataset.zh = '无人实验室'
  button.textContent = 'Autonomous Systems Lab'
  mobileMenuInner.insertBefore(button, catalogButton)
}

document.querySelector('.scene-switcher')?.insertAdjacentHTML('beforeend', `<button type="button" data-scene-target="3"><span>04</span><b data-i18n data-en="Autonomous Lab" data-zh="无人实验室">Autonomous Lab</b></button>`)

const catalogScroll = document.querySelector('.catalog-scroll')
if (catalogScroll) {
  catalogScroll.insertAdjacentHTML('beforeend', `
    <section class="catalog-group">
      <h3><span>04</span><b data-i18n data-en="Autonomous Systems Lab" data-zh="无人实验室">Autonomous Systems Lab</b></h3>
      <div class="catalog-grid systems">
        <a class="catalog-card" href="autonomous-lab/"><div><h4 data-i18n data-en="Six-step Research Map" data-zh="六步研究地图">Six-step Research Map</h4><p data-i18n data-en="World → individual ability → connection → multi-agent → heterogeneous agents → OR." data-zh="世界 → 单体能力 → 连接 → 多智能体 → 异构智能体 → OR。">World → individual ability → connection → multi-agent → heterogeneous agents → OR.</p></div><small class="status development" data-i18n data-en="Start here" data-zh="从这里开始">Start here</small></a>
        <a class="catalog-card" href="https://github.com/aitorzip/DeepGTAV" target="_blank" rel="noreferrer"><div><h4>GTA Multimodal Agent</h4><p data-i18n data-en="Pick A and B; choose walking, car, rail, boat or aircraft plus transfers and route." data-zh="任选 A 和 B；决定步行、汽车、铁路、船或飞行器，以及换乘和路径。">Pick A and B; choose walking, car, rail, boat or aircraft plus transfers and route.</p></div><small class="status concept" data-i18n data-en="Exploring" data-zh="探索中">Exploring</small></a>
        <a class="catalog-card" href="https://marsguo2049.github.io/kitchen/" target="_blank" rel="noreferrer"><div><h4 data-i18n data-en="Kitchen → Robotic Kitchen" data-zh="Kitchen → 机器人厨房">Kitchen → Robotic Kitchen</h4><p data-i18n data-en="Once robots can move and manipulate, use OR to decide who does what and when." data-zh="当机器人已经会走、会操作后，用 OR 决定谁做什么、什么时候做。">Once robots can move and manipulate, use OR to decide who does what and when.</p></div><small class="status development" data-i18n data-en="Building block" data-zh="基础实验">Building block</small></a>
        <a class="catalog-card" href="https://github.com/carla-simulator/carla" target="_blank" rel="noreferrer"><div><h4>CARLA Mobility</h4><p data-i18n data-en="Move mobility ideas into controlled, reproducible vehicle and fleet experiments." data-zh="把移动问题放进可控、可重复的车辆与车队实验。">Move mobility ideas into controlled, reproducible vehicle and fleet experiments.</p></div><small class="status development" data-i18n data-en="Scientific testbed" data-zh="科学实验场">Scientific testbed</small></a>
        <a class="catalog-card" href="https://github.com/open-rmf/rmf_demos" target="_blank" rel="noreferrer"><div><h4>Open-RMF</h4><p data-i18n data-en="Reference baseline for multi-robot task allocation, traffic negotiation and shared resources." data-zh="多机器人任务分配、交通协商和共享资源的参考基线。">Reference baseline for multi-robot task allocation, traffic negotiation and shared resources.</p></div><small class="status development" data-i18n data-en="Coordination reference" data-zh="协同参考">Coordination reference</small></a>
        <article class="catalog-card"><div><h4 data-i18n data-en="Heterogeneous Agent Coordination" data-zh="异构智能体协同">Heterogeneous Agent Coordination</h4><p data-i18n data-en="The long-term target: vehicles, robots, drones and infrastructure coordinated by system-level OR." data-zh="长期目标：让车辆、机器人、无人机与基础设施通过系统级 OR 协同。">The long-term target: vehicles, robots, drones and infrastructure coordinated by system-level OR.</p></div><small class="status concept" data-i18n data-en="North star" data-zh="长期方向">North star</small></article>
      </div>
    </section>`)
}

const app = document.querySelector('.app-shell')
const slides = [...document.querySelectorAll('[data-slide]')]
const backdrops = [...document.querySelectorAll('[data-backdrop]')]
const sceneButtons = [...document.querySelectorAll('[data-scene-target]')]
const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const catalog = document.querySelector('.project-catalog')
const catalogTriggers = [...document.querySelectorAll('.catalog-trigger')]
const catalogClose = document.querySelector('.catalog-close')
const langToggles = [...document.querySelectorAll('.lang-toggle')]
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const projectCount = document.querySelectorAll('.catalog-card').length
document.querySelectorAll('.catalog-trigger > i').forEach((counter) => { counter.textContent = String(projectCount) })

let activeScene = 0
let transitionLocked = false
let touchStartX = 0
let language = localStorage.getItem('portfolio-language') || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en')

function setLanguage(nextLanguage) {
  language = nextLanguage === 'zh' ? 'zh' : 'en'
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = language === 'zh' ? element.dataset.zh : element.dataset.en
    if (value !== undefined) element.textContent = value
  })
  langToggles.forEach((button) => {
    button.textContent = language === 'zh' ? 'EN' : '中文'
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文')
  })
  app.setAttribute('aria-label', language === 'zh' ? 'Mars Guo 工作主页' : 'Mars Guo work portfolio')
  catalog.setAttribute('aria-label', language === 'zh' ? '全部项目' : 'All projects')
  catalogClose.setAttribute('aria-label', language === 'zh' ? '关闭项目目录' : 'Close projects')
  document.title = language === 'zh' ? 'Mars Guo · 科研工具、本地 AI、无人实验室与 City2049' : 'Mars Guo · Research Tools, Local AI, Autonomous Systems & City2049'
  document.querySelector('meta[name="description"]').setAttribute('content', language === 'zh' ? 'Mars Guo 的工作主页：科研工具、本地 AI、无人系统、运筹优化与 City2049。' : "Mars Guo's work portfolio: research tools, local AI, autonomous systems, operations research, and City2049.")
  localStorage.setItem('portfolio-language', language)
}

function closeMenu() {
  document.body.classList.remove('menu-open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', language === 'zh' ? '打开菜单' : 'Open menu')
  mobileMenu.setAttribute('aria-hidden', 'true')
}

function openMenu() {
  document.body.classList.add('menu-open')
  menuToggle.setAttribute('aria-expanded', 'true')
  menuToggle.setAttribute('aria-label', language === 'zh' ? '关闭菜单' : 'Close menu')
  mobileMenu.setAttribute('aria-hidden', 'false')
}

function openCatalog() {
  closeMenu()
  document.body.classList.add('catalog-open')
  catalog.setAttribute('aria-hidden', 'false')
  catalogClose.focus()
}

function closeCatalog() {
  document.body.classList.remove('catalog-open')
  catalog.setAttribute('aria-hidden', 'true')
}

function setScene(nextScene) {
  const next = Number(nextScene)
  if (!Number.isInteger(next) || next < 0 || next >= slides.length || next === activeScene || transitionLocked) return
  transitionLocked = true
  activeScene = next
  app.dataset.active = String(next)
  slides.forEach((slide, index) => {
    const isActive = index === next
    slide.classList.toggle('is-active', isActive)
    slide.setAttribute('aria-hidden', String(!isActive))
  })
  backdrops.forEach((backdrop, index) => backdrop.classList.toggle('is-active', index === next))
  sceneButtons.forEach((button) => {
    const isActive = Number(button.dataset.sceneTarget) === next
    button.classList.toggle('is-active', isActive)
    if (button.closest('.scene-switcher')) button.setAttribute('aria-current', isActive ? 'page' : 'false')
  })
  closeMenu()
  window.setTimeout(() => { transitionLocked = false }, reduceMotion ? 10 : 1000)
}

sceneButtons.forEach((button) => button.addEventListener('click', (event) => {
  if (button.tagName === 'A' && button.getAttribute('href') !== '#') return
  event.preventDefault()
  setScene(button.dataset.sceneTarget)
}))
langToggles.forEach((button) => button.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en')))
catalogTriggers.forEach((button) => button.addEventListener('click', openCatalog))
catalogClose.addEventListener('click', closeCatalog)
catalog.querySelector('.catalog-backdrop').addEventListener('click', closeCatalog)
menuToggle.addEventListener('click', () => document.body.classList.contains('menu-open') ? closeMenu() : openMenu())
mobileMenu.addEventListener('click', (event) => { if (event.target === mobileMenu) closeMenu() })

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (document.body.classList.contains('catalog-open')) closeCatalog()
    else closeMenu()
  }
  if (document.body.classList.contains('catalog-open')) return
  if (event.key === 'ArrowRight') setScene((activeScene + 1) % slides.length)
  if (event.key === 'ArrowLeft') setScene((activeScene - 1 + slides.length) % slides.length)
  if (/^[1-4]$/.test(event.key)) setScene(Number(event.key) - 1)
})

app.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX }, { passive: true })
app.addEventListener('touchend', (event) => {
  if (document.body.classList.contains('menu-open') || document.body.classList.contains('catalog-open')) return
  const distance = event.changedTouches[0].screenX - touchStartX
  if (Math.abs(distance) < 55) return
  setScene(distance < 0 ? (activeScene + 1) % slides.length : (activeScene - 1 + slides.length) % slides.length)
}, { passive: true })

setLanguage(language)

const localAiGroup = [...document.querySelectorAll('.catalog-group')].find((group) => group.querySelector('h3 [data-en="Local AI Lab"]'))
const localAiGrid = localAiGroup?.querySelector('.catalog-grid')
if (localAiGrid) {
  localAiGrid.insertAdjacentHTML('beforeend', `
    <a class="catalog-card" href="https://github.com/marsguo2049/multi-model-workflow-optimization" target="_blank" rel="noreferrer">
      <div>
        <h4>Multi-Model Workflow Optimization</h4>
        <p data-i18n data-en="Treat AI models and configurations as alternative resources, measure quality, cost and latency, then optimize model, parameter and workflow choices across tasks." data-zh="把不同 AI 模型与参数配置视为可替代资源，记录质量、成本与时延，并进一步优化任务中的模型、参数和工作流选择。">Treat AI models and configurations as alternative resources, measure quality, cost and latency, then optimize model, parameter and workflow choices across tasks.</p>
      </div>
      <small class="status development" data-i18n data-en="Prototype · public research" data-zh="原型 · 公开研究">Prototype · public research</small>
    </a>`)
  setLanguage(language)
  const updatedProjectCount = document.querySelectorAll('.catalog-card').length
  document.querySelectorAll('.catalog-trigger > i').forEach((counter) => { counter.textContent = String(updatedProjectCount) })
}
