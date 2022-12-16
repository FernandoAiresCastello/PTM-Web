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
