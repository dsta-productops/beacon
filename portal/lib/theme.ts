export const THEME_KEY = "beacon-theme";
export const DARK_CLASS = "theme-enterprise-dark";

/**
 * Runs before first paint (from the root layout): applies the saved theme, or the
 * system preference when nothing is saved, so the page never flashes the wrong mode.
 */
export const RESTORE_THEME = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add(${JSON.stringify(DARK_CLASS)});document.documentElement.setAttribute("data-mode","dark")}}catch(e){}`;
