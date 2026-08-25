const labMarkup = `
  <div class="backdrop backdrop-local" data-backdrop="3">
    <div class="model-glow"></div>
    <svg class="scene-art local-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="rgba(138,226,218,.22)" stroke-width="2"><path d="M120 690C330 480 510 620 720 410s430-160 720-300"/><path d="M160 260C420 390 560 180 820 320s390 290 700 120"/><path d="M330 520 560 390 790 540 1020 350 1260 470"/></g>
      <g class="ai-nodes"><circle cx="330" cy="520" r="10"/><circle cx="560" cy="390" r="14"/><circle cx="790" cy="540" r="8"/><circle cx="1020" cy="350" r="16"/><circle cx="1260" cy="470" r="11"/></g>
      <g class="pipeline-labels"><text x="280" y="485">SIM</text><text x="510" y="350">AUTONOMY</text><text x="955" y="305">OR</text><text x="1195" y="430">FLEET</text></g>
    </svg>
  </div>`

document.querySelector('.backdrop-stack')?.insertAdjacentHTML('beforeend', labMarkup)

document.querySelector('.slide-stage')?.insertAdjacentHTML('beforeend', `
  <article class="slide" data-slide="3" aria-hidden="true">
    <div class="slide-inner">
      <div class="hero-copy">
        <div class="scene-badge liquid-glass"><span class="pulse-dot violet"></span><span data-i18n data-en="Simulation · Autonomy · Coordination · OR" data-zh="仿真 · 自主智能 · 协同 · 运筹优化">Simulation · Autonomy · Coordination · OR</span></div>
        <p class="kicker local-kicker" data-i18n data-en="04 / AUTONOMOUS SYSTEMS LAB" data-zh="04 / 无人实验室">04 / AUTONOMOUS SYSTEMS LAB</p>
        <h1><span data-i18n data-en="What comes after autonomy?" data-zh="当智能体已经会行动，">What comes after autonomy?</span><br/><em data-i18n data-en="Coordination." data-zh="下一步是协同。">Coordination.</em></h1>
        <p class="lead" data-i18n data-en="A hard-core simulation topic for connecting autonomous vehicles, robots, drones and other agents with operations research. The lab separates world simulation, embodied skills and system-level coordination so each layer can be tested and replaced." data-zh="一个面向硬核仿真的研究主题：把自动驾驶、机器人、无人机等自主智能体与运筹优化连接起来。实验室把世界仿真、具身能力和系统级协同分层，让每一层都可以独立验证与替换。">A hard-core simulation topic for connecting autonomous vehicles, robots, drones and other agents with operations research. The lab separates world simulation, embodied skills and system-level coordination so each layer can be tested and replaced.</p>
        <div class="actions"><a class="primary-action" href="autonomous-lab/" data-i18n data-en="Open the research map →" data-zh="打开研究地图 →">Open the research map →</a><a class="text-action" href="https://github.com/dexmal/opendm" target="_blank" rel="noreferrer" data-i18n data-en="Reference: OpenDM ↗" data-zh="参考：OpenDM ↗">Reference: OpenDM ↗</a></div>
      </div>
      <section class="content-window liquid-glass" aria-label="Autonomous systems research stack">
        <div class="window-bar"><div><i></i><i></i><i></i></div><span>autonomous-lab / research-stack</span><b>04</b></div>
        <div class="window-body workflow-list compact-five">
          <article><span class="step" data-i18n data-en="SIMULATE" data-zh="仿真">SIMULATE</span><div><h2 data-i18n data-en="Worlds" data-zh="世界层">Worlds</h2><p>GTA V · CARLA · SUMO · Isaac Lab · RoboTwin · MetaDrive</p></div><small class="status development" data-i18n data-en="Platforms" data-zh="平台">Platforms</small></article>
          <article><span class="step" data-i18n data-en="ACT" data-zh="行动">ACT</span><div><h2 data-i18n data-en="Autonomy" data-zh="自主能力">Autonomy</h2><p>OpenDM · LeRobot · OpenVLA · GR00T · ROS2 · Nav2 · MoveIt2</p></div><small class="status development" data-i18n data-en="Policies" data-zh="策略">Policies</small></article>
          <article><span class="step" data-i18n data-en="COORDINATE" data-zh="协同">COORDINATE</span><div><h2 data-i18n data-en="Multi-agent systems" data-zh="多智能体系统">Multi-agent systems</h2><p>Open-RMF · fleet management · MAPF · shared resources</p></div><small class="status development" data-i18n data-en="Coordination" data-zh="协同">Coordination</small></article>
          <article><span class="step" data-i18n data-en="OPTIMISE" data-zh="优化">OPTIMISE</span><div><h2 data-i18n data-en="System OR" data-zh="系统运筹">System OR</h2><p data-i18n data-en="Routing · scheduling · assignment · location · replanning" data-zh="路径 · 调度 · 分配 · 选址 · 动态重规划">Routing · scheduling · assignment · location · replanning</p></div><small class="status published">OR</small></article>
          <article><span class="step" data-i18n data-en="EXPERIMENT" data-zh="实验">EXPERIMENT</span><div><h2 data-i18n data-en="Heterogeneous agents" data-zh="异构智能体">Heterogeneous agents</h2><p data-i18n data-en="Vehicle + robot + drone + rail + boat + infrastructure" data-zh="车辆 + 机器人 + 无人机 + 铁路 + 船舶 + 基础设施">Vehicle + robot + drone + rail + boat + infrastructure</p></div><small class="status concept" data-i18n data-en="North star" data-zh="长期方向">North star</small></article>
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
        <a class="catalog-card" href="autonomous-lab/"><div><h4 data-i18n data-en="Autonomous Systems Research Map" data-zh="无人系统研究地图">Autonomous Systems Research Map</h4><p data-i18n data-en="The shared map connecting simulators, autonomy stacks, coordination and OR experiments." data-zh="连接仿真平台、自主智能、协同系统与 OR 实验的总研究地图。">The shared map connecting simulators, autonomy stacks, coordination and OR experiments.</p></div><small class="status development" data-i18n data-en="New topic" data-zh="新主题">New topic</small></a>
        <a class="catalog-card" href="https://github.com/aitorzip/DeepGTAV" target="_blank" rel="noreferrer"><div><h4>GTA Multimodal Agent</h4><p data-i18n data-en="Open-world prototype: choose modes, transfers and routes, then let one agent execute the trip." data-zh="开放世界原型：选择交通方式、换乘与路径，再由一个智能体实际执行行程。">Open-world prototype: choose modes, transfers and routes, then let one agent execute the trip.</p></div><small class="status concept" data-i18n data-en="Exploring" data-zh="探索中">Exploring</small></a>
        <a class="catalog-card" href="https://github.com/carla-simulator/carla" target="_blank" rel="noreferrer"><div><h4>CARLA Mobility</h4><p data-i18n data-en="Reproducible vehicle and traffic experiments for autonomous mobility." data-zh="用于自动驾驶与交通系统的可重复车辆实验。">Reproducible vehicle and traffic experiments for autonomous mobility.</p></div><small class="status development" data-i18n data-en="Reference" data-zh="参考项目">Reference</small></a>
        <a class="catalog-card" href="https://github.com/RoboTwin-Platform/RoboTwin" target="_blank" rel="noreferrer"><div><h4>RoboTwin + OpenDM</h4><p data-i18n data-en="Embodied manipulation benchmark before inserting an OR task planner." data-zh="先验证具身操作，再插入 OR 任务规划器。">Embodied manipulation benchmark before inserting an OR task planner.</p></div><small class="status development" data-i18n data-en="Reference" data-zh="参考项目">Reference</small></a>
        <a class="catalog-card" href="https://github.com/open-rmf/rmf_demos" target="_blank" rel="noreferrer"><div><h4>Open-RMF Fleet</h4><p data-i18n data-en="Baseline for multi-fleet task allocation, traffic negotiation and shared resources." data-zh="多车队任务分配、交通协商与共享资源的基准体系。">Baseline for multi-fleet task allocation, traffic negotiation and shared resources.</p></div><small class="status development" data-i18n data-en="Reference" data-zh="参考项目">Reference</small></a>
        <article class="catalog-card"><div><h4 data-i18n data-en="Heterogeneous Agent Coordination" data-zh="异构智能体协同">Heterogeneous Agent Coordination</h4><p data-i18n data-en="Vehicle + robot + drone + rail + boat: capability-aware allocation, routing, handoff and replanning." data-zh="车辆 + 机器人 + 无人机 + 铁路 + 船舶：能力感知的分配、路径、交接与动态重规划。">Vehicle + robot + drone + rail + boat: capability-aware allocation, routing, handoff and replanning.</p></div><small class="status concept" data-i18n data-en="North star" data-zh="长期方向">North star</small></article>
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