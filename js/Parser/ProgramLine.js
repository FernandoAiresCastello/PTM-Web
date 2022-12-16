"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLine = void 0;
const Command_1 = require("./Command");
class ProgramLine {
    constructor(src, line_nr) {
        this.src = src;
        this.line_nr = line_nr;
        this.cmd = Command_1.Command.Nop;
        this.params = [];
    }
}
exports.ProgramLine = ProgramLine;
