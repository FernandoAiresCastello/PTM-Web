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
