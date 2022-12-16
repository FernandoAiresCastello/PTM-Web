(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
class ParseError extends Error {
    constructor(msg, programLine) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = `${msg}\n\tLine: ${programLine.lineNr}\n\tSource: ${programLine.src.trim()}`;
    }
}
exports.ParseError = ParseError;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeError = void 0;
class RuntimeError extends Error {
    constructor(msg, programLine) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = `${msg}\n\tLine: ${programLine.lineNr}\n\tSource: ${programLine.src.trim()}`;
    }
}
exports.RuntimeError = RuntimeError;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./CanvasPoint":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const CommandValidator_1 = require("./CommandValidator");
const Command_1 = require("../Parser/Command");
const Display_1 = require("../Graphics/Display");
class CommandExecutor {
    constructor(ptm) {
        this.ptm = ptm;
        this.validator = new CommandValidator_1.CommandValidator();
        this.commandDict = {
            [Command_1.Command.Nop]: this.Nop,
            [Command_1.Command.Data]: this.Data,
            [Command_1.Command.Halt]: this.Halt,
            [Command_1.Command.Reset]: this.Reset,
            [Command_1.Command.Title]: this.Title,
            [Command_1.Command.Screen]: this.Screen
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.validator.programLine = programLine;
            const interpreterCtx = { executor: this, validator: this.validator, param: programLine.params };
            const commandImpl = this.commandDict[cmd];
            commandImpl(interpreterCtx);
        }
    }
    Nop(ctx) {
        ctx.validator.argc(0);
        console.log("--- NOP executed. Params: " + ctx.param);
    }
    Data(ctx) {
        console.log("--- DATA executed. Params: " + ctx.param);
    }
    Halt(ctx) {
        ctx.validator.argc(0);
        console.log("--- HALT executed. Params: " + ctx.param);
    }
    Reset(ctx) {
        ctx.validator.argc(0);
        console.log("--- RESET executed. Params: " + ctx.param);
    }
    Title(ctx) {
        ctx.validator.argc(1);
        console.log("--- TITLE executed. Params: " + ctx.param);
    }
    Screen(ctx) {
        ctx.validator.argc(4);
        console.log("--- SCREEN executed. Params: " + ctx.param);
        const width = ctx.param[0].numeric_value;
        const height = ctx.param[1].numeric_value;
        const horizontalStretch = ctx.param[2].numeric_value;
        const verticalStretch = ctx.param[3].numeric_value;
        ctx.executor.ptm.display = new Display_1.Display(ctx.executor.ptm.displayElement, width, height, horizontalStretch, verticalStretch);
    }
}
exports.CommandExecutor = CommandExecutor;

},{"../Graphics/Display":4,"../Parser/Command":9,"./CommandValidator":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
const RuntimeError_1 = require("../Errors/RuntimeError");
const Command_1 = require("../Parser/Command");
class CommandValidator {
    commandExists(cmd) {
        return Object.values(Command_1.Command).includes(cmd);
    }
    argc(expectedArgc) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc && actualArgc !== expectedArgc) {
            throw new RuntimeError_1.RuntimeError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`, this.programLine);
        }
    }
    argcMinMax(min, max) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            throw new RuntimeError_1.RuntimeError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`, this.programLine);
        }
    }
}
exports.CommandValidator = CommandValidator;

},{"../Errors/RuntimeError":2,"../Parser/Command":9}],7:[function(require,module,exports){
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

},{"./PTM":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const Parser_1 = require("./Parser/Parser");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
const MachineRuntime_1 = require("./Runtime/MachineRuntime");
class PTM {
    constructor(displayElement, srcPtml) {
        this.displayElement = displayElement;
        this.display = null;
        this.machineRuntime = new MachineRuntime_1.MachineRuntime();
        this.executor = new CommandExecutor_1.CommandExecutor(this);
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.start();
    }
    start() {
        console.log("Machine started");
        // TODO: This should run asynchronously at 1ms intervals
        this.program.lines.forEach(line => {
            this.executor.execute(line);
        });
    }
}
exports.PTM = PTM;
PTM.InvalidNumber = Number.MIN_VALUE;

},{"./Interpreter/CommandExecutor":5,"./Parser/Parser":13,"./Runtime/MachineRuntime":17}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command["Nop"] = "NOP";
    Command["Data"] = "DATA";
    Command["Halt"] = "HALT";
    Command["Reset"] = "RESET";
    Command["Title"] = "TITLE";
    Command["Screen"] = "SCREEN";
})(Command = exports.Command || (exports.Command = {}));

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTime = void 0;
var ExecutionTime;
(function (ExecutionTime) {
    ExecutionTime[ExecutionTime["Undefined"] = 0] = "Undefined";
    ExecutionTime[ExecutionTime["CompileTime"] = 1] = "CompileTime";
    ExecutionTime[ExecutionTime["RunTime"] = 2] = "RunTime";
})(ExecutionTime = exports.ExecutionTime || (exports.ExecutionTime = {}));

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const ParamType_1 = require("./ParamType");
class Param {
    constructor(src) {
        this.type = ParamType_1.ParamType.Undefined;
        this.textual_value = src;
        this.numeric_value = Number(src);
    }
    toString() {
        return this.textual_value;
    }
}
exports.Param = Param;

},{"./ParamType":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamType = void 0;
var ParamType;
(function (ParamType) {
    ParamType[ParamType["Undefined"] = 0] = "Undefined";
    ParamType[ParamType["NumberLiteral"] = 1] = "NumberLiteral";
    ParamType[ParamType["CharLiteral"] = 2] = "CharLiteral";
    ParamType[ParamType["StringLiteral"] = 3] = "StringLiteral";
    ParamType[ParamType["Identifier"] = 4] = "Identifier";
    ParamType[ParamType["ArrayIxLiteral"] = 5] = "ArrayIxLiteral";
    ParamType[ParamType["ArrayIxVarIdentifier"] = 6] = "ArrayIxVarIdentifier"; // array[var_id]
})(ParamType = exports.ParamType || (exports.ParamType = {}));

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const ParseError_1 = require("../Errors/ParseError");
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
        console.log("Compilation started");
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
                    throw new ParseError_1.ParseError("Could not determine execution time for this line", newPrgLine);
                }
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Undefined) {
                throw new ParseError_1.ParseError("Could not determine type of this line", newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });
        console.log("Compilation finished");
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
        if (this.ptm.executor.validator.commandExists(cmdName)) {
            return cmdName;
        }
        else {
            throw new ParseError_1.ParseError(`Command not recognized: ${cmdName}`, line);
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
            const param = new Param_1.Param(rawParam);
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
        if (cmd === Command_1.Command.Data) {
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

},{"../Errors/ParseError":1,"./Command":9,"./ExecutionTime":10,"./Param":11,"./Program":14,"./ProgramLine":15,"./ProgramLineType":16}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLine = void 0;
const ProgramLineType_1 = require("./ProgramLineType");
const ExecutionTime_1 = require("./ExecutionTime");
class ProgramLine {
    constructor(src, lineNr) {
        this.src = src;
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

},{"./ExecutionTime":10,"./ProgramLineType":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLineType = void 0;
var ProgramLineType;
(function (ProgramLineType) {
    ProgramLineType[ProgramLineType["Undefined"] = 0] = "Undefined";
    ProgramLineType[ProgramLineType["Ignore"] = 1] = "Ignore";
    ProgramLineType[ProgramLineType["Executable"] = 2] = "Executable";
})(ProgramLineType = exports.ProgramLineType || (exports.ProgramLineType = {}));

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineRuntime = void 0;
class MachineRuntime {
}
exports.MachineRuntime = MachineRuntime;

},{}]},{},[7]);
