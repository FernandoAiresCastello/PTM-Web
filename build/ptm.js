(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
const CanvasPoint_1 = require("./CanvasPoint");
class Display {
    constructor(parentElement, bufWidth, bufHeight, pixelWidth, pixelHeight) {
        this.pixelBufWidth = bufWidth;
        this.pixelBufHeight = bufHeight;
        this.pixelBufSize = bufWidth * bufHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.canvasWidth = bufWidth * pixelWidth;
        this.canvasHeight = bufHeight * pixelHeight;
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.canvasWidth;
        this.canvasElement.height = this.canvasHeight;
        parentElement.append(this.canvasElement);
        let ctx = this.canvasElement.getContext("2d");
        if (ctx === null) {
            throw new Error("Unable to create CanvasRenderingContext2D");
        }
        this.canvas = ctx;
        this.canvas.imageSmoothingEnabled = false;
        this.canvas.imageSmoothingQuality = 'low';
        this.pixelPositions = this.calculatePixelPositions();
        this.pixels = [];
        this.clearPixels('#000000');
        this.update();
    }
    clearPixels(rgb) {
        for (let pos = 0; pos < this.pixelBufSize; pos++) {
            this.putPixelRgbLinear(pos, rgb);
        }
    }
    putPixelRgbLinear(pos, rgb) {
        this.pixels[pos] = rgb;
    }
    putPixelRgb(x, y, rgb) {
        this.pixels[y * this.pixelBufWidth + x] = rgb;
    }
    update() {
        for (let i = 0; i < this.pixelPositions.length; i++) {
            const pos = this.pixelPositions[i];
            this.canvas.fillStyle = this.pixels[pos.index];
            this.canvas.fillRect(pos.x, pos.y, this.pixelWidth, this.pixelHeight);
        }
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
    // === Frame rendering tests ===
    test1() {
        this.clearPixels('#ffff00');
        this.putPixelRgb(0, 0, '#ff0000');
        for (let x = 0; x < this.pixelBufWidth; x++) {
            this.putPixelRgb(x, 0, '#ff0000');
            this.putPixelRgb(x, this.pixelBufHeight - 1, '#ff0000');
        }
        for (let y = 0; y < this.pixelBufHeight; y++) {
            this.putPixelRgb(0, y, '#ff0000');
            this.putPixelRgb(this.pixelBufWidth - 1, y, '#ff0000');
        }
        this.update();
    }
    test2() {
        for (let pos = 0; pos < this.pixelBufSize; pos++) {
            let color = '';
            const rnd = Math.floor(Math.random() * 3);
            if (rnd == 0)
                color = '#ff0000';
            else if (rnd == 1)
                color = '#00ff00';
            else if (rnd == 2)
                color = '#0000ff';
            this.putPixelRgbLinear(pos, color);
        }
        this.update();
    }
}
exports.Display = Display;

},{"./CanvasPoint":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const Command_1 = require("../Parser/Command");
const CommandValidator_1 = require("./CommandValidator");
class CommandExecutor {
    constructor(ptm) {
        this.ptm = ptm;
        this.params = [];
        this.validator = new CommandValidator_1.CommandValidator();
        this.commandDict = {
            [Command_1.Command.Nop]: this.Nop,
            [Command_1.Command.Halt]: this.Halt,
            [Command_1.Command.Exit]: this.Exit,
            [Command_1.Command.Title]: this.Title,
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        this.validator.programLine = programLine;
        this.params = programLine.params;
        const impl = this.commandDict[cmd];
        impl();
    }
    Nop() {
        this.validator.argc(0);
        console.info("NOP executed");
    }
    Halt() {
        this.validator.argc(0);
        console.info("HALT executed");
    }
    Exit() {
        this.validator.argc(0);
        console.info("EXIT executed");
    }
    Title() {
        this.validator.argc(1);
        console.info(`TITLE executed with params: ${this.params}`);
    }
}
exports.CommandExecutor = CommandExecutor;

},{"../Parser/Command":7,"./CommandValidator":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
class CommandValidator {
    throwError(msg) {
        throw new Error(`${msg}\nSource line: ${this.programLine.line_nr} ${this.programLine.src}`);
    }
    argc(expectedArgc) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc && actualArgc !== expectedArgc) {
            this.throwError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`);
        }
    }
    argcMinMax(min, max) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            this.throwError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`);
        }
    }
}
exports.CommandValidator = CommandValidator;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PTM_1 = require("./PTM");
document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new Error("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new Error("Display element not found");
    }
    window.PTM = new PTM_1.PTM(displayElement, ptmlElement.textContent);
});

},{"./PTM":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const Parser_1 = require("./Parser/Parser");
const Display_1 = require("./Graphics/Display");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
class PTM {
    constructor(displayElement, srcPtml) {
        this.parser = new Parser_1.Parser(srcPtml);
        const program = this.parser.parse();
        this.cmdExec = new CommandExecutor_1.CommandExecutor(this);
        program.lines.forEach(line => {
            this.cmdExec.execute(line);
        });
        this.display = new Display_1.Display(displayElement, 256, 192, 3, 3);
    }
}
exports.PTM = PTM;

},{"./Graphics/Display":2,"./Interpreter/CommandExecutor":3,"./Parser/Parser":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command["Nop"] = "NOP";
    Command["Halt"] = "HALT";
    Command["Exit"] = "EXIT";
    Command["Title"] = "TITLE";
})(Command = exports.Command || (exports.Command = {}));

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Program_1 = require("./Program");
class Parser {
    constructor(srcPtml) {
        this.srcPtml = srcPtml;
        this.program = new Program_1.Program();
    }
    parse() {
        // TO DO: parse the this.srcPtml and build the AST into this.program.lines
        return this.program;
    }
}
exports.Parser = Parser;

},{"./Program":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
class Program {
    constructor() {
        this.lines = [];
    }
    addLine(line) {
        this.lines.push(line);
    }
}
exports.Program = Program;

},{}]},{},[5]);
