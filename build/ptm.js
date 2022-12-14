(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
class Display {
    constructor(parentElement, width, height, pixelWidth, pixelHeight) {
        this.pixelBufWidth = width;
        this.pixelBufHeight = height;
        this.elementWidth = width * pixelWidth;
        this.elementHeight = height * pixelHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.elementWidth;
        this.canvasElement.height = this.elementHeight;
        parentElement.append(this.canvasElement);
        let ctx = this.canvasElement.getContext("2d");
        if (ctx === null) {
            throw new Error("Unable to create CanvasRenderingContext2D");
        }
        this.canvas = ctx;
        this.canvas.imageSmoothingEnabled = false;
        this.canvas.imageSmoothingQuality = 'low';
        this.imageData = this.canvas.getImageData(0, 0, this.elementWidth, this.elementHeight);
        this.pixels = [];
        this.clearPixels(0x000000);
        this.test();
    }
    test() {
        for (let i = 0; i < 1000; i++) {
            const x = Math.floor(Math.random() * this.pixelBufWidth);
            const y = Math.floor(Math.random() * this.pixelBufHeight);
            this.putPixelRgb(x, y, 0x00ff00);
        }
        this.update();
    }
    clearPixels(rgb) {
        for (let y = 0; y < this.elementHeight; y++) {
            for (let x = 0; x < this.elementWidth; x++) {
                this.putPixelRgb(x, y, rgb);
            }
        }
    }
    putPixelRgb(x, y, rgb) {
        this.pixels[y * this.elementWidth + x] = rgb;
    }
    update() {
        for (let y = 0; y < this.elementHeight; y++) {
            for (let py = 0; py < this.pixelHeight; py++) {
                const yOffset = (y * this.pixelHeight + py) * this.elementWidth;
                for (let x = 0; x < this.elementWidth; x++) {
                    for (let px = 0; px < this.pixelWidth; px++) {
                        let offset = yOffset + (x * this.pixelWidth + px);
                        const rgb = this.pixels[y * this.elementWidth + x];
                        this.imageData.data[offset * 4 + 0] = (rgb >> 16) & 0xff;
                        this.imageData.data[offset * 4 + 1] = (rgb >> 8) & 0xff;
                        this.imageData.data[offset * 4 + 2] = rgb & 0xff;
                        this.imageData.data[offset * 4 + 3] = 0xff;
                    }
                }
            }
        }
        this.canvas.putImageData(this.imageData, 0, 0);
    }
}
exports.Display = Display;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
class Machine {
    constructor() {
    }
}
exports.Machine = Machine;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("./System");
document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    let sys = new System_1.System(displayElement, ptmlElement.textContent);
});

},{"./System":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const Display_1 = require("./Display");
const Machine_1 = require("./Machine");
class System {
    constructor(displayElement, ptml) {
        this.ptml = ptml;
        this.ptm = new Machine_1.Machine();
        this.display = new Display_1.Display(displayElement, 256, 192, 3, 3);
    }
}
exports.System = System;

},{"./Display":1,"./Machine":2}]},{},[3]);
