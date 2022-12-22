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
exports.Display = void 0;
const PTM_InitializationError_1 = require("../Errors/PTM_InitializationError");
const CanvasPoint_1 = require("./CanvasPoint");
class Display {
    constructor(parentElement, bufWidth, bufHeight, pixelWidth, pixelHeight, palette, tileset) {
        this.backColorIx = 0;
        this.pixelBufWidth = bufWidth;
        this.pixelBufHeight = bufHeight;
        this.pixelBufSize = bufWidth * bufHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.canvasWidth = bufWidth * pixelWidth;
        this.canvasHeight = bufHeight * pixelHeight;
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
exports.Display = Display;

},{"../Errors/PTM_InitializationError":1,"./CanvasPoint":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
    getPixelRowsAsNumbers() {
        let bytes = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            bytes.push(this.getPixelRowAsNumber(row));
        }
        return bytes;
    }
    getPixelRowAsNumber(pixelRow) {
        const binary = this.getPixelRowAsBinaryString(pixelRow);
        const rowPixels = Number.parseInt(binary, 2);
        return rowPixels;
    }
    getPixelRowAsBinaryString(pixelRow) {
        const bitIndex = pixelRow * PixelBlock.Width;
        let binary = "";
        for (let i = bitIndex; i < bitIndex + PixelBlock.Width; i++) {
            binary += this.pixels[i];
        }
        return binary;
    }
    getPixelRowsAsBinaryStrings() {
        let str = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            str.push(this.getPixelRowAsBinaryString(row));
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

},{}],8:[function(require,module,exports){
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
    set(ix, tile) {
        this.tiles[ix] = tile;
    }
    setPixelRow(ix, pixelRow, byte) {
        const tile = this.tiles[ix];
        const bitIndex = pixelRow * PixelBlock_1.PixelBlock.Width;
        let currentPixels = tile.pixels;
        let newPixels = "";
        const binaryRow = byte.toString(2).padStart(PixelBlock_1.PixelBlock.Width);
        for (let i = 0; i < currentPixels.length; i++) {
            if (i >= bitIndex && i < bitIndex + PixelBlock_1.PixelBlock.Width) {
                newPixels += binaryRow[i % PixelBlock_1.PixelBlock.Width];
            }
            else {
                newPixels += currentPixels[i];
            }
        }
        tile.pixels = newPixels;
    }
    get(ix) {
        return this.tiles[ix];
    }
    size() {
        return this.tiles.length;
    }
}
exports.Tileset = Tileset;

},{"./PixelBlock":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const Command_1 = require("../Parser/Command");
const Display_1 = require("../Graphics/Display");
class CommandExecutor {
    constructor(ptm, intp) {
        this.ptm = ptm;
        this.intp = intp;
        this.commandDict = this.initCommands();
    }
    initCommands() {
        return {
            [Command_1.Command.TEST]: this.TEST,
            [Command_1.Command.DBG]: this.DBG,
            [Command_1.Command.DATA]: this.DATA,
            [Command_1.Command.HALT]: this.HALT,
            [Command_1.Command.RESET]: this.RESET,
            [Command_1.Command.TITLE]: this.TITLE,
            [Command_1.Command.SCREEN]: this.SCREEN,
            [Command_1.Command.GOTO]: this.GOTO,
            [Command_1.Command.CALL]: this.CALL,
            [Command_1.Command.RET]: this.RET,
            [Command_1.Command.VAR]: this.VAR,
            [Command_1.Command.ARR_NEW]: this.ARR_NEW,
            [Command_1.Command.ARR_SET]: this.ARR_SET,
            [Command_1.Command.ARR_PUSH]: this.ARR_PUSH,
            [Command_1.Command.INC]: this.INC,
            [Command_1.Command.DEC]: this.DEC,
            [Command_1.Command.CLS]: this.CLS,
            [Command_1.Command.PAL]: this.PAL,
            [Command_1.Command.CHR]: this.CHR,
            [Command_1.Command.WCOL]: this.WCOL,
            [Command_1.Command.VSYNC]: this.VSYNC,
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.logExecution(programLine);
            this.intp.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction(this.ptm, this.intp);
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }
    TEST(ptm, intp) {
    }
    DBG(ptm, intp) {
        intp.argc(1);
        if (intp.isArray(0)) {
            const arrId = intp.arg(0).text;
            const arr = intp.requireExistingArray(0);
            ptm.logDebug(arrId, arr);
        }
        else {
            const varId = intp.arg(0).text;
            const value = intp.requireString(0);
            ptm.logDebug(varId, value);
        }
    }
    DATA(ptm, intp) {
    }
    HALT(ptm, intp) {
        intp.argc(0);
        ptm.stop("Halt requested");
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
        intp.argc(4);
        const width = intp.requireNumber(0);
        const height = intp.requireNumber(1);
        const hStretch = intp.requireNumber(2);
        const vStretch = intp.requireNumber(3);
        if (ptm.display) {
            ptm.display.reset();
        }
        else {
            ptm.display = new Display_1.Display(ptm.displayElement, width, height, hStretch, vStretch, ptm.palette, ptm.tileset);
        }
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
            ptm.display.clearToBackColor();
        }
    }
    WCOL(ptm, intp) {
        intp.argc(1);
        const ix = intp.requirePaletteIndex(0);
        if (ptm.display) {
            ptm.display.backColorIx = ix;
        }
    }
    VSYNC(ptm, intp) {
        intp.argc(0);
        if (ptm.display) {
            ptm.display.update();
        }
    }
}
exports.CommandExecutor = CommandExecutor;

},{"../Errors/PTM_RuntimeError":3,"../Graphics/Display":5,"../Parser/Command":12}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const Command_1 = require("../Parser/Command");
const ParamType_1 = require("../Parser/ParamType");
class Interpreter {
    constructor(ptm, program) {
        this.ptm = ptm;
        this.program = program;
    }
    static isValidIdentifier(id) {
        return id.match(/^[$A-Z_][0-9A-Z._$]*$/i) !== null;
    }
    static commandExists(cmd) {
        return Object.values(Command_1.Command).includes(cmd);
    }
    arg(paramIx) {
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
            return param.number;
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

},{"../Errors/PTM_RuntimeError":3,"../Parser/Command":12,"../Parser/ParamType":16}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const PTM_InitializationError_1 = require("./Errors/PTM_InitializationError");
const Parser_1 = require("./Parser/Parser");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
const Interpreter_1 = require("./Interpreter/Interpreter");
const PTM_RuntimeError_1 = require("./Errors/PTM_RuntimeError");
const Palette_1 = require("./Graphics/Palette");
const Tileset_1 = require("./Graphics/Tileset");
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c" +
        "=======================================================\n" +
        "  ~ Welcome to the PTM - Programmable Tile Machine! ~  \n" +
        "    Developed by: Fernando Aires Castello  (C) 2022    \n" +
        "=======================================================", "color:#0f0");
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new PTM_InitializationError_1.PTM_InitializationError("PTML script tag not found");
    }
    console.log("PTML script loaded");
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new PTM_InitializationError_1.PTM_InitializationError("Display element not found");
    }
    console.log("Display element found");
    window.PTM = new PTM(displayElement, ptmlElement.textContent);
});
class PTM {
    constructor(displayElement, srcPtml) {
        this.logDebugFormat = "color:#0ff";
        this.logExecFormat = "color:#ff0";
        this.trace = false;
        this.intervalLength = 1;
        this.displayElement = displayElement;
        this.display = null;
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter_1.Interpreter(this, this.program);
        this.executor = new CommandExecutor_1.CommandExecutor(this, this.intp);
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.callStack = [];
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette_1.Palette();
        this.tileset = new Tileset_1.Tileset();
        this.intervalId = this.start();
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
        return window.setInterval(() => this.cycle(), this.intervalLength);
    }
    cycle() {
        if (this.programPtr >= this.program.length()) {
            this.stop("Execution pointer past end of script");
        }
        else {
            this.currentLine = this.program.lines[this.programPtr];
            try {
                this.executor.execute(this.currentLine);
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
        window.clearInterval(this.intervalId);
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
}
exports.PTM = PTM;

},{"./Errors/PTM_InitializationError":1,"./Errors/PTM_RuntimeError":3,"./Graphics/Palette":6,"./Graphics/Tileset":8,"./Interpreter/CommandExecutor":9,"./Interpreter/Interpreter":10,"./Parser/Parser":17}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command["TEST"] = "TEST";
    Command["DBG"] = "DBG";
    Command["DATA"] = "DATA";
    Command["HALT"] = "HALT";
    Command["RESET"] = "RESET";
    Command["TITLE"] = "TITLE";
    Command["SCREEN"] = "SCREEN";
    Command["GOTO"] = "GOTO";
    Command["CALL"] = "CALL";
    Command["RET"] = "RET";
    Command["VAR"] = "VAR";
    Command["ARR_NEW"] = "ARR.NEW";
    Command["ARR_SET"] = "ARR.SET";
    Command["ARR_PUSH"] = "ARR.PUSH";
    Command["INC"] = "INC";
    Command["DEC"] = "DEC";
    Command["PAL"] = "PAL";
    Command["CHR"] = "CHR";
    Command["WCOL"] = "WCOL";
    Command["CLS"] = "CLS";
    Command["VSYNC"] = "VSYNC";
})(Command = exports.Command || (exports.Command = {}));

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTime = void 0;
var ExecutionTime;
(function (ExecutionTime) {
    ExecutionTime["Undefined"] = "Undefined";
    ExecutionTime["CompileTime"] = "CompileTime";
    ExecutionTime["RunTime"] = "RunTime";
})(ExecutionTime = exports.ExecutionTime || (exports.ExecutionTime = {}));

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
            num = this.text.charCodeAt(0);
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

},{"../Errors/PTM_ParseError":2,"../Interpreter/Interpreter":10,"./NumberBase":14,"./ParamType":16}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const PTM_ParseError_1 = require("../Errors/PTM_ParseError");
const Interpreter_1 = require("../Interpreter/Interpreter");
const Command_1 = require("./Command");
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
                    this.ptm.executor.execute(newPrgLine);
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
        cmdName = cmdName.toUpperCase();
        if (Interpreter_1.Interpreter.commandExists(cmdName)) {
            return cmdName;
        }
        else {
            throw new PTM_ParseError_1.PTM_ParseError(`Command not recognized: ${cmdName}`, line);
        }
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
        if (cmd === Command_1.Command.DATA) {
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

},{"../Errors/PTM_ParseError":2,"../Interpreter/Interpreter":10,"./Command":12,"./ExecutionTime":13,"./Param":15,"./Program":18,"./ProgramLine":19,"./ProgramLineType":20}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./ExecutionTime":13,"./ProgramLineType":20}],20:[function(require,module,exports){
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

},{}]},{},[11]);
