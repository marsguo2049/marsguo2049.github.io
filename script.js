const app = document.querySelector('.app-shell')
const slides = [...document.querySelectorAll('[data-slide]')]
const backdrops = [...document.querySelectorAll('[data-backdrop]')]
const sceneButtons = [...document.querySelectorAll('[data-scene-target]')]
const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let activeScene = 0
let transitionLocked = false
let touchStartX = 0

function closeMenu() {
  document.body.classList.remove('menu-open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Open menu')
  mobileMenu.setAttribute('aria-hidden', 'true')
}

function openMenu() {
  document.body.classList.add('menu-open')
  menuToggle.setAttribute('aria-expanded', 'true')
  menuToggle.setAttribute('aria-label', 'Close menu')
  mobileMenu.setAttribute('aria-hidden', 'false')
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
    if (button.matches('.nav-scene, .scene-switcher button')) button.setAttribute('aria-current', isActive ? 'page' : 'false')
  })

  closeMenu()
  window.setTimeout(() => { transitionLocked = false }, reduceMotion ? 10 : 1000)
}

sceneButtons.forEach((button) => button.addEventListener('click', (event) => {
  if (button.tagName === 'A' && button.getAttribute('href') !== '#') return
  event.preventDefault()
  setScene(button.dataset.sceneTarget)
}))

menuToggle.addEventListener('click', () => {
  document.body.classList.contains('menu-open') ? closeMenu() : openMenu()
})

mobileMenu.addEventListener('click', (event) => {
  if (event.target === mobileMenu) closeMenu()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu()
  if (event.key === 'ArrowRight') setScene((activeScene + 1) % slides.length)
  if (event.key === 'ArrowLeft') setScene((activeScene - 1 + slides.length) % slides.length)
  if (/^[1-4]$/.test(event.key)) setScene(Number(event.key) - 1)
})

app.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX }, { passive: true })
app.addEventListener('touchend', (event) => {
  if (document.body.classList.contains('menu-open')) return
  const distance = event.changedTouches[0].screenX - touchStartX
  if (Math.abs(distance) < 55) return
  setScene(distance < 0 ? (activeScene + 1) % slides.length : (activeScene - 1 + slides.length) % slides.length)
}, { passive: true })
