export default function isLightTheme(): boolean {
  const saved = localStorage.getItem('theme')
  if (saved) return saved === 'light'
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr) return attr === 'light'
  return window.matchMedia('(prefers-color-scheme: light)').matches
}
