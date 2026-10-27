export const STORAGE_KEY = "beacon-walkthrough-project";

/** Runs before first paint (from the root layout) and sets `data-project` on `<html>`. */
export const RESTORE_PROJECT = `try{var p=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(p==="own"||p==="demo")document.documentElement.setAttribute("data-project",p)}catch(e){}`;
