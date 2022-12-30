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
    let ptml = "";
    const ptmlElement = document.querySelector('script[type="text/ptml"]') as HTMLScriptElement;
    if (ptmlElement) {
        if (ptmlElement.textContent) {
            ptml = ptmlElement.textContent;
            console.log("PTML code loaded from script tag (inline code)");
        } else if (ptmlElement.src) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", ptmlElement.src)
            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                ptml = xhr.responseText;
                console.log(`PTML code loaded from script tag (external file: ${ptmlElement.src})`);
              } else {
                throw new PTM_InitializationError(`Unable to load PTML code from file: ${ptmlElement.src}`);
              }
            };
            xhr.send();
        } else {
            throw new PTM_InitializationError("Unable to load PTML code from script tag");
        }
    } else {
        throw new PTM_InitializationError("PTML script tag not found");
    }

    const displayElement = document.getElementById("display");
    if (!displayElement) {
        throw new PTM_InitializationError("Display element not found");
    }
    console.log("Display element found");

    (window as any).PTM = new PTM(displayElement, ptml);
}
