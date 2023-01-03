(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM_InitializationError = void 0;
class PTM_InitializationError extends Error {
    constructor(msg) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = msg;
    }
}
exports.PTM_InitializationError = PTM_InitializationError;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM_ParseError = void 0;
class PTM_ParseError extends Error {
    constructor(msg, programLine) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = `${msg}\n\tLine: ${programLine.lineNr}\n\tSource: ${programLine.src.trim()}`;
    }
}
exports.PTM_ParseError = PTM_ParseError;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM_RuntimeError = void 0;
class PTM_RuntimeError extends Error {
    constructor(msg, programLine) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = `${msg}\n\tLine: ${programLine.lineNr}\n\tSource: ${programLine.src.trim()}`;
    }
}
exports.PTM_RuntimeError = PTM_RuntimeError;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasPoint = void 0;
class CanvasPoint {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
}
exports.CanvasPoint = CanvasPoint;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = void 0;
class Cursor {
    constructor(buffer) {
        this.buffer = buffer;
        this.layer = 0;
        this.x = 0;
        this.y = 0;
    }
    set(buffer, layer, x, y) {
        this.buffer = buffer;
        this.layer = layer;
        this.x = x;
        this.y = y;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    reset(buffer) {
        this.buffer = buffer;
        this.layer = 0;
        this.x = 0;
        this.y = 0;
    }
}
exports.Cursor = Cursor;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPalette = void 0;
class DefaultPalette {
    static init(pal) {
        pal.init(256, "#000000");
        pal.set(0, "#000000");
        pal.set(1, "#ffffff");
    }
}
exports.DefaultPalette = DefaultPalette;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTileset = void 0;
class DefaultTileset {
    static init(chr) {
        chr.initBlank(256);
        chr.set(0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
        chr.set(0x21, 0x30, 0x30, 0x30, 0x30, 0x30, 0x00, 0x30, 0x00);
        chr.set(0x22, 0x6c, 0x6c, 0x48, 0x00, 0x00, 0x00, 0x00, 0x00);
        chr.set(0x23, 0x00, 0x00, 0x28, 0x7c, 0x28, 0x7c, 0x28, 0x00);
        chr.set(0x24, 0x10, 0xfe, 0xd0, 0xfe, 0x16, 0xd6, 0xfe, 0x10);
        chr.set(0x25, 0x00, 0xc6, 0xcc, 0x18, 0x30, 0x66, 0xc6, 0x00);
        chr.set(0x26, 0x10, 0x7c, 0xe0, 0x7c, 0xe0, 0x7c, 0x10, 0x00);
        chr.set(0x27, 0x70, 0x30, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00);
        chr.set(0x28, 0x0c, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x0c);
        chr.set(0x29, 0x30, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x30);
        chr.set(0x2a, 0x00, 0x6c, 0x38, 0xfe, 0x38, 0x6c, 0x00, 0x00);
        chr.set(0x2b, 0x00, 0x18, 0x18, 0x7e, 0x18, 0x18, 0x00, 0x00);
        chr.set(0x2c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x70, 0x30, 0x60);
        chr.set(0x2d, 0x00, 0x00, 0x00, 0x7e, 0x00, 0x00, 0x00, 0x00);
        chr.set(0x2e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x30, 0x00);
        chr.set(0x2f, 0x00, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x00);
        chr.set(0x30, 0x00, 0xfe, 0xc6, 0xd6, 0xd6, 0xc6, 0xfe, 0x00);
        chr.set(0x31, 0x00, 0x38, 0x18, 0x18, 0x18, 0x18, 0x7e, 0x00);
        chr.set(0x32, 0x00, 0x7e, 0x66, 0x06, 0x7e, 0x60, 0x7e, 0x00);
        chr.set(0x33, 0x00, 0x7e, 0x06, 0x3c, 0x06, 0x06, 0x7e, 0x00);
        chr.set(0x34, 0x00, 0x66, 0x66, 0x66, 0x7e, 0x06, 0x06, 0x00);
        chr.set(0x35, 0x00, 0x7e, 0x60, 0x7e, 0x06, 0x66, 0x7e, 0x00);
        chr.set(0x36, 0x00, 0x7e, 0x60, 0x7e, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x37, 0x00, 0x7e, 0x06, 0x0c, 0x18, 0x30, 0x30, 0x00);
        chr.set(0x38, 0x00, 0x7e, 0x66, 0x3c, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x39, 0x00, 0x7e, 0x66, 0x66, 0x7e, 0x06, 0x7e, 0x00);
        chr.set(0x3a, 0x00, 0x00, 0x18, 0x18, 0x00, 0x18, 0x18, 0x00);
        chr.set(0x3b, 0x00, 0x00, 0x30, 0x30, 0x00, 0x70, 0x30, 0x60);
        chr.set(0x3c, 0x0c, 0x18, 0x30, 0x60, 0x30, 0x18, 0x0c, 0x00);
        chr.set(0x3d, 0x00, 0x00, 0x7e, 0x00, 0x7e, 0x00, 0x00, 0x00);
        chr.set(0x3e, 0x60, 0x30, 0x18, 0x0c, 0x18, 0x30, 0x60, 0x00);
        chr.set(0x3f, 0x7e, 0x66, 0x06, 0x1e, 0x18, 0x00, 0x18, 0x00);
        chr.set(0x40, 0xfe, 0x82, 0xba, 0xaa, 0xbe, 0x80, 0xfe, 0x00);
        chr.set(0x41, 0x7e, 0x66, 0x66, 0x66, 0x7e, 0x66, 0x66, 0x00);
        chr.set(0x42, 0x7e, 0x66, 0x66, 0x7c, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x43, 0x7e, 0x66, 0x60, 0x60, 0x60, 0x66, 0x7e, 0x00);
        chr.set(0x44, 0x7c, 0x66, 0x66, 0x66, 0x66, 0x66, 0x7c, 0x00);
        chr.set(0x45, 0x7e, 0x60, 0x60, 0x7c, 0x60, 0x60, 0x7e, 0x00);
        chr.set(0x46, 0x7e, 0x60, 0x60, 0x7c, 0x60, 0x60, 0x60, 0x00);
        chr.set(0x47, 0x7e, 0x66, 0x60, 0x6e, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x48, 0x66, 0x66, 0x66, 0x7e, 0x66, 0x66, 0x66, 0x00);
        chr.set(0x49, 0x7e, 0x18, 0x18, 0x18, 0x18, 0x18, 0x7e, 0x00);
        chr.set(0x4a, 0x06, 0x06, 0x06, 0x06, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x4b, 0x66, 0x66, 0x6c, 0x78, 0x66, 0x66, 0x66, 0x00);
        chr.set(0x4c, 0x60, 0x60, 0x60, 0x60, 0x60, 0x60, 0x7e, 0x00);
        chr.set(0x4d, 0x82, 0xc6, 0xee, 0xfe, 0xd6, 0xd6, 0xc6, 0x00);
        chr.set(0x4e, 0x46, 0x66, 0x76, 0x7e, 0x6e, 0x66, 0x62, 0x00);
        chr.set(0x4f, 0x7e, 0x66, 0x66, 0x66, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x50, 0x7e, 0x66, 0x66, 0x66, 0x7e, 0x60, 0x60, 0x00);
        chr.set(0x51, 0x7e, 0x66, 0x66, 0x66, 0x66, 0x6e, 0x7e, 0x03);
        chr.set(0x52, 0x7e, 0x66, 0x66, 0x66, 0x7c, 0x66, 0x66, 0x00);
        chr.set(0x53, 0x7e, 0x66, 0x60, 0x7e, 0x06, 0x66, 0x7e, 0x00);
        chr.set(0x54, 0x7e, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x00);
        chr.set(0x55, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x56, 0x66, 0x66, 0x66, 0x24, 0x3c, 0x18, 0x18, 0x00);
        chr.set(0x57, 0xc6, 0xc6, 0xd6, 0xd6, 0xfe, 0x6c, 0x6c, 0x00);
        chr.set(0x58, 0x66, 0x66, 0x3c, 0x18, 0x3c, 0x66, 0x66, 0x00);
        chr.set(0x59, 0x66, 0x66, 0x66, 0x66, 0x7e, 0x18, 0x18, 0x00);
        chr.set(0x5a, 0x7e, 0x06, 0x0c, 0x18, 0x30, 0x60, 0x7e, 0x00);
        chr.set(0x5b, 0x1e, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x1e);
        chr.set(0x5c, 0x00, 0xc0, 0x60, 0x30, 0x18, 0x0c, 0x06, 0x00);
        chr.set(0x5d, 0x78, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x78);
        chr.set(0x5e, 0x10, 0x38, 0x6c, 0xc6, 0x00, 0x00, 0x00, 0x00);
        chr.set(0x5f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7e, 0x00);
        chr.set(0x60, 0x38, 0x44, 0xba, 0xa2, 0xba, 0x44, 0x38, 0x00);
        chr.set(0x61, 0x00, 0x00, 0x7c, 0x0c, 0x7c, 0x6c, 0x7e, 0x00);
        chr.set(0x62, 0x70, 0x30, 0x3e, 0x36, 0x36, 0x36, 0x3e, 0x00);
        chr.set(0x63, 0x00, 0x00, 0x7e, 0x66, 0x60, 0x60, 0x7e, 0x00);
        chr.set(0x64, 0x0e, 0x0c, 0x7c, 0x6c, 0x6c, 0x6c, 0x7c, 0x00);
        chr.set(0x65, 0x00, 0x00, 0x7e, 0x66, 0x7e, 0x60, 0x7e, 0x00);
        chr.set(0x66, 0x00, 0x3e, 0x30, 0x7c, 0x30, 0x30, 0x30, 0x00);
        chr.set(0x67, 0x00, 0x00, 0x7e, 0x6c, 0x6c, 0x7c, 0x0c, 0x7c);
        chr.set(0x68, 0x60, 0x60, 0x7c, 0x6c, 0x6c, 0x6c, 0x6e, 0x00);
        chr.set(0x69, 0x18, 0x00, 0x38, 0x18, 0x18, 0x18, 0x7e, 0x00);
        chr.set(0x6a, 0x06, 0x00, 0x06, 0x06, 0x06, 0x36, 0x36, 0x3e);
        chr.set(0x6b, 0x60, 0x60, 0x66, 0x6c, 0x78, 0x66, 0x66, 0x00);
        chr.set(0x6c, 0x38, 0x18, 0x18, 0x18, 0x18, 0x18, 0x7e, 0x00);
        chr.set(0x6d, 0x00, 0x00, 0xfe, 0xd6, 0xd6, 0xd6, 0xd6, 0x00);
        chr.set(0x6e, 0x00, 0x00, 0x7e, 0x36, 0x36, 0x36, 0x36, 0x00);
        chr.set(0x6f, 0x00, 0x00, 0x7e, 0x66, 0x66, 0x66, 0x7e, 0x00);
        chr.set(0x70, 0x00, 0x00, 0x7e, 0x36, 0x36, 0x3e, 0x30, 0x30);
        chr.set(0x71, 0x00, 0x00, 0x7c, 0x6c, 0x6c, 0x7c, 0x0c, 0x0e);
        chr.set(0x72, 0x00, 0x00, 0x7e, 0x36, 0x30, 0x30, 0x30, 0x00);
        chr.set(0x73, 0x00, 0x00, 0x7e, 0x60, 0x7e, 0x06, 0x7e, 0x00);
        chr.set(0x74, 0x00, 0x30, 0x7e, 0x30, 0x30, 0x30, 0x3e, 0x00);
        chr.set(0x75, 0x00, 0x00, 0x6c, 0x6c, 0x6c, 0x6c, 0x7e, 0x00);
        chr.set(0x76, 0x00, 0x00, 0x66, 0x66, 0x66, 0x3c, 0x18, 0x00);
        chr.set(0x77, 0x00, 0x00, 0xd6, 0xd6, 0xd6, 0xfe, 0x6c, 0x00);
        chr.set(0x78, 0x00, 0x00, 0x66, 0x3c, 0x18, 0x3c, 0x66, 0x00);
        chr.set(0x79, 0x00, 0x00, 0x76, 0x36, 0x36, 0x3e, 0x06, 0x3e);
        chr.set(0x7a, 0x00, 0x00, 0x7e, 0x06, 0x18, 0x60, 0x7e, 0x00);
        chr.set(0x7b, 0x0c, 0x18, 0x18, 0x70, 0x18, 0x18, 0x0c, 0x00);
        chr.set(0x7c, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x00);
        chr.set(0x7d, 0x60, 0x30, 0x30, 0x1c, 0x30, 0x30, 0x60, 0x00);
        chr.set(0x7e, 0x00, 0x00, 0x60, 0xf2, 0x9e, 0x0c, 0x00, 0x00);
        chr.set(0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
    }
}
exports.DefaultTileset = DefaultTileset;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
const DisplayRenderer_1 = require("./DisplayRenderer");
const TileBuffer_1 = require("./TileBuffer");
class Display {
    constructor(displayElement, width, height, hStretch, vStretch, defaultBufLayers, palette, tileset, animationInterval) {
        this.animationFrameIndex = 0;
        this.renderer = new DisplayRenderer_1.DisplayRenderer(displayElement, width, height, hStretch, vStretch, palette, tileset);
        this.buffers = [];
        this.createDefaultBuffer(defaultBufLayers);
        window.setInterval(this.advanceTileAnimation, animationInterval, this);
    }
    createDefaultBuffer(defaultBufLayers) {
        this.createNewBuffer("default", defaultBufLayers, this.renderer.cols, this.renderer.rows, 0, 0);
    }
    getDefaultBuffer() {
        return this.getBuffer("default");
    }
    createNewBuffer(id, layers, w, h, dispX, dispY) {
        const buf = new TileBuffer_1.TileBuffer(id, layers, w, h);
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
        this.renderer.reset();
        this.deleteAllBuffers();
        this.createDefaultBuffer(defaultBufLayers);
    }
    setBackColorIx(ix) {
        this.renderer.backColorIx = ix;
    }
    clearAllBuffers() {
        for (let i = 0; i < this.buffers.length; i++) {
            this.buffers[i].clearAllLayers();
        }
    }
    update() {
        this.renderer.clearToBackColor();
        this.drawVisibleBuffers();
        this.renderer.update();
    }
    getBuffer(id) {
        for (let i = 0; i < this.buffers.length; i++) {
            const buf = this.buffers[i];
            if (buf.id === id) {
                return buf;
            }
        }
        return null;
    }
    advanceTileAnimation(display) {
        if (!display) {
            display = this;
        }
        display.animationFrameIndex++;
        if (display.animationFrameIndex >= Number.MAX_SAFE_INTEGER) {
            display.animationFrameIndex = 0;
        }
    }
    drawTileFrame(tile, x, y, transparent) {
        this.renderer.drawTileFrame(tile, x, y, transparent);
    }
    drawVisibleBuffers() {
        for (let i = 0; i < this.buffers.length; i++) {
            const buf = this.buffers[i];
            if (buf.visible) {
                this.drawBuffer(buf);
            }
        }
    }
    drawBuffer(buf) {
        for (let i = 0; i < buf.layerCount; i++) {
            const layer = buf.layers[i];
            this.drawBufferLayer(layer, buf.view);
        }
    }
    drawBufferLayer(layer, view) {
        const w = view.width;
        const h = view.height;
        let dispX = view.displayX;
        let dispY = view.displayY;
        let bufX = view.scrollX;
        let bufY = view.scrollY;
        for (let tileY = bufY; tileY < bufY + h; tileY++) {
            for (let tileX = bufX; tileX < bufX + w; tileX++) {
                if (tileX >= 0 && tileY >= 0 && tileX < layer.width && tileY < layer.height &&
                    dispX >= 0 && dispY >= 0 && dispX < this.renderer.cols && dispY < this.renderer.rows) {
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
exports.Display = Display;

},{"./DisplayRenderer":9,"./TileBuffer":13}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRenderer = void 0;
const PTM_InitializationError_1 = require("../Errors/PTM_InitializationError");
const CanvasPoint_1 = require("./CanvasPoint");
const PixelBlock_1 = require("./PixelBlock");
class DisplayRenderer {
    constructor(parentElement, bufWidth, bufHeight, pixelWidth, pixelHeight, palette, tileset) {
        this.backColorIx = 0;
        this.pixelBufWidth = bufWidth;
        this.pixelBufHeight = bufHeight;
        this.pixelBufSize = bufWidth * bufHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.canvasWidth = bufWidth * pixelWidth;
        this.canvasHeight = bufHeight * pixelHeight;
        this.cols = bufWidth / PixelBlock_1.PixelBlock.Width;
        this.rows = bufHeight / PixelBlock_1.PixelBlock.Height;
        this.palette = palette;
        this.tileset = tileset;
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.canvasWidth;
        this.canvasElement.height = this.canvasHeight;
        parentElement.append(this.canvasElement);
        let ctx = this.canvasElement.getContext("2d");
        if (ctx === null) {
            throw new PTM_InitializationError_1.PTM_InitializationError("Unable to create CanvasRenderingContext2D");
        }
        this.canvas = ctx;
        this.canvas.imageSmoothingEnabled = false;
        this.canvas.imageSmoothingQuality = 'low';
        this.pixelPositions = this.calculatePixelPositions();
        this.pixels = [];
        this.reset();
    }
    update() {
        for (let i = 0; i < this.pixelPositions.length; i++) {
            const pos = this.pixelPositions[i];
            this.canvas.fillStyle = this.pixels[pos.index];
            this.canvas.fillRect(pos.x, pos.y, this.pixelWidth, this.pixelHeight);
        }
    }
    reset() {
        this.backColorIx = 0;
        this.clearToBackColor();
        this.update();
    }
    clearToBackColor() {
        this.clearToColor(this.backColorIx);
    }
    drawTileFrame(tile, x, y, transparent) {
        x *= PixelBlock_1.PixelBlock.Width;
        y *= PixelBlock_1.PixelBlock.Height;
        const px = x;
        const xmax = x + PixelBlock_1.PixelBlock.Width;
        const pixelBlock = this.tileset.get(tile.ix);
        for (let i = 0; i < pixelBlock.pixels.length; i++) {
            const pixel = pixelBlock.pixels[i];
            const fgc = this.palette.get(tile.fgc);
            const bgc = this.palette.get(tile.bgc);
            if (pixel === PixelBlock_1.PixelBlock.PixelOn) {
                this.setPixelRgb(x, y, fgc);
            }
            else if (pixel === PixelBlock_1.PixelBlock.PixelOff && !transparent) {
                this.setPixelRgb(x, y, bgc);
            }
            x++;
            if (x >= xmax) {
                x = px;
                y++;
            }
        }
    }
    clearToColor(ix) {
        const color = this.palette.get(ix);
        this.clearToColorRgb(color);
    }
    clearToColorRgb(color) {
        for (let pos = 0; pos < this.pixelBufSize; pos++) {
            this.setPixelRgbLinear(pos, color);
        }
    }
    setPixelRgbLinear(pos, color) {
        this.pixels[pos] = color;
    }
    setPixelRgb(x, y, color) {
        this.pixels[y * this.pixelBufWidth + x] = color;
    }
    calculatePixelPositions() {
        const positions = [];
        let canvasX = 0;
        let canvasY = 0;
        for (let pixelBufIndex = 0; pixelBufIndex < this.pixelBufSize; pixelBufIndex++) {
            positions.push(new CanvasPoint_1.CanvasPoint(canvasX, canvasY, pixelBufIndex));
            canvasX += this.pixelWidth;
            if (canvasX >= this.canvasWidth) {
                canvasX = 0;
                canvasY += this.pixelHeight;
            }
        }
        return positions;
    }
}
exports.DisplayRenderer = DisplayRenderer;

},{"../Errors/PTM_InitializationError":1,"./CanvasPoint":4,"./PixelBlock":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
class Palette {
    constructor() {
        this.colors = [];
    }
    init(numberOfColors, defaultColor) {
        this.colors = [];
        for (let i = 0; i < numberOfColors; i++) {
            this.colors.push(defaultColor);
        }
        return this.colors;
    }
    set(ix, color) {
        this.colors[ix] = color;
    }
    get(ix) {
        return this.colors[ix];
    }
    size() {
        return this.colors.length;
    }
}
exports.Palette = Palette;

},{}],11:[function(require,module,exports){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelBlock = void 0;
class PixelBlock {
    constructor() {
        this.pixels = "";
        this.clear();
    }
    clear() {
        this.pixels = "";
        for (let i = 0; i < PixelBlock.Size; i++) {
            this.pixels += PixelBlock.PixelOff;
        }
    }
    toString() {
        return this.pixels;
    }
    setPixelRow(pixelRow, byte) {
        const bitIndex = pixelRow * PixelBlock.Width;
        let currentPixels = this.pixels;
        let newPixels = "";
        const binaryRow = byte.toString(2).padStart(PixelBlock.Width, PixelBlock.PixelOff);
        for (let i = 0; i < currentPixels.length; i++) {
            if (i >= bitIndex && i < bitIndex + PixelBlock.Width) {
                newPixels += binaryRow[i % PixelBlock.Width];
            }
            else {
                newPixels += currentPixels[i];
            }
        }
        this.pixels = newPixels;
    }
    setPixelRows(r0, r1, r2, r3, r4, r5, r6, r7) {
        this.setPixelRow(0, r0);
        this.setPixelRow(1, r1);
        this.setPixelRow(2, r2);
        this.setPixelRow(3, r3);
        this.setPixelRow(4, r4);
        this.setPixelRow(5, r5);
        this.setPixelRow(6, r6);
        this.setPixelRow(7, r7);
    }
    getRowAsByte(pixelRow) {
        const binary = this.getRowAsBinaryString(pixelRow);
        const rowPixels = Number.parseInt(binary, 2);
        return rowPixels;
    }
    getRowAsBinaryString(pixelRow) {
        const bitIndex = pixelRow * PixelBlock.Width;
        let binary = "";
        for (let i = bitIndex; i < bitIndex + PixelBlock.Width; i++) {
            binary += this.pixels[i];
        }
        return binary;
    }
    getRowsAsBytes() {
        let bytes = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            bytes.push(this.getRowAsByte(row));
        }
        return bytes;
    }
    getRowsAsBinaryStrings() {
        let str = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            str.push(this.getRowAsBinaryString(row));
        }
        return str;
    }
}
exports.PixelBlock = PixelBlock;
_a = PixelBlock;
PixelBlock.Width = 8;
PixelBlock.Height = 8;
PixelBlock.Size = _a.Width * _a.Height;
PixelBlock.PixelOn = '1';
PixelBlock.PixelOff = '0';

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
class Tile {
    constructor() {
        this.ix = 0;
        this.fgc = 0;
        this.bgc = 0;
    }
    set(ix, fgc, bgc) {
        this.ix = ix;
        this.fgc = fgc;
        this.bgc = bgc;
    }
    setEqual(other) {
        this.ix = other.ix;
        this.fgc = other.fgc;
        this.bgc = other.bgc;
    }
    setBlank() {
        this.ix = 0;
        this.fgc = 0;
        this.bgc = 0;
    }
}
exports.Tile = Tile;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileBuffer = void 0;
const TileBufferLayer_1 = require("./TileBufferLayer");
const TileSeq_1 = require("./TileSeq");
const Viewport_1 = require("./Viewport");
class TileBuffer {
    constructor(id, layerCount, w, h) {
        this.id = id;
        this.layerCount = layerCount;
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.layers = [];
        for (let i = 0; i < layerCount; i++) {
            const emptyLayer = new TileBufferLayer_1.TileBufferLayer(w, h);
            this.layers.push(emptyLayer);
        }
        this.view = new Viewport_1.Viewport(0, 0, w, h);
        this.visible = true;
    }
    clearAllLayers() {
        for (let i = 0; i < this.layerCount; i++) {
            this.clearLayer(i);
        }
    }
    clearLayer(layer) {
        this.layers[layer].clear();
    }
    setTile(tile, layer, x, y) {
        this.layers[layer].setTile(tile, x, y);
    }
    setTileString(str, cursor, fgc, bgc, transp) {
        const px = cursor.x;
        for (let i = 0; i < str.length; i++) {
            const tile = new TileSeq_1.TileSeq();
            const ch = str.charCodeAt(i);
            if (str.charAt(i) === "\n") {
                cursor.y++;
                cursor.x = px;
            }
            else {
                tile.transparent = transp;
                tile.setSingle(ch, fgc, bgc);
                this.setTile(tile, cursor.layer, cursor.x, cursor.y);
                cursor.x++;
            }
        }
    }
    overlapTileString(str, layer, x, y, fgc, bgc, transp) {
        for (let i = 0; i < str.length; i++) {
            const tile = this.getTileRef(layer, x + i, y);
            const ch = str.charCodeAt(i);
            tile.transparent = transp;
            tile.add(ch, fgc, bgc);
        }
    }
    getTileCopy(layer, x, y) {
        return this.layers[layer].getTileCopy(x, y);
    }
    getTileRef(layer, x, y) {
        return this.layers[layer].getTileRef(x, y);
    }
}
exports.TileBuffer = TileBuffer;

},{"./TileBufferLayer":14,"./TileSeq":15,"./Viewport":17}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileBufferLayer = void 0;
const TileSeq_1 = require("./TileSeq");
class TileBufferLayer {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.tiles = [];
        for (let i = 0; i < this.size; i++) {
            const emptyTile = new TileSeq_1.TileSeq();
            this.tiles.push(emptyTile);
        }
    }
    clear() {
        for (let i = 0; i < this.size; i++) {
            this.tiles[i].deleteAll();
        }
    }
    setTile(tile, x, y) {
        if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
            const pos = y * this.width + x;
            this.tiles[pos].setEqual(tile);
        }
    }
    getTileCopy(x, y) {
        const tile = new TileSeq_1.TileSeq();
        tile.setEqual(this.getTileRef(x, y));
        return tile;
    }
    getTileRef(x, y) {
        return this.tiles[y * this.width + x];
    }
}
exports.TileBufferLayer = TileBufferLayer;

},{"./TileSeq":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileSeq = void 0;
const Tile_1 = require("./Tile");
class TileSeq {
    constructor() {
        this.frames = [];
        this.transparent = false;
    }
    deleteAll() {
        this.frames = [];
    }
    add(ix, fgc, bgc) {
        const frame = new Tile_1.Tile();
        frame.set(ix, fgc, bgc);
        this.frames.push(frame);
    }
    set(frame, ix, fgc, bgc) {
        this.frames[frame].set(ix, fgc, bgc);
    }
    setSingle(ix, fgc, bgc) {
        this.deleteAll();
        this.add(ix, fgc, bgc);
    }
    isEmpty() {
        return this.frames.length === 0;
    }
    setEqual(other) {
        this.transparent = other.transparent;
        this.frames = [];
        for (let i = 0; i < other.frames.length; i++) {
            const tile = new Tile_1.Tile();
            tile.setEqual(other.frames[i]);
            this.frames.push(tile);
        }
    }
}
exports.TileSeq = TileSeq;

},{"./Tile":12}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tileset = void 0;
const PixelBlock_1 = require("./PixelBlock");
class Tileset {
    constructor() {
        this.tiles = [];
    }
    initBlank(numberOfTiles) {
        this.tiles = [];
        for (let i = 0; i < numberOfTiles; i++) {
            this.tiles.push(new PixelBlock_1.PixelBlock());
        }
        return this.tiles;
    }
    set(ix, r0, r1, r2, r3, r4, r5, r6, r7) {
        this.tiles[ix].setPixelRows(r0, r1, r2, r3, r4, r5, r6, r7);
    }
    setPixelRow(ix, pixelRow, byte) {
        this.tiles[ix].setPixelRow(pixelRow, byte);
    }
    get(ix) {
        return this.tiles[ix];
    }
    size() {
        return this.tiles.length;
    }
}
exports.Tileset = Tileset;

},{"./PixelBlock":11}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
class Viewport {
    constructor(dispX, dispY, w, h) {
        this.displayX = dispX;
        this.displayY = dispY;
        this.width = w;
        this.height = h;
        this.scrollX = 0;
        this.scrollY = 0;
    }
    set(dispX, dispY, w, h) {
        this.displayX = dispX;
        this.displayY = dispY;
        this.width = w;
        this.height = h;
    }
    scroll(dx, dy) {
        this.scrollX += dx;
        this.scrollY += dy;
    }
}
exports.Viewport = Viewport;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardInput = void 0;
class KeyboardInput {
    constructor(ptm) {
        this.ptm = ptm;
        this.buffer = [];
        this.lastKey = "NONE";
        window.addEventListener("keydown", (e) => {
            this.onKeyDown(e);
        });
    }
    clearBuffer() {
        this.buffer = [];
    }
    clearLastKey() {
        this.lastKey = "NONE";
    }
    hasKey(key) {
        return this.buffer.includes(key.toUpperCase());
    }
    hasAnyKey() {
        return this.buffer.length > 0;
    }
    getKey() {
        let key = this.buffer.pop();
        if (key === undefined)
            key = "NONE";
        return key;
    }
    getLastKeyPressed() {
        const key = this.lastKey;
        this.clearLastKey();
        return key;
    }
    onKeyDown(e) {
        let key = "";
        if (e.ctrlKey)
            key += "CTRL+";
        if (e.shiftKey)
            key += "SHIFT+";
        if (e.altKey)
            key += "ALT+";
        switch (e.key) {
            case " ":
                key += "SPACE";
                break;
            case "ArrowRight":
                key += "RIGHT";
                break;
            case "ArrowLeft":
                key += "LEFT";
                break;
            case "ArrowUp":
                key += "UP";
                break;
            case "ArrowDown":
                key += "DOWN";
                break;
            case "End":
                key += "END";
                break;
            case "Home":
                key += "HOME";
                break;
            case "PageDown":
                key += "PGDN";
                break;
            case "PageUp":
                key += "PGUP";
                break;
            case "Enter":
                key += "ENTER";
                break;
            case "Insert":
                key += "INS";
                break;
            case "Delete":
                key += "DEL";
                break;
            case "Backspace":
                key += "BS";
                break;
            case "Escape":
                key += "ESC";
                break;
            case "Tab":
                key += "TAB";
                break;
            case "A":
            case "a":
                key += "A";
                break;
            case "B":
            case "b":
                key += "B";
                break;
            case "C":
            case "c":
                key += "C";
                break;
            case "D":
            case "d":
                key += "D";
                break;
            case "E":
            case "e":
                key += "E";
                break;
            case "F":
            case "f":
                key += "F";
                break;
            case "G":
            case "g":
                key += "G";
                break;
            case "H":
            case "h":
                key += "H";
                break;
            case "I":
            case "i":
                key += "I";
                break;
            case "J":
            case "j":
                key += "J";
                break;
            case "K":
            case "k":
                key += "K";
                break;
            case "L":
            case "l":
                key += "L";
                break;
            case "M":
            case "m":
                key += "M";
                break;
            case "N":
            case "n":
                key += "N";
                break;
            case "O":
            case "o":
                key += "O";
                break;
            case "P":
            case "p":
                key += "P";
                break;
            case "Q":
            case "q":
                key += "Q";
                break;
            case "R":
            case "r":
                key += "R";
                break;
            case "S":
            case "s":
                key += "S";
                break;
            case "T":
            case "t":
                key += "T";
                break;
            case "U":
            case "u":
                key += "U";
                break;
            case "V":
            case "v":
                key += "V";
                break;
            case "W":
            case "w":
                key += "W";
                break;
            case "X":
            case "x":
                key += "X";
                break;
            case "Y":
            case "y":
                key += "Y";
                break;
            case "Z":
            case "z":
                key += "Z";
                break;
            case "Ç":
            case "ç":
                key += "Ç";
                break;
            case "0":
                key += "0";
                break;
            case "1":
                key += "1";
                break;
            case "2":
                key += "2";
                break;
            case "3":
                key += "3";
                break;
            case "4":
                key += "4";
                break;
            case "5":
                key += "5";
                break;
            case "6":
                key += "6";
                break;
            case "7":
                key += "7";
                break;
            case "8":
                key += "8";
                break;
            case "9":
                key += "9";
                break;
            case "+":
                key += "+";
                break;
            case "-":
                key += "-";
                break;
            case "*":
                key += "*";
                break;
            case "/":
                key += "/";
                break;
            case "=":
                key += "=";
                break;
            case ".":
                key += ".";
                break;
            case ",":
                key += ",";
                break;
            case ";":
                key += ";";
                break;
            case "'":
                key += "'";
                break;
            case "[":
                key += "[";
                break;
            case "]":
                key += "]";
                break;
            default: return;
        }
        this.lastKey = key;
        this.buffer.push(key);
    }
}
exports.KeyboardInput = KeyboardInput;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStack = void 0;
class CallStack {
    constructor() {
        this.programPtrs = [];
    }
    push(programPtr) {
        this.programPtrs.push(programPtr);
    }
    pop() {
        return this.programPtrs.pop();
    }
    isEmpty() {
        return this.programPtrs.length === 0;
    }
    clear() {
        this.programPtrs = [];
    }
}
exports.CallStack = CallStack;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const Comparison_1 = require("./Comparison");
class Commands {
    constructor(ptm, intp) {
        this.ptm = ptm;
        this.intp = intp;
        this.commandList = {
            ["TEST"]: this.TEST,
            ["DEBUG"]: this.DEBUG,
            ["DATA"]: this.DATA,
            ["EXIT"]: this.EXIT,
            ["RESET"]: this.RESET,
            ["TITLE"]: this.TITLE,
            ["SCREEN"]: this.SCREEN,
            ["GOTO"]: this.GOTO,
            ["CALL"]: this.CALL,
            ["RET"]: this.RET,
            ["VAR"]: this.VAR,
            ["ARR.NEW"]: this.ARR_NEW,
            ["ARR.SET"]: this.ARR_SET,
            ["ARR.PUSH"]: this.ARR_PUSH,
            ["ARR.FOR"]: this.ARR_FOR,
            ["INC"]: this.INC,
            ["DEC"]: this.DEC,
            ["CLS"]: this.CLS,
            ["PAL"]: this.PAL,
            ["CHR"]: this.CHR,
            ["WCOL"]: this.WCOL,
            ["VSYNC"]: this.VSYNC,
            ["BUF.SEL"]: this.BUF_SEL,
            ["BUF.VIEW"]: this.BUF_VIEW,
            ["BUF.SCRL"]: this.BUF_SCRL,
            ["LAYER"]: this.LAYER,
            ["LOCATE"]: this.LOCATE,
            ["TILE.NEW"]: this.TILE_NEW,
            ["TILE.ADD"]: this.TILE_ADD,
            ["PUT"]: this.PUT,
            ["FILL"]: this.FILL,
            ["TRON"]: this.TRON,
            ["TROFF"]: this.TROFF,
            ["PRINT"]: this.PRINT,
            ["PRINTL"]: this.PRINTL,
            ["RPRINT"]: this.RPRINT,
            ["RPRINTL"]: this.RPRINTL,
            ["PRINT.ADD"]: this.PRINT_ADD,
            ["FCOL"]: this.FCOL,
            ["BCOL"]: this.BCOL,
            ["COLOR"]: this.COLOR,
            ["PAUSE"]: this.PAUSE,
            ["FOR"]: this.FOR,
            ["NEXT"]: this.NEXT,
            ["BRK"]: this.BRK,
            ["SKIP"]: this.SKIP,
            ["IF.EQ"]: this.IF_EQ,
            ["IF.NEQ"]: this.IF_NEQ,
            ["IF.GT"]: this.IF_GT,
            ["IF.GTE"]: this.IF_GTE,
            ["IF.LT"]: this.IF_LT,
            ["IF.LTE"]: this.IF_LTE,
            ["ENDIF"]: this.ENDIF,
            ["INKEY"]: this.INKEY,
            ["CYCLES"]: this.CYCLES
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.log.printCommandExecution(programLine);
            this.intp.programLine = programLine;
            const commandFunction = this.commandList[cmd];
            if (commandFunction !== undefined) {
                commandFunction.call(this, this.ptm, this.intp);
            }
            else {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Unknown command: ${cmd}`, programLine);
            }
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Command reference is invalid`, programLine);
        }
    }
    TEST(ptm, intp) {
    }
    DEBUG(ptm, intp) {
        intp.argc(1);
        if (intp.isArray(0)) {
            const arrId = intp.getArg(0).text;
            const arr = intp.requireExistingArray(0);
            ptm.log.printVariableOrArray(arrId, arr);
        }
        else {
            const varId = intp.getArg(0).text;
            const value = intp.requireString(0);
            ptm.log.printVariableOrArray(varId, value);
        }
    }
    DATA(ptm, intp) {
    }
    EXIT(ptm, intp) {
        intp.argc(0);
        ptm.stop("EXIT command");
        if (ptm.display) {
            ptm.display.update();
        }
    }
    RESET(ptm, intp) {
        intp.argc(0);
        ptm.reset();
    }
    TITLE(ptm, intp) {
        intp.argc(1);
        window.document.title = intp.requireString(0);
    }
    SCREEN(ptm, intp) {
        intp.argc(5);
        const width = intp.requireNumber(0);
        const height = intp.requireNumber(1);
        const defaultBufLayers = intp.requireNumber(2);
        const hStretch = intp.requireNumber(3);
        const vStretch = intp.requireNumber(4);
        ptm.createDisplay(width, height, hStretch, vStretch, defaultBufLayers);
    }
    GOTO(ptm, intp) {
        intp.argc(1);
        const ixProgramLine = intp.requireLabelTarget(0);
        ptm.gotoSubroutine(ixProgramLine);
    }
    CALL(ptm, intp) {
        intp.argc(1);
        const ixProgramLine = intp.requireLabelTarget(0);
        ptm.callSubroutine(ixProgramLine);
    }
    RET(ptm, intp) {
        intp.argc(0);
        ptm.returnFromSubroutine();
    }
    VAR(ptm, intp) {
        intp.argc(2);
        const id = intp.requireId(0);
        ptm.setVar(id, intp.requireString(1));
    }
    ARR_NEW(ptm, intp) {
        const argc = intp.argcMinMax(1, 3);
        const arrayId = intp.requireId(0);
        let initialArrLen = 0;
        if (argc > 1) {
            initialArrLen = intp.requireNumber(1);
        }
        let initialElement = "";
        if (argc > 2) {
            initialElement = intp.requireString(2);
        }
        const arr = [];
        if (initialArrLen > 0) {
            for (let i = 0; i < initialArrLen; i++) {
                arr.push(initialElement);
            }
        }
        ptm.arrays[arrayId] = arr;
    }
    ARR_PUSH(ptm, intp) {
        intp.argc(2);
        const array = intp.requireExistingArray(0);
        const value = intp.requireString(1);
        array.push(value);
    }
    ARR_FOR(ptm, intp) {
        intp.argc(2);
        const arrId = intp.requireId(0);
        const arr = intp.requireExistingArray(0);
        const iterVarId = intp.requireId(1);
        ptm.beginArrayLoop(arr, arrId, iterVarId);
    }
    ARR_SET(ptm, intp) {
        intp.argc(2);
        const arraySubscript = intp.requireArraySubscript(0);
        const arrayId = arraySubscript.arrayId;
        const ix = arraySubscript.ix;
        const arr = ptm.arrays[arrayId];
        const value = intp.requireString(1);
        arr[ix] = value;
    }
    INC(ptm, intp) {
        intp.argc(1);
        const varId = intp.requireExistingVariable(0);
        const value = intp.requireNumber(0);
        ptm.setVar(varId, value + 1);
    }
    DEC(ptm, intp) {
        intp.argc(1);
        const varId = intp.requireExistingVariable(0);
        const value = intp.requireNumber(0);
        ptm.setVar(varId, value - 1);
    }
    PAL(ptm, intp) {
        intp.argc(2);
        const ix = intp.requirePaletteIndex(0);
        const color = intp.requireColor(1);
        ptm.palette.set(ix, color);
    }
    CHR(ptm, intp) {
        intp.argc(3);
        const ix = intp.requireTilesetIndex(0);
        const pixelRow = intp.requireNumber(1);
        const byte = intp.requireNumber(2);
        ptm.tileset.setPixelRow(ix, pixelRow, byte);
    }
    CLS(ptm, intp) {
        intp.argc(0);
        if (ptm.display) {
            ptm.display.clearAllBuffers();
            if (ptm.cursor) {
                ptm.cursor.layer = 0;
                ptm.cursor.setPos(0, 0);
            }
        }
    }
    WCOL(ptm, intp) {
        intp.argc(1);
        const ix = intp.requirePaletteIndex(0);
        if (ptm.display) {
            ptm.display.setBackColorIx(ix);
        }
    }
    VSYNC(ptm, intp) {
        intp.argc(0);
        if (ptm.display) {
            ptm.display.update();
        }
    }
    BUF_SEL(ptm, intp) {
        intp.argc(1);
        const bufId = intp.requireString(0);
        if (ptm.cursor && ptm.display) {
            const buf = ptm.display.getBuffer(bufId);
            if (buf) {
                ptm.cursor.buffer = buf;
            }
            else {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Buffer not found with id "${bufId}"`, intp.programLine);
            }
        }
    }
    BUF_VIEW(ptm, intp) {
        intp.argc(4);
        const x = intp.requireNumber(0);
        const y = intp.requireNumber(1);
        const w = intp.requireNumber(2);
        const h = intp.requireNumber(3);
        if (ptm.cursor) {
            ptm.cursor.buffer.view.set(x, y, w, h);
        }
    }
    BUF_SCRL(ptm, intp) {
        intp.argc(2);
        const dx = intp.requireNumber(0);
        const dy = intp.requireNumber(1);
        if (ptm.cursor) {
            ptm.cursor.buffer.view.scroll(dx, dy);
        }
    }
    LAYER(ptm, intp) {
        intp.argc(1);
        const layer = intp.requireNumber(0);
        if (ptm.cursor) {
            if (layer >= 0 && layer < ptm.cursor.buffer.layerCount) {
                ptm.cursor.layer = layer;
            }
            else {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Layer index out of bounds for buffer "${ptm.cursor.buffer.id}": ${layer}`, intp.programLine);
            }
        }
    }
    TILE_NEW(ptm, intp) {
        intp.argc(3);
        const ch = intp.requireNumber(0);
        const fgc = intp.requireNumber(1);
        const bgc = intp.requireNumber(2);
        ptm.currentTile.setSingle(ch, fgc, bgc);
    }
    TILE_ADD(ptm, intp) {
        intp.argc(3);
        const ch = intp.requireNumber(0);
        const fgc = intp.requireNumber(1);
        const bgc = intp.requireNumber(2);
        ptm.currentTile.add(ch, fgc, bgc);
    }
    LOCATE(ptm, intp) {
        intp.argc(2);
        const x = intp.requireNumber(0);
        const y = intp.requireNumber(1);
        if (ptm.cursor) {
            ptm.cursor.setPos(x, y);
        }
    }
    PUT(ptm, intp) {
        intp.argc(0);
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.setTile(ptm.currentTile, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y);
        }
    }
    FILL(ptm, intp) {
        intp.argc(0);
        if (ptm.cursor && ptm.display) {
            for (let y = 0; y < ptm.cursor.buffer.height; y++) {
                for (let x = 0; x < ptm.cursor.buffer.width; x++) {
                    ptm.cursor.buffer.setTile(ptm.currentTile, ptm.cursor.layer, x, y);
                }
            }
        }
    }
    TRON(ptm, intp) {
        intp.argc(0);
        ptm.currentTile.transparent = true;
    }
    TROFF(ptm, intp) {
        intp.argc(0);
        ptm.currentTile.transparent = false;
    }
    PRINT(ptm, intp) {
        intp.argc(1);
        const text = intp.requireString(0);
        ptm.printFmtTileStringAtCursorPos(text);
    }
    PRINTL(ptm, intp) {
        const argc = intp.argcMinMax(0, 1);
        const text = argc > 0 ? intp.requireString(0) : "";
        ptm.printFmtTileStringAtCursorPos(text + "{LF}");
    }
    RPRINT(ptm, intp) {
        intp.argc(1);
        const text = intp.requireString(0);
        ptm.printRawTileStringAtCursorPos(text);
    }
    PRINT_ADD(ptm, intp) {
        intp.argc(1);
        const text = intp.requireString(0);
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.overlapTileString(text, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y, ptm.currentTextFgc, ptm.currentTextBgc, ptm.currentTile.transparent);
            ptm.cursor.x += text.length;
        }
    }
    RPRINTL(ptm, intp) {
        intp.argc(1);
        const text = intp.requireString(0);
        ptm.printRawTileStringAtCursorPos(text + "\n");
    }
    FCOL(ptm, intp) {
        intp.argc(1);
        const color = intp.requireNumber(0);
        ptm.currentTextFgc = color;
    }
    BCOL(ptm, intp) {
        intp.argc(1);
        const color = intp.requireNumber(0);
        ptm.currentTextBgc = color;
    }
    COLOR(ptm, intp) {
        const argc = intp.argcMinMax(1, 2);
        const fgc = intp.requireNumber(0);
        ptm.currentTextFgc = fgc;
        if (argc === 2) {
            const bgc = intp.requireNumber(1);
            ptm.currentTextBgc = bgc;
        }
    }
    PAUSE(ptm, intp) {
        intp.argc(1);
        const length = intp.requireNumber(0);
        ptm.pause(length);
    }
    FOR(ptm, intp) {
        const argc = intp.argcMinMax(3, 4);
        const varId = intp.requireId(0);
        const first = intp.requireNumber(1);
        const last = intp.requireNumber(2);
        const step = argc === 4 ? intp.requireNumber(3) : 1;
        ptm.beginLoop(varId, first, last, step);
    }
    NEXT(ptm, intp) {
        intp.argc(0);
        ptm.endLoop();
    }
    BRK(ptm, intp) {
        intp.argc(0);
        ptm.abortLoop();
    }
    SKIP(ptm, intp) {
        intp.argc(0);
        ptm.skipLoopIteration();
    }
    IF_EQ(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.Equal, a, b);
    }
    IF_NEQ(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.NotEqual, a, b);
    }
    IF_GT(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.Greater, a, b);
    }
    IF_GTE(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.GreaterOrEqual, a, b);
    }
    IF_LT(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.Lesser, a, b);
    }
    IF_LTE(ptm, intp) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison_1.Comparison.LesserOrEqual, a, b);
    }
    ENDIF(ptm, intp) {
        intp.argc(0);
    }
    INKEY(ptm, intp) {
        intp.argc(1);
        const varId = intp.requireId(0);
        const key = ptm.keyboard.getKey();
        ptm.setVar(varId, key);
    }
    CYCLES(ptm, intp) {
        intp.argc(1);
        const varId = intp.requireId(0);
        ptm.setVar(varId, ptm.cycleCounter);
    }
}
exports.Commands = Commands;

},{"../Errors/PTM_RuntimeError":3,"./Comparison":21}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comparison = void 0;
var Comparison;
(function (Comparison) {
    Comparison[Comparison["Equal"] = 0] = "Equal";
    Comparison[Comparison["NotEqual"] = 1] = "NotEqual";
    Comparison[Comparison["Greater"] = 2] = "Greater";
    Comparison[Comparison["GreaterOrEqual"] = 3] = "GreaterOrEqual";
    Comparison[Comparison["Lesser"] = 4] = "Lesser";
    Comparison[Comparison["LesserOrEqual"] = 5] = "LesserOrEqual";
})(Comparison = exports.Comparison || (exports.Comparison = {}));

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FmtStringPrinter = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const TileSeq_1 = require("../Graphics/TileSeq");
const Interpreter_1 = require("./Interpreter");
class TextColor {
    constructor(fg, bg) {
        this.fg = 0;
        this.bg = 0;
        this.fgPrev = 0;
        this.bgPrev = 0;
        this.fg = fg;
        this.bg = bg;
        this.fgPrev = fg;
        this.bgPrev = bg;
    }
}
class ResolvedEscapeSeq {
    constructor() {
        this.varValue = null;
        this.tileIndex = null;
    }
}
class FmtStringPrinter {
    constructor(ptm) {
        this.ptm = ptm;
        this.error = null;
    }
    print(fmt, csr, initFgc, initBgc, transp) {
        const buf = csr.buffer;
        const layer = csr.layer;
        const initX = csr.x;
        let tile = new TileSeq_1.TileSeq();
        tile.transparent = transp;
        tile.setSingle(0, 0, 0);
        let textColor = new TextColor(initFgc, initBgc);
        const chEscapeBegin = "{";
        const chEscapeEnd = "}";
        let escaped = false;
        let escapeSeq = "";
        let isVariable = false;
        let resolvedVariableValue = "";
        for (let i = 0; i < fmt.length; i++) {
            let tileIndex = fmt.charCodeAt(i);
            const ch = fmt.charAt(i);
            if (ch === chEscapeBegin) {
                if (escaped) {
                    this.error = "Escape sequences cannot be nested";
                    return;
                }
                escaped = true;
                continue;
            }
            else if (ch === chEscapeEnd) {
                if (!escaped) {
                    this.error = "Missing opening escape character";
                    return;
                }
                escaped = false;
                const res = this.interpretEscapeSequence(escapeSeq, csr, initX, textColor);
                escapeSeq = "";
                if (res) {
                    if (res.tileIndex) {
                        tileIndex = res.tileIndex;
                    }
                    else if (res.varValue) {
                        isVariable = true;
                        resolvedVariableValue = res.varValue;
                    }
                }
                else {
                    continue;
                }
            }
            else if (escaped) {
                escapeSeq += ch;
                continue;
            }
            if (isVariable) {
                isVariable = false;
                for (let i = 0; i < resolvedVariableValue.length; i++) {
                    tile.set(0, resolvedVariableValue.charCodeAt(i), textColor.fg, textColor.bg);
                    buf.setTile(tile, layer, csr.x, csr.y);
                    csr.x++;
                }
            }
            else {
                tile.set(0, tileIndex, textColor.fg, textColor.bg);
                buf.setTile(tile, layer, csr.x, csr.y);
                csr.x++;
            }
        }
    }
    interpretEscapeSequence(esc, csr, initX, textColor) {
        if (esc.toUpperCase() === "LF") {
            csr.y++;
            csr.x = initX;
            return null;
        }
        else if (esc[0].toUpperCase() === "F") {
            textColor.fgPrev = textColor.fg;
            textColor.fg = Number(esc.substring(1).trim());
            return null;
        }
        else if (esc.toUpperCase() === "/F") {
            textColor.fg = textColor.fgPrev;
            return null;
        }
        else if (esc[0].toUpperCase() === "B") {
            textColor.bgPrev = textColor.bg;
            textColor.bg = Number(esc.substring(1).trim());
            return null;
        }
        else if (esc.toUpperCase() === "/B") {
            textColor.bg = textColor.bgPrev;
            return null;
        }
        else if (esc[0].toUpperCase() === "C") {
            const res = new ResolvedEscapeSeq();
            res.tileIndex = Number(esc.substring(1).trim());
            return res;
        }
        else if (esc[0] === "%") {
            const varId = esc.substring(1);
            if (varId.indexOf("[") > 0 && varId.indexOf("]") > 0) { // Array element
                const open = varId.indexOf("[");
                const close = varId.indexOf("]");
                const arrId = varId.substring(0, open);
                const arrIndex = varId.substring(open + 1, close);
                const arr = this.ptm.arrays[arrId];
                if (arr === undefined) {
                    throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array not found: ${arrId}`, this.ptm.currentLine);
                }
                let value = "";
                if (Interpreter_1.Interpreter.isValidIdentifier(arrIndex)) {
                    const ixStr = this.ptm.vars[arrIndex];
                    if (ixStr === undefined) {
                        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Variable used as array index not found: ${arrId}[${arrIndex}]`, this.ptm.currentLine);
                    }
                    const ix = Number(ixStr);
                    if (Number.isNaN(ix)) {
                        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Invalid array subscript: ${ixStr}`, this.ptm.currentLine);
                    }
                    if (ix < 0 || ix >= arr.length) {
                        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Index out of bounds for array ${arrId}: ${ix}`, this.ptm.currentLine);
                    }
                    value = arr[ix];
                }
                else {
                    const ix = Number(arrIndex);
                    if (ix < 0 || ix >= arr.length) {
                        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Index out of bounds for array ${arrId}: ${ix}`, this.ptm.currentLine);
                    }
                    value = arr[ix];
                }
                const res = new ResolvedEscapeSeq();
                res.varValue = value;
                return res;
            }
            else { // Simple variable
                const value = this.ptm.vars[varId];
                if (value === undefined) {
                    throw new PTM_RuntimeError_1.PTM_RuntimeError(`Variable not found: ${varId}`, this.ptm.currentLine);
                }
                const res = new ResolvedEscapeSeq();
                res.varValue = value;
                return res;
            }
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Unrecognized escape sequence: ${esc}`, this.ptm.currentLine);
        }
    }
}
exports.FmtStringPrinter = FmtStringPrinter;

},{"../Errors/PTM_RuntimeError":3,"../Graphics/TileSeq":15,"./Interpreter":24}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfStack = void 0;
class IfStack {
    constructor() {
        this.programPtrs = [];
    }
    push(programPtr) {
        this.programPtrs.push(programPtr);
    }
    pop() {
        return this.programPtrs.pop();
    }
    isEmpty() {
        return this.programPtrs.length === 0;
    }
    clear() {
        this.programPtrs = [];
    }
}
exports.IfStack = IfStack;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const ParamType_1 = require("../Parser/ParamType");
class Interpreter {
    constructor(ptm, program) {
        this.ptm = ptm;
        this.program = program;
    }
    static isValidIdentifier(id) {
        return id.match(/^[$A-Z_][0-9A-Z._$]*$/i) !== null;
    }
    getArg(paramIx) {
        return this.programLine.params[paramIx];
    }
    argc(expectedArgc) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc !== expectedArgc) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`, this.programLine);
        }
    }
    argcMinMax(min, max) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`, this.programLine);
        }
        return actualArgc;
    }
    getStringValueFromVariable(id) {
        const value = this.ptm.vars[id];
        if (value === undefined) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Variable not found: ${id}`, this.programLine);
        }
        return value;
    }
    getNumericValueFromVariable(id) {
        const str = this.getStringValueFromVariable(id);
        const num = Number(str);
        if (Number.isNaN(num)) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Expected a number, got string: ${str}`, this.programLine);
        }
        return num;
    }
    getStringValueFromArrayElement(param) {
        if (!param.arrayAccess || !param.arrayAccess.arrayId) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array access expected`, this.programLine);
        }
        const arrayId = param.arrayAccess.arrayId;
        const arr = this.ptm.arrays[arrayId];
        if (arr === undefined) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array not found: ${arrayId}`, this.programLine);
        }
        if (param.type === ParamType_1.ParamType.ArrayIxLiteral) {
            const ix = param.arrayAccess.ixLiteral;
            if (ix !== undefined && ix !== null) {
                const value = arr[ix];
                if (value === undefined) {
                    throw new PTM_RuntimeError_1.PTM_RuntimeError(`Index out of bounds for array ${arrayId}: ${ix}`, this.programLine);
                }
                return value;
            }
        }
        else if (param.type === ParamType_1.ParamType.ArrayIxVarIdentifier) {
            const ixVar = param.arrayAccess.ixVariable;
            if (ixVar) {
                const ix = this.getNumericValueFromVariable(ixVar);
                if (ix !== undefined && ix !== null) {
                    const value = arr[ix];
                    if (value === undefined) {
                        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Index out of bounds for array ${arrayId}: ${ix}`, this.programLine);
                    }
                    return value;
                }
            }
        }
        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Could not get string from array element`, this.programLine);
    }
    getNumericValueFromArrayElement(param) {
        const str = this.getStringValueFromArrayElement(param);
        const num = Number(str);
        if (Number.isNaN(num)) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Expected a number, got string: ${str}`, this.programLine);
        }
        return num;
    }
    requireId(paramIx) {
        const param = this.programLine.params[paramIx];
        if (param.type !== ParamType_1.ParamType.Identifier) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Identifier expected: ${param.src}`, this.programLine);
        }
        return param.text;
    }
    requireExistingVariable(paramIx) {
        const varId = this.requireId(paramIx);
        const value = this.ptm.vars[varId];
        if (value === undefined) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Variable not found: ${varId}`, this.programLine);
        }
        return varId;
    }
    requireString(paramIx) {
        const param = this.programLine.params[paramIx];
        if (param.type === ParamType_1.ParamType.StringLiteral) {
            return param.text;
        }
        else if (param.type === ParamType_1.ParamType.CharLiteral) {
            return param.text;
        }
        else if (param.type === ParamType_1.ParamType.NumberLiteral) {
            return param.text;
        }
        else if (param.type === ParamType_1.ParamType.Identifier) {
            return this.getStringValueFromVariable(param.text);
        }
        else if (param.type === ParamType_1.ParamType.ArrayIxLiteral || param.type === ParamType_1.ParamType.ArrayIxVarIdentifier) {
            return this.getStringValueFromArrayElement(param);
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Could not get string from parameter`, this.programLine);
        }
    }
    requireNumber(paramIx) {
        const param = this.programLine.params[paramIx];
        if (param.type === ParamType_1.ParamType.StringLiteral) {
            if (Number.isNaN(param.number)) {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Could not convert string to number: "${param.text}"`, this.programLine);
            }
            else {
                return param.number;
            }
        }
        else if (param.type === ParamType_1.ParamType.CharLiteral) {
            return param.number;
        }
        else if (param.type === ParamType_1.ParamType.NumberLiteral) {
            return param.number;
        }
        else if (param.type === ParamType_1.ParamType.Identifier) {
            return this.getNumericValueFromVariable(param.text);
        }
        else if (param.type === ParamType_1.ParamType.ArrayIxLiteral || param.type === ParamType_1.ParamType.ArrayIxVarIdentifier) {
            return this.getNumericValueFromArrayElement(param);
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Could not get number from parameter`, this.programLine);
        }
    }
    requireBoolean(paramIx) {
        const value = this.requireNumber(paramIx);
        return value > 0;
    }
    requirePaletteIndex(paramIx) {
        const paletteIx = this.requireNumber(paramIx);
        if (paletteIx >= 0 && paletteIx < this.ptm.palette.size()) {
            return paletteIx;
        }
        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Palette index out of bounds: ${paletteIx}`, this.programLine);
    }
    requireTilesetIndex(paramIx) {
        const tilesetIx = this.requireNumber(paramIx);
        if (tilesetIx >= 0 && tilesetIx < this.ptm.tileset.size()) {
            return tilesetIx;
        }
        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Tileset index out of bounds: ${tilesetIx}`, this.programLine);
    }
    requireColor(paramIx) {
        const rgb = this.requireNumber(paramIx);
        const color = "#" + rgb.toString(16).padStart(6, "0");
        return color;
    }
    requireLabelTarget(paramIx) {
        const label = this.programLine.params[paramIx].text;
        const prgLineIx = this.program.labels[label];
        if (prgLineIx === undefined) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Label not found: ${label}`, this.programLine);
        }
        return prgLineIx;
    }
    isArray(paramIx) {
        const arrayId = this.programLine.params[paramIx].text;
        const arr = this.ptm.arrays[arrayId];
        return arr !== undefined;
    }
    requireExistingArray(paramIx) {
        const arrayId = this.programLine.params[paramIx].text;
        const arr = this.ptm.arrays[arrayId];
        if (arr === undefined) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array not found: ${arrayId}`, this.programLine);
        }
        return arr;
    }
    requireArraySubscript(paramIx) {
        const param = this.programLine.params[paramIx];
        if (param.arrayAccess && param.arrayAccess.arrayId) {
            let subscript = { arrayId: "", ix: -1 };
            if (param.type === ParamType_1.ParamType.ArrayIxLiteral && param.arrayAccess.ixLiteral !== null && param.arrayAccess.ixLiteral !== undefined) {
                subscript = {
                    arrayId: param.arrayAccess.arrayId,
                    ix: param.arrayAccess.ixLiteral
                };
            }
            else if (param.type === ParamType_1.ParamType.ArrayIxVarIdentifier && param.arrayAccess.ixVariable) {
                subscript = {
                    arrayId: param.arrayAccess.arrayId,
                    ix: this.getNumericValueFromVariable(param.arrayAccess.ixVariable)
                };
            }
            const arr = this.ptm.arrays[subscript.arrayId];
            const ix = subscript.ix;
            if (arr === undefined) {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array not found: ${subscript.arrayId}`, this.programLine);
            }
            const value = arr[ix];
            if (value === undefined) {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`Index out of bounds for array ${subscript.arrayId}: ${ix}`, this.programLine);
            }
            return subscript;
        }
        throw new PTM_RuntimeError_1.PTM_RuntimeError(`Array access expected: ${param.src}`, this.programLine);
    }
}
exports.Interpreter = Interpreter;

},{"../Errors/PTM_RuntimeError":3,"../Parser/ParamType":31}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.trace = false;
        this.varPrintStyle = "color:#0ff";
        this.cmdExecPrintStyle = "color:#ff0";
    }
    info(msg) {
        console.log(msg);
    }
    printVariableOrArray(id, value) {
        let msg = id + " = %c";
        if (Array.isArray(value)) {
            msg += "[";
            for (let i = 0; i < value.length; i++) {
                msg += `"${value[i]}"`;
                if (i < value.length - 1) {
                    msg += ", ";
                }
            }
            msg += "]";
        }
        else {
            msg += value;
        }
        console.log(msg, this.varPrintStyle);
    }
    printCommandExecution(programLine) {
        if (this.trace) {
            console.log(` ${programLine.lineNr}: %c${programLine.src}`, this.cmdExecPrintStyle);
        }
    }
}
exports.Logger = Logger;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopStack = exports.Loop = void 0;
class Loop {
    constructor() {
        this.lineIxBegin = 0;
        this.varId = "";
        this.current = 0;
        this.first = 0;
        this.last = 0;
        this.step = 0;
        this.isArray = false;
        this.arrayId = "";
        this.iterationVariable = "";
    }
}
exports.Loop = Loop;
class LoopStack {
    constructor() {
        this.loops = [];
    }
    push(loop) {
        this.loops.push(loop);
    }
    pop() {
        return this.loops.pop();
    }
    top() {
        if (this.loops.length > 0) {
            return this.loops[this.loops.length - 1];
        }
        else {
            return undefined;
        }
    }
    isEmpty() {
        return this.loops.length === 0;
    }
    clear() {
        this.loops = [];
    }
}
exports.LoopStack = LoopStack;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const main_1 = require("./main");
const PTM_RuntimeError_1 = require("./Errors/PTM_RuntimeError");
const Parser_1 = require("./Parser/Parser");
const Commands_1 = require("./Interpreter/Commands");
const Interpreter_1 = require("./Interpreter/Interpreter");
const Palette_1 = require("./Graphics/Palette");
const Tileset_1 = require("./Graphics/Tileset");
const Display_1 = require("./Graphics/Display");
const Cursor_1 = require("./Graphics/Cursor");
const TileSeq_1 = require("./Graphics/TileSeq");
const DefaultTileset_1 = require("./Graphics/DefaultTileset");
const LoopStack_1 = require("./Interpreter/LoopStack");
const CallStack_1 = require("./Interpreter/CallStack");
const Logger_1 = require("./Interpreter/Logger");
const DefaultPalette_1 = require("./Graphics/DefaultPalette");
const Comparison_1 = require("./Interpreter/Comparison");
const ProgramLineType_1 = require("./Parser/ProgramLineType");
const IfStack_1 = require("./Interpreter/IfStack");
const FmtStringPrinter_1 = require("./Interpreter/FmtStringPrinter");
const KeyboardInput_1 = require("./Input/KeyboardInput");
const Perfmon_1 = require("./Util/Perfmon");
document.addEventListener("DOMContentLoaded", main_1.PTM_Main);
class PTM {
    constructor(displayElement, srcPtml) {
        this.animationInterval = 400;
        // Initialize objects
        this.displayElement = displayElement;
        this.display = null;
        this.log = new Logger_1.Logger();
        this.stopRequested = false;
        this.cycleCounter = 0;
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter_1.Interpreter(this, this.program);
        this.commands = new Commands_1.Commands(this, this.intp);
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.pauseCycles = 0;
        this.callStack = new CallStack_1.CallStack();
        this.loopStack = new LoopStack_1.LoopStack();
        this.ifStack = new IfStack_1.IfStack();
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette_1.Palette();
        this.tileset = new Tileset_1.Tileset();
        this.cursor = null;
        this.currentTile = new TileSeq_1.TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;
        this.stringFmt = new FmtStringPrinter_1.FmtStringPrinter(this);
        this.keyboard = new KeyboardInput_1.KeyboardInput(this);
        // Configure defaults
        DefaultPalette_1.DefaultPalette.init(this.palette);
        DefaultTileset_1.DefaultTileset.init(this.tileset);
        // Begin program execution
        this.cycleExecHandle = this.start();
    }
    start() {
        this.log.info("Machine running...");
        return window.requestAnimationFrame(() => this.cycle());
    }
    cycle() {
        const perfmon = new Perfmon_1.Perfmon();
        if (this.pauseCycles > 0) {
            this.pauseCycles--;
        }
        else {
            if (this.programPtr >= this.program.length()) {
                this.stop("Execution pointer past end of script");
            }
            else {
                this.currentLine = this.program.lines[this.programPtr];
                try {
                    this.commands.execute(this.currentLine);
                    if (!this.branching) {
                        this.programPtr++;
                    }
                    else {
                        this.branching = false;
                    }
                }
                catch (e) {
                    this.stop("Runtime error");
                    throw e;
                }
            }
        }
        this.cycleCounter++;
        if (this.cycleCounter >= Number.MAX_SAFE_INTEGER) {
            this.cycleCounter = 0;
        }
        perfmon.stopThenPrint();
        if (!this.stopRequested) {
            window.requestAnimationFrame(() => this.cycle());
        }
    }
    stop(reason) {
        this.stopRequested = true;
        window.cancelAnimationFrame(this.cycleExecHandle);
        let msg = "Machine stopped\nReason: ";
        if (reason) {
            this.keepVsyncAfterStopping();
            msg += reason;
        }
        else {
            msg += "Manual stop request";
        }
        console.log(msg);
    }
    keepVsyncAfterStopping() {
        if (this.display) {
            this.display.update();
        }
        window.requestAnimationFrame(() => this.keepVsyncAfterStopping());
    }
    reset() {
        var _a;
        this.log.info("Machine reset");
        this.stopRequested = false;
        this.cycleCounter = 0;
        this.programPtr = 0;
        this.branching = true;
        (_a = this.display) === null || _a === void 0 ? void 0 : _a.reset();
        if (this.display && this.cursor) {
            this.cursor.reset(this.display.getDefaultBuffer());
        }
        this.callStack.clear();
        this.loopStack.clear();
        this.vars = {};
        this.arrays = {};
        this.pauseCycles = 0;
        this.currentTile = new TileSeq_1.TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;
        DefaultPalette_1.DefaultPalette.init(this.palette);
        DefaultTileset_1.DefaultTileset.init(this.tileset);
    }
    createDisplay(width, height, hStretch, vStretch, defaultBufLayers) {
        if (this.display) {
            this.display.reset();
            if (this.cursor) {
                this.cursor.set(this.display.getDefaultBuffer(), 0, 0, 0);
            }
        }
        else {
            this.display = new Display_1.Display(this.displayElement, width, height, hStretch, vStretch, defaultBufLayers, this.palette, this.tileset, this.animationInterval);
            this.cursor = new Cursor_1.Cursor(this.display.getDefaultBuffer());
        }
    }
    gotoSubroutine(ixProgramLine) {
        this.programPtr = ixProgramLine;
        this.branching = true;
    }
    callSubroutine(ixProgramLine) {
        this.callStack.push(this.programPtr + 1);
        this.programPtr = ixProgramLine;
        this.branching = true;
    }
    returnFromSubroutine() {
        if (!this.callStack.isEmpty()) {
            this.programPtr = this.callStack.pop();
            this.branching = true;
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError("Call stack is empty", this.currentLine);
        }
    }
    setVar(id, value) {
        this.vars[id] = value.toString();
    }
    pause(cycles) {
        this.pauseCycles = cycles;
    }
    printFmtTileStringAtCursorPos(fmt) {
        if (this.cursor && this.display) {
            this.stringFmt.print(fmt, this.cursor, this.currentTextFgc, this.currentTextBgc, this.currentTile.transparent);
            if (this.stringFmt.error) {
                throw new PTM_RuntimeError_1.PTM_RuntimeError(`${this.stringFmt.error}: ${fmt}`, this.currentLine);
            }
        }
    }
    printRawTileStringAtCursorPos(str) {
        if (this.cursor && this.display) {
            this.cursor.buffer.setTileString(str, this.cursor, this.currentTextFgc, this.currentTextBgc, this.currentTile.transparent);
        }
    }
    beginLoop(varId, first, last, step) {
        if (step === 0) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError("Invalid loop increment: 0", this.currentLine);
        }
        this.vars[varId] = first.toString();
        const loop = new LoopStack_1.Loop();
        loop.isArray = false;
        loop.lineIxBegin = this.programPtr + 1;
        loop.varId = varId;
        loop.current = first;
        loop.first = first;
        loop.last = last;
        loop.step = step;
        this.loopStack.push(loop);
    }
    beginArrayLoop(arr, arrId, iterVarId) {
        if (arr.length > 0) {
            this.vars[iterVarId] = arr[0];
        }
        const loop = new LoopStack_1.Loop();
        loop.isArray = true;
        loop.lineIxBegin = this.programPtr + 1;
        loop.arrayId = arrId;
        loop.iterationVariable = iterVarId;
        loop.current = 0;
        loop.first = 0;
        loop.last = arr.length - 1;
        loop.step = 1;
        this.loopStack.push(loop);
    }
    endLoop() {
        if (this.loopStack.isEmpty()) {
            return;
        }
        const loop = this.loopStack.top();
        if (!loop) {
            throw new PTM_RuntimeError_1.PTM_RuntimeError("Loop stack is empty", this.currentLine);
        }
        if (loop.isArray) {
            if (loop.current >= loop.last) { // Array loop ended
                this.loopStack.pop();
                return;
            }
            // Next array element
            loop.current++;
            const arr = this.arrays[loop.arrayId];
            this.vars[loop.iterationVariable] = arr[loop.current];
        }
        else {
            const nextValue = loop.current + loop.step;
            if (loop.step > 0) {
                if (nextValue > loop.last) { // Loop ended
                    this.loopStack.pop();
                    return;
                }
            }
            else if (loop.step < 0) {
                if (nextValue < loop.last) { // Loop ended
                    this.loopStack.pop();
                    return;
                }
            }
            // Next iteration
            loop.current = nextValue;
            this.vars[loop.varId] = nextValue.toString();
        }
        this.programPtr = loop.lineIxBegin;
        this.branching = true;
    }
    abortLoop() {
        if (this.loopStack.isEmpty()) {
            return;
        }
        this.loopStack.pop();
        let endForPtr = -1;
        for (let i = this.programPtr; i < this.program.length(); i++) {
            const line = this.program.lines[i];
            if (line.type === ProgramLineType_1.ProgramLineType.EndFor) {
                endForPtr = i;
                break;
            }
        }
        this.programPtr = endForPtr + 1;
        this.branching = true;
    }
    skipLoopIteration() {
        this.endLoop();
    }
    beginIfBlock(cmp, a, b) {
        if (cmp === Comparison_1.Comparison.Equal) {
            if (a == b) {
                return;
            }
            else {
                this.gotoMatchingEndIf();
            }
        }
        else if (cmp === Comparison_1.Comparison.NotEqual) {
            if (a != b) {
                return;
            }
            else {
                this.gotoMatchingEndIf();
            }
        }
        else {
            const numA = Number(a);
            if (Number.isNaN(numA))
                return;
            const numB = Number(b);
            if (Number.isNaN(numB))
                return;
            if (cmp === Comparison_1.Comparison.Greater) {
                if (numA > numB) {
                    return;
                }
                else {
                    this.gotoMatchingEndIf();
                }
            }
            else if (cmp === Comparison_1.Comparison.GreaterOrEqual) {
                if (numA >= numB) {
                    return;
                }
                else {
                    this.gotoMatchingEndIf();
                }
            }
            else if (cmp === Comparison_1.Comparison.Lesser) {
                if (numA < numB) {
                    return;
                }
                else {
                    this.gotoMatchingEndIf();
                }
            }
            else if (cmp === Comparison_1.Comparison.LesserOrEqual) {
                if (numA <= numB) {
                    return;
                }
                else {
                    this.gotoMatchingEndIf();
                }
            }
        }
    }
    gotoMatchingEndIf() {
        let endIfPtr = -1;
        for (let i = this.programPtr; i < this.program.length(); i++) {
            const line = this.program.lines[i];
            if (line.type === ProgramLineType_1.ProgramLineType.If) {
                this.ifStack.push(i);
            }
            else if (line.type === ProgramLineType_1.ProgramLineType.EndIf) {
                if (this.ifStack.isEmpty()) {
                    endIfPtr = i;
                    break;
                }
                else {
                    this.ifStack.pop();
                    if (this.ifStack.isEmpty()) {
                        endIfPtr = i;
                        break;
                    }
                }
            }
        }
        this.programPtr = endIfPtr + 1;
        this.branching = true;
    }
}
exports.PTM = PTM;

},{"./Errors/PTM_RuntimeError":3,"./Graphics/Cursor":5,"./Graphics/DefaultPalette":6,"./Graphics/DefaultTileset":7,"./Graphics/Display":8,"./Graphics/Palette":10,"./Graphics/TileSeq":15,"./Graphics/Tileset":16,"./Input/KeyboardInput":18,"./Interpreter/CallStack":19,"./Interpreter/Commands":20,"./Interpreter/Comparison":21,"./Interpreter/FmtStringPrinter":22,"./Interpreter/IfStack":23,"./Interpreter/Interpreter":24,"./Interpreter/Logger":25,"./Interpreter/LoopStack":26,"./Parser/Parser":32,"./Parser/ProgramLineType":35,"./Util/Perfmon":36,"./main":37}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTime = void 0;
var ExecutionTime;
(function (ExecutionTime) {
    ExecutionTime["Undefined"] = "Undefined";
    ExecutionTime["CompileTime"] = "CompileTime";
    ExecutionTime["RunTime"] = "RunTime";
})(ExecutionTime = exports.ExecutionTime || (exports.ExecutionTime = {}));

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberBase = void 0;
var NumberBase;
(function (NumberBase) {
    NumberBase["None"] = "None";
    NumberBase["Decimal"] = "Decimal";
    NumberBase["Hexadecimal"] = "Hexadecimal";
    NumberBase["Binary"] = "Binary";
})(NumberBase = exports.NumberBase || (exports.NumberBase = {}));

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const PTM_ParseError_1 = require("../Errors/PTM_ParseError");
const Interpreter_1 = require("../Interpreter/Interpreter");
const NumberBase_1 = require("./NumberBase");
const ParamType_1 = require("./ParamType");
class Param {
    constructor(programLine, src) {
        this.numericBase = NumberBase_1.NumberBase.None;
        this.numericSign = "";
        this.programLine = programLine;
        this.src = src;
        this.text = src;
        this.arrayAccess = null;
        this.type = this.parseType(src);
        this.text = this.maybeTransformText();
        this.number = this.tryParseNumber();
    }
    parseType(src) {
        if (src.length > 1 && (src[0] === "-" || src[0] === "+")) {
            this.numericSign = src[0];
            src = src.substring(1);
        }
        const srcPrefix = src.length > 2 ? src.substring(0, 2).toUpperCase() : "";
        if (src[0] === Param.StringLitDelimiter && src[src.length - 1] === Param.StringLitDelimiter) {
            return ParamType_1.ParamType.StringLiteral;
        }
        else if (src[0] === Param.CharLitDelimiter && src[src.length - 1] === Param.CharLitDelimiter) {
            return ParamType_1.ParamType.CharLiteral;
        }
        else if (srcPrefix === Param.HexPrefix) {
            this.numericBase = NumberBase_1.NumberBase.Hexadecimal;
            return ParamType_1.ParamType.NumberLiteral;
        }
        else if (srcPrefix === Param.BinPrefix) {
            this.numericBase = NumberBase_1.NumberBase.Binary;
            return ParamType_1.ParamType.NumberLiteral;
        }
        else if (Interpreter_1.Interpreter.isValidIdentifier(src)) {
            return ParamType_1.ParamType.Identifier;
        }
        else if (src.match(/^[0-9]*$/)) {
            this.numericBase = NumberBase_1.NumberBase.Decimal;
            return ParamType_1.ParamType.NumberLiteral;
        }
        else if (src[0].match(/[a-z]/i)) {
            const ixLeftBrace = src.indexOf(Param.ArrayLeftBrace);
            const ixRightBrace = src.indexOf(Param.ArrayRightBrace);
            if (ixLeftBrace > 0 && ixRightBrace > ixLeftBrace + 1) {
                const id = src.substring(0, ixLeftBrace);
                const subscript = src.substring(ixLeftBrace + 1, ixRightBrace);
                if (Interpreter_1.Interpreter.isValidIdentifier(subscript)) {
                    this.arrayAccess = {
                        arrayId: id,
                        ixLiteral: null,
                        ixVariable: subscript
                    };
                    return ParamType_1.ParamType.ArrayIxVarIdentifier;
                }
                else {
                    const index = Number(subscript.toUpperCase().replace(Param.HexPrefix, "0x").replace(Param.BinPrefix, "0b"));
                    if (Number.isNaN(index) || index < 0) {
                        throw new PTM_ParseError_1.PTM_ParseError(`Invalid array subscript: ${subscript}`, this.programLine);
                    }
                    this.arrayAccess = {
                        arrayId: id,
                        ixLiteral: index,
                        ixVariable: null
                    };
                    return ParamType_1.ParamType.ArrayIxLiteral;
                }
            }
        }
        throw new PTM_ParseError_1.PTM_ParseError(`Syntax error: ${src}`, this.programLine);
    }
    maybeTransformText() {
        if (this.type === ParamType_1.ParamType.StringLiteral) {
            return this.unenclose(this.text);
        }
        else if (this.type === ParamType_1.ParamType.CharLiteral) {
            if (this.text.length === 3) {
                const char = this.unenclose(this.text);
                return char.charCodeAt(0).toString();
            }
            else {
                throw new PTM_ParseError_1.PTM_ParseError(`Invalid character literal: ${this.text}`, this.programLine);
            }
        }
        else if (this.type == ParamType_1.ParamType.NumberLiteral) {
            return this.tryParseNumber().toString();
        }
        return this.text;
    }
    unenclose(str) {
        if (str.length > 2) {
            return str.substring(1, this.text.length - 1);
        }
        else {
            return "";
        }
    }
    tryParseNumber() {
        let num = NaN;
        let str = this.text.toUpperCase().replace("-", "").replace("+", "");
        if (this.type === ParamType_1.ParamType.NumberLiteral) {
            if (this.numericBase == NumberBase_1.NumberBase.Hexadecimal) {
                str = str.replace(Param.HexPrefix, "0x");
                num = Number(str);
            }
            else if (this.numericBase == NumberBase_1.NumberBase.Binary) {
                str = str.replace(Param.BinPrefix, "0b");
                num = Number(str);
            }
            else {
                num = Number(str);
            }
        }
        else if (this.type === ParamType_1.ParamType.CharLiteral) {
            num = Number(this.text);
        }
        else if (this.type === ParamType_1.ParamType.StringLiteral) {
            num = Number(this.text);
        }
        if (this.type !== ParamType_1.ParamType.StringLiteral && this.numericSign === "-") {
            num = num * -1;
        }
        return num;
    }
}
exports.Param = Param;
Param.StringLitDelimiter = "\"";
Param.CharLitDelimiter = "'";
Param.HexPrefix = "&H";
Param.BinPrefix = "&B";
Param.ArrayLeftBrace = "[";
Param.ArrayRightBrace = "]";

},{"../Errors/PTM_ParseError":2,"../Interpreter/Interpreter":24,"./NumberBase":29,"./ParamType":31}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = void 0;
var ParamType;
(function (ParamType) {
    ParamType["NumberLiteral"] = "NumberLiteral";
    ParamType["CharLiteral"] = "CharLiteral";
    ParamType["StringLiteral"] = "StringLiteral";
    ParamType["Identifier"] = "Identifier";
    ParamType["ArrayIxLiteral"] = "ArrayIxLiteral";
    ParamType["ArrayIxVarIdentifier"] = "ArrayIxVarIdentifier";
})(ParamType = exports.ParamType || (exports.ParamType = {}));

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const PTM_ParseError_1 = require("../Errors/PTM_ParseError");
const ExecutionTime_1 = require("./ExecutionTime");
const Param_1 = require("./Param");
const Program_1 = require("./Program");
const ProgramLine_1 = require("./ProgramLine");
const ProgramLineType_1 = require("./ProgramLineType");
class Parser {
    constructor(ptm, srcPtml) {
        this.crlf = "\n";
        this.ptm = ptm;
        this.srcPtml = srcPtml;
        this.program = new Program_1.Program();
    }
    parse() {
        this.ptm.log.info("Parse/compile started");
        this.program.lines = [];
        let srcLineNr = 0;
        let actualLineIndex = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            srcLineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, srcLineNr);
            if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Command ||
                newPrgLine.type === ProgramLineType_1.ProgramLineType.If ||
                newPrgLine.type === ProgramLineType_1.ProgramLineType.EndIf ||
                newPrgLine.type === ProgramLineType_1.ProgramLineType.EndFor) {
                if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.RunTime) {
                    this.program.addLine(newPrgLine);
                    actualLineIndex++;
                }
                else if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.CompileTime) {
                    this.ptm.commands.execute(newPrgLine);
                }
                else if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.Undefined) {
                    throw new PTM_ParseError_1.PTM_ParseError("Could not determine execution time for this line", newPrgLine);
                }
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Label) {
                const newLabel = newPrgLine.src;
                for (let existingLabel in this.program.labels) {
                    if (newLabel === existingLabel) {
                        throw new PTM_ParseError_1.PTM_ParseError(`Duplicate label: ${newLabel}`, newPrgLine);
                    }
                }
                this.program.addLabel(newLabel, actualLineIndex);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Undefined) {
                throw new PTM_ParseError_1.PTM_ParseError("Could not determine type of this line", newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });
        this.ptm.log.info("Parse/compile finished normally");
        return this.program;
    }
    parseSrcLine(srcLine, lineNr) {
        const line = new ProgramLine_1.ProgramLine(srcLine, lineNr);
        if (this.isBlank(line.src) || this.isComment(line.src)) {
            line.type = ProgramLineType_1.ProgramLineType.Ignore;
        }
        else if (line.src.trim().endsWith(":")) {
            line.type = ProgramLineType_1.ProgramLineType.Label;
            line.src = line.src.substring(0, line.src.length - 1);
        }
        else if (line.src.trim().toUpperCase().startsWith("IF.")) {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType_1.ProgramLineType.If;
        }
        else if (line.src.trim().toUpperCase() === "ENDIF") {
            line.cmd = "ENDIF";
            line.type = ProgramLineType_1.ProgramLineType.EndIf;
        }
        else if (line.src.trim().toUpperCase() === "NEXT") {
            line.cmd = "NEXT";
            line.type = ProgramLineType_1.ProgramLineType.EndFor;
        }
        else {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType_1.ProgramLineType.Command;
        }
        line.execTime = this.determineExecutionTime(line.cmd);
        return line;
    }
    extractCommand(line) {
        let cmdName = "";
        const src = line.src.trim();
        const ixFirstSpace = src.indexOf(" ");
        if (ixFirstSpace >= 0) {
            cmdName = src.substring(0, ixFirstSpace).trim();
        }
        else {
            cmdName = src;
        }
        return cmdName.toUpperCase();
    }
    extractParams(line) {
        const src = line.src.trim();
        const ixFirstSpace = src.indexOf(" ");
        if (ixFirstSpace < 0) {
            return [];
        }
        let params = [];
        const paramString = src.substring(ixFirstSpace);
        const paramList = this.splitParamString(paramString);
        paramList.forEach(rawParam => {
            const param = new Param_1.Param(line, rawParam);
            params.push(param);
        });
        return params;
    }
    splitParamString(paramString) {
        let params = [];
        let quote = false;
        let param = "";
        for (let i = 0; i < paramString.length; i++) {
            const ch = paramString[i];
            if (ch == '\"') {
                quote = !quote;
                param += ch;
                if (!quote && i == paramString.length - 1) {
                    params.push(param.trim());
                    param = "";
                }
            }
            else if (!quote && ch == ',' || i == paramString.length - 1) {
                if (ch != ',')
                    param += ch;
                params.push(param.trim());
                param = "";
            }
            else {
                param += ch;
            }
        }
        return params;
    }
    determineExecutionTime(cmd) {
        if (cmd === "DATA") {
            return ExecutionTime_1.ExecutionTime.CompileTime;
        }
        else {
            return ExecutionTime_1.ExecutionTime.RunTime;
        }
    }
    isBlank(src) {
        return src.trim() === "";
    }
    isComment(src) {
        return src.trim().startsWith("#");
    }
}
exports.Parser = Parser;

},{"../Errors/PTM_ParseError":2,"./ExecutionTime":28,"./Param":30,"./Program":33,"./ProgramLine":34,"./ProgramLineType":35}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
class Program {
    constructor() {
        this.lines = [];
        this.labels = {};
    }
    addLine(line) {
        this.lines.push(line);
    }
    addLabel(name, lineIx) {
        this.labels[name] = lineIx;
    }
    length() {
        return this.lines.length;
    }
}
exports.Program = Program;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLine = void 0;
const ProgramLineType_1 = require("./ProgramLineType");
const ExecutionTime_1 = require("./ExecutionTime");
class ProgramLine {
    constructor(src, lineNr) {
        this.src = src.trim();
        this.lineNr = lineNr;
        this.type = ProgramLineType_1.ProgramLineType.Undefined;
        this.execTime = ExecutionTime_1.ExecutionTime.Undefined;
        this.cmd = null;
        this.params = [];
    }
    toString() {
        return this.src;
    }
}
exports.ProgramLine = ProgramLine;

},{"./ExecutionTime":28,"./ProgramLineType":35}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLineType = void 0;
var ProgramLineType;
(function (ProgramLineType) {
    ProgramLineType["Undefined"] = "Undefined";
    ProgramLineType["Ignore"] = "Ignore";
    ProgramLineType["Command"] = "Command";
    ProgramLineType["Label"] = "Label";
    ProgramLineType["If"] = "If";
    ProgramLineType["EndIf"] = "EndIf";
    ProgramLineType["EndFor"] = "EndFor";
})(ProgramLineType = exports.ProgramLineType || (exports.ProgramLineType = {}));

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfmon = void 0;
class Perfmon {
    constructor() {
        this.startTimeMs = 0;
        this.endTimeMs = 0;
        this.timeDiffMs = 0;
        this.start();
    }
    start() {
        this.startTimeMs = performance.now();
        return this.startTimeMs;
    }
    stop() {
        this.endTimeMs = performance.now();
        this.timeDiffMs = this.endTimeMs - this.startTimeMs;
        return this.timeDiffMs;
    }
    stopThenPrint() {
        const msTimeSpent = this.stop();
        const lastMsTimeSpent = window.PTM_PerfmonMs;
        if (lastMsTimeSpent === undefined || msTimeSpent > lastMsTimeSpent) {
            window.PTM_PerfmonMs = msTimeSpent;
            console.log("Cycle max time ms: " + msTimeSpent);
        }
    }
}
exports.Perfmon = Perfmon;

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM_Main = void 0;
const PTM_InitializationError_1 = require("./Errors/PTM_InitializationError");
const PTM_1 = require("./PTM");
function PTM_Main() {
    console.log("%c" +
        "======================================================\n" +
        "      Welcome to the Programmable Tile Machine!       \n" +
        "  Developed by Fernando Aires Castello (C) 2022-2023  \n" +
        "======================================================", "color: #0f0");
    let ptml = "";
    const ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement) {
        if (ptmlElement.textContent) {
            ptml = ptmlElement.textContent;
            console.log("PTML code loaded from script tag (inline code)");
        }
        else if (ptmlElement.src) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", ptmlElement.src);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    ptml = xhr.responseText;
                    console.log(`PTML code loaded from script tag (external file: ${ptmlElement.src})`);
                }
                else {
                    throw new PTM_InitializationError_1.PTM_InitializationError(`Unable to load PTML code from file: ${ptmlElement.src}`);
                }
            };
            xhr.send();
        }
        else {
            throw new PTM_InitializationError_1.PTM_InitializationError("Unable to load PTML code from script tag");
        }
    }
    else {
        throw new PTM_InitializationError_1.PTM_InitializationError("PTML script tag not found");
    }
    const displayElement = document.getElementById("display");
    if (!displayElement) {
        throw new PTM_InitializationError_1.PTM_InitializationError("Display element not found");
    }
    console.log("Display element found");
    window.PTM = new PTM_1.PTM(displayElement, ptml);
}
exports.PTM_Main = PTM_Main;

},{"./Errors/PTM_InitializationError":1,"./PTM":27}]},{},[27]);
