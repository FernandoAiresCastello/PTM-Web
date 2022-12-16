import { PTM } from "./PTM";

document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    const ptm = new PTM(displayElement, ptmlElement.textContent);
    (window as any).PTM = ptm;
    ptm.start();
});
