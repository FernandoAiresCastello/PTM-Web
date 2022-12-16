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
exports.CommandExecutor = void 0;
const CommandValidator_1 = require("./CommandValidator");
const Command_1 = require("../Parser/Command");
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
        this.ptm.log("NOP executed");
    }
    Halt() {
        this.validator.argc(0);
        this.ptm.log("HALT executed");
    }
    Exit() {
        this.validator.argc(0);
        this.ptm.log("EXIT executed");
    }
    Title() {
        this.validator.argc(1);
        this.ptm.log(`TITLE executed with params: ${this.params}`);
    }
}
exports.CommandExecutor = CommandExecutor;

},{"../Parser/Command":6,"./CommandValidator":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
class CommandValidator {
    throwError(msg) {
        throw new Error(`${msg}\nSource line: ${this.programLine.lineNr} ${this.programLine.src}`);
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

},{}],4:[function(require,module,exports){
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
    const ptm = new PTM_1.PTM(displayElement, ptmlElement.textContent);
    window.PTM = ptm;
    ptm.start();
});

},{"./PTM":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const Parser_1 = require("./Parser/Parser");
const CommandExecutor_1 = require("./Interpreter/CommandExecutor");
class PTM {
    constructor(displayElement, srcPtml) {
        this.displayElement = displayElement;
        this.display = null;
        this.cmdExec = new CommandExecutor_1.CommandExecutor(this);
        this.parser = new Parser_1.Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.start();
    }
    start() {
        this.log("Machine started successfully!");
        this.program.lines.forEach(line => {
            this.cmdExec.execute(line);
        });
        // this.display = new Display(displayElement, 256, 192, 3, 3);
    }
    log(msg) {
        console.info(`PTM >>> ${msg}`);
    }
    error(msg) {
        console.error(`PTM >>> ${msg}`);
    }
}
exports.PTM = PTM;

},{"./Interpreter/CommandExecutor":2,"./Parser/Parser":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const ParseError_1 = require("../Errors/ParseError");
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
        this.program.lines = [];
        let lineNr = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            lineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, lineNr);
            if (newPrgLine.type === ProgramLineType_1.ProgramLineType.RuntimeCommand) {
                this.program.addLine(newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.CompilerCommand) {
                this.ptm.cmdExec.execute(newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Undefined) {
                throw new ParseError_1.ParseError("Undefined program line type", newPrgLine);
            }
            else if (newPrgLine.type === ProgramLineType_1.ProgramLineType.Ignore) {
                // Ignorable PTML source code line
            }
        });
        return this.program;
    }
    parseSrcLine(srcLine, lineNr) {
        const line = new ProgramLine_1.ProgramLine(srcLine, lineNr);
        if (line.src.trim() === "" || line.src.trim().startsWith("#")) {
            line.type = ProgramLineType_1.ProgramLineType.Ignore;
        }
        return line;
    }
}
exports.Parser = Parser;

},{"../Errors/ParseError":1,"./Program":8,"./ProgramLine":9,"./ProgramLineType":10}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLine = void 0;
const ProgramLineType_1 = require("./ProgramLineType");
class ProgramLine {
    constructor(src, lineNr) {
        this.type = ProgramLineType_1.ProgramLineType.Undefined;
        this.src = src;
        this.lineNr = lineNr;
        this.cmd = null;
        this.params = [];
    }
    toString() {
        return this.src;
    }
}
exports.ProgramLine = ProgramLine;

},{"./ProgramLineType":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLineType = void 0;
var ProgramLineType;
(function (ProgramLineType) {
    ProgramLineType[ProgramLineType["Undefined"] = 0] = "Undefined";
    ProgramLineType[ProgramLineType["Ignore"] = 1] = "Ignore";
    ProgramLineType[ProgramLineType["CompilerCommand"] = 2] = "CompilerCommand";
    ProgramLineType[ProgramLineType["RuntimeCommand"] = 3] = "RuntimeCommand";
})(ProgramLineType = exports.ProgramLineType || (exports.ProgramLineType = {}));

},{}]},{},[4]);
