export function isThemeDark() {
  const result = document.documentElement.hasAttribute('data-theme'); 
  if (!result) return true

  return document.documentElement.getAttribute('data-theme') === 'dark'
}