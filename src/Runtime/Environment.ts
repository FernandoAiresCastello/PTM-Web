import { Display } from "../Graphics/Display";

export class Environment {
    
    displayElement: HTMLElement;
    display: Display | null;
    haltRequested: boolean;

    constructor(displayElement: HTMLElement) {
        this.displayElement = displayElement;
        this.display = null;
        this.haltRequested = false;
    }
}
