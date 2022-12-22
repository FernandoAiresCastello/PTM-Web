import { Display } from "./Display";
import { TileBuffer } from "./TileBuffer";

export class DisplayManager {

    display: Display;
    buffers: TileBuffer[];

    constructor(display: Display) {
        this.display = display;
        this.buffers = [];
        this.createDefaultBuffer();
    }

    createDefaultBuffer() {
        this.createNewBuffer("default", 1, this.display.cols, this.display.rows, 0, 0);
    }

    createNewBuffer(id: string, layers: number, w: number, h: number, dispX: number, dispY: number): TileBuffer {
        const buf = new TileBuffer(id, layers, w, h);
        buf.view.displayX = dispX;
        buf.view.displayY = dispY;
        this.buffers.push(buf);
        return buf;
    }

    deleteAllBuffers() {
        this.buffers = [];
    }

    reset() {
        this.deleteAllBuffers();
        this.createDefaultBuffer();
    }
}
