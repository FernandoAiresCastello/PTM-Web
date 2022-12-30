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
}
exports.Cursor = Cursor;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTileset = void 0;
class DefaultTileset {
    static init(chr) {
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
const DisplayBase_1 = require("./DisplayBase");
const TileBuffer_1 = require("./TileBuffer");
class Display {
    constructor(displayElement, width, height, hStretch, vStretch, defaultBufLayers, palette, tileset, animationInterval) {
        this.animationFrameIndex = 0;
        this.base = new DisplayBase_1.DisplayBase(displayElement, width, height, hStretch, vStretch, palette, tileset);
        this.buffers = [];
        this.createDefaultBuffer(defaultBufLayers);
        window.setInterval(this.advanceTileAnimation, animationInterval, this);
    }
    createDefaultBuffer(defaultBufLayers) {
        this.createNewBuffer("default", defaultBufLayers, this.base.cols, this.base.rows, 0, 0);
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
        this.base.reset();
        this.deleteAllBuffers();
        this.createDefaultBuffer(defaultBufLayers);
    }
    setBackColorIx(ix) {
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
        display.update();
    }
    drawTileFrame(tile, x, y, transparent) {
        this.base.drawTileFrame(tile, x, y, transparent);
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
exports.Display = Display;

},{"./DisplayBase":8,"./TileBuffer":12}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayBase = void 0;
const PTM_InitializationError_1 = require("../Errors/PTM_InitializationError");
const CanvasPoint_1 = require("./CanvasPoint");
const PixelBlock_1 = require("./PixelBlock");
class DisplayBase {
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
exports.DisplayBase = DisplayBase;

},{"../Errors/PTM_InitializationError":1,"./CanvasPoint":4,"./PixelBlock":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
class Palette {
    constructor() {
        this.colors = this.init(256, "#000000");
        this.set(0, "#000000");
        this.set(1, "#ffffff");
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
    setTileString(str, layer, x, y, fgc, bgc, transp) {
        for (let i = 0; i < str.length; i++) {
            const tile = new TileSeq_1.TileSeq();
            const ch = str.charCodeAt(i);
            tile.transparent = transp;
            tile.setSingle(ch, fgc, bgc);
            this.setTile(tile, layer, x + i, y);
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

},{"./TileBufferLayer":13,"./TileSeq":14,"./Viewport":16}],13:[function(require,module,exports){
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

},{"./TileSeq":14}],14:[function(require,module,exports){
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

},{"./Tile":11}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tileset = void 0;
const PixelBlock_1 = require("./PixelBlock");
class Tileset {
    constructor() {
        this.tiles = this.init(256);
    }
    init(numberOfTiles) {
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

},{"./PixelBlock":10}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
class Commands {
    constructor(ptm, intp) {
        this.ptm = ptm;
        this.intp = intp;
        this.commandDict = {
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
            ["PRINT.ADD"]: this.PRINT_ADD,
            ["FCOL"]: this.FCOL,
            ["BCOL"]: this.BCOL,
            ["COLOR"]: this.COLOR
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.logExecution(programLine);
            this.intp.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            if (commandFunction) {
                commandFunction(this.ptm, this.intp);
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
            ptm.logDebug(arrId, arr);
        }
        else {
            const varId = intp.getArg(0).text;
            const value = intp.requireString(0);
            ptm.logDebug(varId, value);
        }
    }
    DATA(ptm, intp) {
    }
    EXIT(ptm, intp) {
        intp.argc(0);
        ptm.stop("Exit requested");
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
        const hStretch = intp.requireNumber(2);
        const vStretch = intp.requireNumber(3);
        const defaultBufLayers = intp.requireNumber(4);
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
        ptm.vars[id] = intp.requireString(1);
    }
    ARR_NEW(ptm, intp) {
        const argc = intp.argcMinMax(1, 2);
        const arrayId = intp.requireId(0);
        let initialArrLen = 0;
        if (argc > 1) {
            initialArrLen = intp.requireNumber(1);
        }
        const arr = [];
        if (initialArrLen > 0) {
            for (let i = 0; i < initialArrLen; i++) {
                arr.push("");
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
        ptm.vars[varId] = (value + 1).toString();
    }
    DEC(ptm, intp) {
        intp.argc(1);
        const varId = intp.requireExistingVariable(0);
        const value = intp.requireNumber(0);
        ptm.vars[varId] = (value - 1).toString();
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
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.setTileString(text, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y, ptm.currentTextFgc, ptm.currentTextBgc, ptm.currentTile.transparent);
            ptm.cursor.x += text.length;
        }
    }
    PRINT_ADD(ptm, intp) {
        intp.argc(1);
        const text = intp.requireString(0);
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.overlapTileString(text, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y, ptm.currentTextFgc, ptm.currentTextBgc, ptm.currentTile.transparent);
            ptm.cursor.x += text.length;
        }
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
        intp.argc(2);
        const fgc = intp.requireNumber(0);
        const bgc = intp.requireNumber(1);
        ptm.currentTextFgc = fgc;
        ptm.currentTextBgc = bgc;
    }
}
exports.Commands = Commands;

},{"../Errors/PTM_RuntimeError":3}],18:[function(require,module,exports){
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
        if (actualArgc && actualArgc !== expectedArgc) {
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

},{"../Errors/PTM_RuntimeError":3,"../Parser/ParamType":23}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const Parser_1 = require("./Parser/Parser");
const Commands_1 = require("./Interpreter/Commands");
const Interpreter_1 = require("./Interpreter/Interpreter");
const PTM_RuntimeError_1 = require("./Errors/PTM_RuntimeError");
const Palette_1 = require("./Graphics/Palette");
const Tileset_1 = require("./Graphics/Tileset");
const Display_1 = require("./Graphics/Display");
const Cursor_1 = require("./Graphics/Cursor");
const TileSeq_1 = require("./Graphics/TileSeq");
const DefaultTileset_1 = require("./Graphics/DefaultTileset");
const main_1 = require("./main");
document.addEventListener("DOMContentLoaded", main_1.PTM_Main);
class PTM {
    constructor(displayElement, srcPtml) {
        this.logDebugFormat = "color:#0ff";
        this.logExecFormat = "color:#ff0";
        this.trace = false;
        this.cycleInterval = 1;
        this.animationInterval = 400;
        this.displayElement = displayElement;
        this.display = null;
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter_1.Interpreter(this, this.program);
        this.commands = new Commands_1.Commands(this, this.intp);
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.callStack = [];
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette_1.Palette();
        this.tileset = new Tileset_1.Tileset();
        DefaultTileset_1.DefaultTileset.init(this.tileset);
        this.cursor = null;
        this.currentTile = new TileSeq_1.TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;
        this.cycleIntervalId = this.start();
    }
    logInfo(msg) {
        console.log(msg);
    }
    logDebug(id, value) {
        let msg = "%c";
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
        console.log(msg, this.logDebugFormat);
    }
    logExecution(programLine) {
        if (this.trace) {
            console.log(` ${programLine.lineNr}: %c${programLine.src}`, this.logExecFormat);
        }
    }
    start() {
        this.logInfo("Interpreter started");
        return window.setInterval(() => this.cycle(), this.cycleInterval);
    }
    cycle() {
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
    stop(reason) {
        window.clearInterval(this.cycleIntervalId);
        let msg = "Interpreter exited";
        if (reason) {
            msg += `\nReason: ${reason}`;
        }
        console.log(msg);
    }
    reset() {
        var _a;
        this.logInfo("Machine reset");
        this.programPtr = 0;
        this.branching = true;
        (_a = this.display) === null || _a === void 0 ? void 0 : _a.reset();
        this.callStack = [];
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette_1.Palette();
        this.tileset = new Tileset_1.Tileset();
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
        if (this.callStack.length > 0) {
            this.programPtr = this.callStack.pop();
            this.branching = true;
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError("Call stack is empty", this.currentLine);
        }
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
}
exports.PTM = PTM;

},{"./Errors/PTM_RuntimeError":3,"./Graphics/Cursor":5,"./Graphics/DefaultTileset":6,"./Graphics/Display":7,"./Graphics/Palette":9,"./Graphics/TileSeq":14,"./Graphics/Tileset":15,"./Interpreter/Commands":17,"./Interpreter/Interpreter":18,"./Parser/Parser":24,"./main":28}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTime = void 0;
var ExecutionTime;
(function (ExecutionTime) {
    ExecutionTime["Undefined"] = "Undefined";
    ExecutionTime["CompileTime"] = "CompileTime";
    ExecutionTime["RunTime"] = "RunTime";
})(ExecutionTime = exports.ExecutionTime || (exports.ExecutionTime = {}));

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"../Errors/PTM_ParseError":2,"../Interpreter/Interpreter":18,"./NumberBase":21,"./ParamType":23}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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
        this.ptm.logInfo("Parse/compile started");
        this.program.lines = [];
        let srcLineNr = 0;
        let actualLineIndex = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            srcLineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, srcLineNr);
            if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Executable) {
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
                const label = newPrgLine.src;
                this.program.addLabel(label, actualLineIndex);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Undefined) {
                throw new PTM_ParseError_1.PTM_ParseError("Could not determine type of this line", newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });
        this.ptm.logInfo("Parse/compile finished normally");
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
        else {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType_1.ProgramLineType.Executable;
            line.execTime = this.determineExecutionTime(line.cmd);
        }
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

},{"../Errors/PTM_ParseError":2,"./ExecutionTime":20,"./Param":22,"./Program":25,"./ProgramLine":26,"./ProgramLineType":27}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./ExecutionTime":20,"./ProgramLineType":27}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLineType = void 0;
var ProgramLineType;
(function (ProgramLineType) {
    ProgramLineType["Undefined"] = "Undefined";
    ProgramLineType["Ignore"] = "Ignore";
    ProgramLineType["Executable"] = "Executable";
    ProgramLineType["Label"] = "Label";
})(ProgramLineType = exports.ProgramLineType || (exports.ProgramLineType = {}));

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM_Main = void 0;
const PTM_InitializationError_1 = require("./Errors/PTM_InitializationError");
const PTM_1 = require("./PTM");
function PTM_Main() {
    console.log("%c" +
        "==================================================\n" +
        "  Welcome to the PTM - Programmable Tile Machine! \n" +
        "  Developed by: Fernando Aires Castello  (C) 2022 \n" +
        "==================================================", "color:#0f0");
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

},{"./Errors/PTM_InitializationError":1,"./PTM":19}]},{},[19]);
