import { DisplayBase } from "./DisplayBase";
import { Palette } from "./Palette";
import { TileBuffer } from "./TileBuffer";
import { Tileset } from "./Tileset";

export class Display {

    private readonly base: DisplayBase;
    private buffers: TileBuffer[];

    constructor(displayElement: HTMLElement, 
        width: number, height: number, hStretch: number, vStretch: number, palette: Palette, tileset: Tileset) {

        this.base = new DisplayBase(displayElement, width, height, hStretch, vStretch, palette, tileset);
        this.buffers = [];
        this.createDefaultBuffer();
    }

    private createDefaultBuffer() {
        this.createNewBuffer("default", 1, this.base.cols, this.base.rows, 0, 0);
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
        this.base.reset();
        this.deleteAllBuffers();
        this.createDefaultBuffer();
    }

    setBackColorIx(ix: number) {
        this.base.backColorIx = ix;
    }

    clearAllBuffers() {
        for (let i = 0; i < this.buffers.length; i++) {
            this.buffers[i].clearAllLayers();
        }
    }
    
    update() {
        this.base.clearToBackColor();
        this.drawVisibleBuffers();
        this.base.update();
    }

    private drawVisibleBuffers() {
        for (let i = 0; i < this.buffers.length; i++) {
            const buf = this.buffers[i];
            if (buf.visible) {
                this.drawBuffer(buf);
            }
        }
    }

    private drawBuffer(buf: TileBuffer) {

    }
}
