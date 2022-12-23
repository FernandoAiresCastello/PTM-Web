import { DisplayBase } from "./DisplayBase";
import { Palette } from "./Palette";
import { Tile } from "./Tile";
import { TileBuffer } from "./TileBuffer";
import { TileBufferLayer } from "./TileBufferLayer";
import { Tileset } from "./Tileset";
import { Viewport } from "./Viewport";

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

    drawTileFrame(tile: Tile, x: number, y: number, transparent: boolean) {
        this.base.drawTileFrame(tile, x, y, transparent);
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
        for (let i = 0; i < buf.layerCount; i++) {
            const layer = buf.layers[i];
            this.drawBufferLayer(layer, buf.view);
        }
    }

    private drawBufferLayer(layer: TileBufferLayer, view: Viewport) {
        let x = view.displayX;
        let y = view.displayY;
        for (let i = 0; i < layer.size; i++) {
            const tile = layer.tiles[i];
            if (tile.isEmpty()) {
                continue;
            }
        }
    }
}
