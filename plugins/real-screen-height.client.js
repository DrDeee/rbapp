function setInnerHeight() {
  const root = document.documentElement
  root.style.setProperty('--inner-height', window.innerHeight + 'px')
  root.style.setProperty('--inner-width', window.innerWidth + 'px')
}
export default (_context, _inject) => {
  window.addEventListener('resize', setInnerHeight)
  window.addEventListener('load', setInnerHeight)
}
