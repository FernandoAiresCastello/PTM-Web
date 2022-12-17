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
const Command_1 = require("../Parser/Command");
const Display_1 = require("../Graphics/Display");
const PTM_RuntimeError_1 = require("../Errors/PTM_RuntimeError");
class CommandExecutor {
    constructor(env, validator) {
        this.env = env;
        this.validator = validator;
        this.commandDict = {
            [Command_1.Command.NOP]: this.NOP,
            [Command_1.Command.DATA]: this.DATA,
            [Command_1.Command.HALT]: this.HALT,
            [Command_1.Command.RESET]: this.RESET,
            [Command_1.Command.TITLE]: this.TITLE,
            [Command_1.Command.SCREEN]: this.SCREEN
        };
    }
    execute(programLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction({ validator: this.validator, param: programLine.params }, this.env);
        }
        else {
            throw new PTM_RuntimeError_1.PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }
    NOP(intp, env) {
        intp.validator.argc(0);
    }
    DATA(intp, env) {
    }
    HALT(intp, env) {
        intp.validator.argc(0);
    }
    RESET(intp, env) {
        intp.validator.argc(0);
    }
    TITLE(intp, env) {
        intp.validator.argc(1);
    }
    SCREEN(intp, env) {
        intp.validator.argc(4);
        const width = intp.param[0].numeric_value;
        const height = intp.param[1].numeric_value;
        const horizontalStretch = intp.param[2].numeric_value;
        const verticalStretch = intp.param[3].numeric_value;
        env.display = new Display_1.Display(env.displayElement, width, height, horizontalStretch, verticalStretch);
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
const Parser_1 = require("./Parser/Parser");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
const Environment_1 = require("./Runtime/Environment");
const CommandValidator_1 = require("./Interpreter/CommandValidator");
const PTM_InitializationError_1 = require("./Errors/PTM_InitializationError");
document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new PTM_InitializationError_1.PTM_InitializationError("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new PTM_InitializationError_1.PTM_InitializationError("Display element not found");
    }
    window.PTM = new PTM(displayElement, ptmlElement.textContent);
});
class PTM {
    constructor(displayElement, srcPtml) {
        this.env = new Environment_1.Environment(displayElement);
        this.validator = new CommandValidator_1.CommandValidator();
        this.executor = new CommandExecutor_1.CommandExecutor(this.env, this.validator);
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

},{"./Errors/PTM_InitializationError":1,"./Interpreter/CommandExecutor":6,"./Interpreter/CommandValidator":7,"./Parser/Parser":13,"./Runtime/Environment":17}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
var Command;
(function (Command) {
    Command["NOP"] = "NOP";
    Command["DATA"] = "DATA";
    Command["HALT"] = "HALT";
    Command["RESET"] = "RESET";
    Command["TITLE"] = "TITLE";
    Command["SCREEN"] = "SCREEN";
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

},{"../Errors/PTM_ParseError":2,"./Command":9,"./ExecutionTime":10,"./Param":11,"./Program":14,"./ProgramLine":15,"./ProgramLineType":16}],14:[function(require,module,exports){
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
exports.Environment = void 0;
class Environment {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.display = null;
    }
}
exports.Environment = Environment;

},{}]},{},[8]);
