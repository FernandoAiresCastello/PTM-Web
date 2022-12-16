"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PTM_1 = require("./PTM");
document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    window.PTM = new PTM_1.PTM(displayElement, ptmlElement.textContent);
});
