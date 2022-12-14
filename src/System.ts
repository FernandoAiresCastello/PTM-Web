import { Display } from "./Display";
import { Machine } from "./Machine";

export class System {

    private srcPtml: string;
    private ptm: Machine;
    private display: Display;

    constructor(displayElement: HTMLElement,  srcPtml: string) {
        this.srcPtml = srcPtml;
        this.ptm = new Machine();
        this.display = new Display(displayElement, 256, 192, 3, 3);
    }
}
