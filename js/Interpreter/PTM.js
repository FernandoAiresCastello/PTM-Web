"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PTM = void 0;
const Parser_1 = require("../Parser/Parser");
const Display_1 = require("../Graphics/Display");
const CommandExecutor_1 = require("./CommandExecutor");
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
