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
