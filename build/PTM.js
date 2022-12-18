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
            throw new PTM_InitializationError_1.PTM_InitializationError("Unable to create CanvasRenderingContext2D");
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

},{"../Errors/PTM_InitializationError":1,"./CanvasPoint":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const Command_1 = require("../Parser/Command");
const Display_1 = require("../Graphics/Display");
class CommandExecutor {
    constructor(ptm, validator) {
        this.ptm = ptm;
        this.validator = validator;
        this.commandDict = this.initCommands();
    }
    initCommands() {
        return {
            [Command_1.Command.NOP]: this.NOP,
            [Command_1.Command.TEST]: this.TEST,
            [Command_1.Command.DATA]: this.DATA,
            [Command_1.Command.HALT]: this.HALT,
            [Command_1.Command.RESET]: this.RESET,
            [Command_1.Command.TITLE]: this.TITLE,
            [Command_1.Command.SCREEN]: this.SCREEN,
            [Command_1.Command.VAR]: this.VAR,
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.log(` ${programLine.lineNr}: ${programLine.src}`);
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction({ ptm: this.ptm, validator: this.validator, param: programLine.params });
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }
    NOP(intp) {
        intp.validator.argc(0);
    }
    TEST(intp) {
    }
    DATA(intp) {
    }
    HALT(intp) {
        intp.validator.argc(0);
        intp.ptm.stop("Halt requested");
    }
    RESET(intp) {
        intp.validator.argc(0);
        intp.ptm.reset();
    }
    TITLE(intp) {
        intp.validator.argc(1);
        window.document.title = intp.param[0].text;
    }
    SCREEN(intp) {
        intp.validator.argc(4);
        const width = intp.param[0].number;
        const height = intp.param[1].number;
        const hStretch = intp.param[2].number;
        const vStretch = intp.param[3].number;
        if (!intp.ptm.display) {
            intp.ptm.display = new Display_1.Display(intp.ptm.displayElement, width, height, hStretch, vStretch);
        }
    }
    VAR(intp) {
        intp.validator.argc(2);
    }
}
exports.CommandExecutor = CommandExecutor;

},{"../Errors/PTM_RuntimeError":3,"../Graphics/Display":5,"../Parser/Command":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
const Command_1 = require("../Parser/Command");
class CommandValidator {
    commandExists(cmd) {
        return Object.values(Command_1.Command).includes(cmd);
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
    }
}
exports.CommandValidator = CommandValidator;

},{"../Errors/PTM_RuntimeError":3,"../Parser/Command":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const PTM_InitializationError_1 = require("./Errors/PTM_InitializationError");
const Parser_1 = require("./Parser/Parser");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
const CommandValidator_1 = require("./Interpreter/CommandValidator");
document.addEventListener("DOMContentLoaded", () => {
    console.log("=======================================================\n" +
        "  ~ Welcome to the PTM - Programmable Tile Machine! ~  \n" +
        "    Developed by: Fernando Aires Castello  (C) 2022    \n" +
        "=======================================================\n");
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
        this.displayElement = displayElement;
        this.display = null;
        this.validator = new CommandValidator_1.CommandValidator();
        this.executor = new CommandExecutor_1.CommandExecutor(this, this.validator);
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intervalLength = 255;
        this.programPtr = 0;
        this.branching = false;
        this.intervalId = this.start();
    }
    log(msg) {
        console.log(`${msg}`);
    }
    start() {
        this.log("Interpreter started");
        return window.setInterval(() => this.cycle(), this.intervalLength);
    }
    cycle() {
        if (this.programPtr < this.program.length()) {
            this.executor.execute(this.program.lines[this.programPtr]);
            if (!this.branching) {
                this.programPtr++;
                if (this.programPtr >= this.program.length()) {
                    this.stop("Execution pointer past end of script");
                }
            }
            else {
                this.branching = false;
            }
        }
    }
    stop(reason) {
        window.clearInterval(this.intervalId);
        this.log(`Interpreter exited.\nReason: ${reason}`);
    }
    reset() {
        this.log("Machine reset");
        this.branching = true;
        this.programPtr = 0;
    }
}
exports.PTM = PTM;

},{"./Errors/PTM_InitializationError":1,"./Interpreter/CommandExecutor":6,"./Interpreter/CommandValidator":7,"./Parser/Parser":14}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command["NOP"] = "NOP";
    Command["TEST"] = "TEST";
    Command["DATA"] = "DATA";
    Command["HALT"] = "HALT";
    Command["RESET"] = "RESET";
    Command["TITLE"] = "TITLE";
    Command["SCREEN"] = "SCREEN";
    Command["VAR"] = "VAR";
})(Command = exports.Command || (exports.Command = {}));

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTime = void 0;
var ExecutionTime;
(function (ExecutionTime) {
    ExecutionTime["Undefined"] = "Undefined";
    ExecutionTime["CompileTime"] = "CompileTime";
    ExecutionTime["RunTime"] = "RunTime";
})(ExecutionTime = exports.ExecutionTime || (exports.ExecutionTime = {}));

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const PTM_ParseError_1 = require("../Errors/PTM_ParseError");
const NumberBase_1 = require("./NumberBase");
const ParamType_1 = require("./ParamType");
class Param {
    constructor(programLine, src) {
        this.numericBase = NumberBase_1.NumberBase.None;
        this.numericSign = "";
        this.programLine = programLine;
        this.text = src;
        this.arrayAccess = null;
        this.type = this.parseType(src);
        this.text = this.maybeTransformText();
        this.number = this.tryParseNumber();
    }
    toString() {
        if (this.type === ParamType_1.ParamType.NumberLiteral) {
            return ` ${this.number} (${this.type} | ${this.numericBase})`;
        }
        else {
            return ` ${this.text} (${this.type})`;
        }
    }
    parseType(src) {
        if (src.length === 0) {
            return ParamType_1.ParamType.Empty;
        }
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
        else if (this.isValidIdentifier(src)) {
            return ParamType_1.ParamType.Identifier;
        }
        else if (src[0].match(/[0-9]/)) {
            this.numericBase = NumberBase_1.NumberBase.Decimal;
            return ParamType_1.ParamType.NumberLiteral;
        }
        else if (src[0].match(/[a-z]/i)) {
            const ixLeftBrace = src.indexOf(Param.ArrayLeftBrace);
            const ixRightBrace = src.indexOf(Param.ArrayRightBrace);
            if (ixLeftBrace > 0 && ixRightBrace > ixLeftBrace + 1) {
                const id = src.substring(0, ixLeftBrace);
                const subscript = src.substring(ixLeftBrace + 1, ixRightBrace);
                if (this.isValidIdentifier(subscript)) {
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
        throw new PTM_ParseError_1.PTM_ParseError(`Could not parse parameter: ${src}`, this.programLine);
    }
    isValidIdentifier(src) {
        return src.match(/^[$A-Z_][0-9A-Z._$]*$/i) !== null;
    }
    maybeTransformText() {
        if (this.type === ParamType_1.ParamType.StringLiteral) {
            return this.unenclose(this.text);
        }
        else if (this.type === ParamType_1.ParamType.CharLiteral) {
            if (this.text.length === 3) {
                return this.unenclose(this.text);
            }
            else {
                throw new PTM_ParseError_1.PTM_ParseError(`Invalid character literal: ${this.text}`, this.programLine);
            }
        }
        else if (this.type == ParamType_1.ParamType.NumberLiteral) {
            return this.text;
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

},{"../Errors/PTM_ParseError":2,"./NumberBase":11,"./ParamType":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = void 0;
var ParamType;
(function (ParamType) {
    ParamType["Empty"] = "Empty";
    ParamType["NumberLiteral"] = "NumberLiteral";
    ParamType["CharLiteral"] = "CharLiteral";
    ParamType["StringLiteral"] = "StringLiteral";
    ParamType["Identifier"] = "Identifier";
    ParamType["ArrayIxLiteral"] = "ArrayIxLiteral";
    ParamType["ArrayIxVarIdentifier"] = "ArrayIxVarIdentifier";
})(ParamType = exports.ParamType || (exports.ParamType = {}));

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const PTM_ParseError_1 = require("../Errors/PTM_ParseError");
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
        this.ptm.log("Parse/compile started");
        this.program.lines = [];
        let lineNr = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            lineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, lineNr);
            if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Executable) {
                if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.RunTime) {
                    this.program.addLine(newPrgLine);
                }
                else if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.CompileTime) {
                    this.ptm.executor.execute(newPrgLine);
                }
                else if (newPrgLine.execTime === ExecutionTime_1.ExecutionTime.Undefined) {
                    throw new PTM_ParseError_1.PTM_ParseError("Could not determine execution time for this line", newPrgLine);
                }
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Undefined) {
                throw new PTM_ParseError_1.PTM_ParseError("Could not determine type of this line", newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });
        this.ptm.log("Parse/compile finished normally");
        return this.program;
    }
    parseSrcLine(srcLine, lineNr) {
        const line = new ProgramLine_1.ProgramLine(srcLine, lineNr);
        if (this.isBlank(line.src) || this.isComment(line.src)) {
            line.type = ProgramLineType_1.ProgramLineType.Ignore;
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
        if (this.ptm.validator.commandExists(cmdName)) {
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

},{"../Errors/PTM_ParseError":2,"./Command":9,"./ExecutionTime":10,"./Param":12,"./Program":15,"./ProgramLine":16,"./ProgramLineType":17}],15:[function(require,module,exports){
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
    length() {
        return this.lines.length;
    }
}
exports.Program = Program;

},{}],16:[function(require,module,exports){
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

},{"./ExecutionTime":10,"./ProgramLineType":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLineType = void 0;
var ProgramLineType;
(function (ProgramLineType) {
    ProgramLineType["Undefined"] = "Undefined";
    ProgramLineType["Ignore"] = "Ignore";
    ProgramLineType["Executable"] = "Executable";
})(ProgramLineType = exports.ProgramLineType || (exports.ProgramLineType = {}));

},{}]},{},[8]);
