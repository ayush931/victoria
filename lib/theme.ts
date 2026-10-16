export const THEME_KEY = 'victorino-theme';
export const THEME_EVENT = 'victorino:theme-change';

// Runs in the document head before the page paints. Storage can be unavailable.
export const themeBootstrap = `(function(){var t;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}document.documentElement.dataset.theme=t==='dark'||t==='light'?t:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`;

export function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
}
