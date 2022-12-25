import { PTM_InitializationError } from "./Errors/PTM_InitializationError";
import { PTM } from "./PTM";

export function PTM_Main() {
    console.log("%c" +
        "==================================================\n" +
        "  Welcome to the PTM - Programmable Tile Machine! \n" +
        "  Developed by: Fernando Aires Castello  (C) 2022 \n" +
        "==================================================",
        "color:#0f0"
    );
    const ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (!ptmlElement || !ptmlElement.textContent) {
        throw new PTM_InitializationError("PTML script tag not found");
    }
    console.log("PTML code loaded from script tag");

    const displayElement = document.getElementById("display");
    if (!displayElement) {
        throw new PTM_InitializationError("Display element not found");
    }
    console.log("Display element found");

    (window as any).PTM = new PTM(displayElement, ptmlElement.textContent);
}
