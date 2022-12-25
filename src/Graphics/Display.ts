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
    private animationFrameIndex: number = 0;

    constructor(displayElement: HTMLElement, 
        width: number, height: number, 
        hStretch: number, vStretch: number, 
        defaultBufLayers: number, 
        palette: Palette, tileset: Tileset,
        animationInterval: number) {

        this.base = new DisplayBase(displayElement, width, height, hStretch, vStretch, palette, tileset);
        this.buffers = [];
        this.createDefaultBuffer(defaultBufLayers);

        window.setInterval(this.advanceTileAnimation, animationInterval, this);
    }

    private createDefaultBuffer(defaultBufLayers: number) {
        this.createNewBuffer("default", defaultBufLayers, this.base.cols, this.base.rows, 0, 0);
    }

    getDefaultBuffer(): TileBuffer {
        return this.getBuffer("default")!;
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
        const defaultBufLayers = this.getDefaultBuffer().layerCount;
        this.base.reset();
        this.deleteAllBuffers();
        this.createDefaultBuffer(defaultBufLayers);
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

    getBuffer(id: string): TileBuffer | null {
        for (let i = 0; i < this.buffers.length; i++) {
            const buf = this.buffers[i];
            if (buf.id === id) {
                return buf;
            }
        }
        return null;
    }

    advanceTileAnimation(display: Display) {
        if (!display) {
            display = this;
        }
        display.animationFrameIndex++;
        if (display.animationFrameIndex >= Number.MAX_SAFE_INTEGER) {
            display.animationFrameIndex = 0;
        }
        display.update();
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
        const w = view.width;
        const h = view.height;
        let dispX = view.displayX;
        let dispY = view.displayY;
        let bufX = view.scrollX;
        let bufY = view.scrollY;
        for (let tileY = bufY; tileY < bufY + h; tileY++) {
            for (let tileX = bufX; tileX < bufX + w; tileX++) {
                if (tileX >= 0 && tileY >= 0 && tileX < layer.width && tileY < layer.height && 
                    dispX >= 0 && dispY >= 0 && dispX < this.base.cols && dispY < this.base.rows) {
                    const tileSeq = layer.getTileRef(tileX, tileY);
                    if (!tileSeq.isEmpty()) {
                        const tile = tileSeq.frames[this.animationFrameIndex % tileSeq.frames.length];
                        this.drawTileFrame(tile, dispX, dispY, tileSeq.transparent);
                    }
                }
                dispX++;
            }
            dispX = view.displayX;
            dispY++;
        }
    }
}
