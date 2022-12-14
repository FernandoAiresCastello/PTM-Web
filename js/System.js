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
