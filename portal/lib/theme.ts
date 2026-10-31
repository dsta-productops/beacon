export const THEME_KEY = "beacon-theme";
export const DARK_CLASS = "theme-enterprise-dark";

/**
 * Runs before first paint (from the root layout): applies the saved theme, or dark
 * when nothing is saved, so the page never flashes the wrong mode.
 */
export const RESTORE_THEME = `var d=true;try{d=localStorage.getItem(${JSON.stringify(THEME_KEY)})!=="light"}catch(e){}if(d){document.documentElement.classList.add(${JSON.stringify(DARK_CLASS)});document.documentElement.setAttribute("data-mode","dark")}`;
