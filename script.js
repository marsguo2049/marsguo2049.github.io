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
  document.title = language === 'zh' ? 'Mars Guo · 科研工具、本地 AI 与 City2049' : 'Mars Guo · Research Tools, Local AI & City2049'
  document.querySelector('meta[name="description"]').setAttribute('content', language === 'zh' ? 'Mars Guo 的工作主页：科研工具、本地 AI、运筹优化与 City2049。' : "Mars Guo's work portfolio: research tools, local AI, operations research, and City2049.")
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
  if (/^[1-3]$/.test(event.key)) setScene(Number(event.key) - 1)
})

app.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX }, { passive: true })
app.addEventListener('touchend', (event) => {
  if (document.body.classList.contains('menu-open') || document.body.classList.contains('catalog-open')) return
  const distance = event.changedTouches[0].screenX - touchStartX
  if (Math.abs(distance) < 55) return
  setScene(distance < 0 ? (activeScene + 1) % slides.length : (activeScene - 1 + slides.length) % slides.length)
}, { passive: true })

setLanguage(language)
