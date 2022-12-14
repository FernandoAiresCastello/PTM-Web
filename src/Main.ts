import { System } from "./System";

document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    let sys = new System(displayElement, ptmlElement.textContent);
});
