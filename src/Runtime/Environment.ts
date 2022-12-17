import { Display } from "../Graphics/Display";

export class Environment {
    
    displayElement: HTMLElement;
    display: Display | null;

    constructor(displayElement: HTMLElement) {
        this.displayElement = displayElement;
        this.display = null;
    }
}
