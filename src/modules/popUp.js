import { POP_UP } from "./variables.js";

export function showSettings() {
    POP_UP.SETTINGS_BLOCK.classList.add('show');
}

export function hideSettings() {
    POP_UP.SETTINGS_BLOCK.classList.remove('show');
}


