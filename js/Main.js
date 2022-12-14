"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("./System");
document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    let sys = new System_1.System(displayElement, ptmlElement.textContent);
});
