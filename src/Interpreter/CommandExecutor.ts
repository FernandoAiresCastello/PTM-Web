import { Command } from "../Parser/Command";
import { Param } from "../Parser/Param";
import { ProgramLine } from "../Parser/ProgramLine";
import { CommandDictionary } from "./CommandDictionary";
import { CommandValidator } from "./CommandValidator";
import { PTM } from "../PTM";

export class CommandExecutor {
    
    private ptm: PTM;
    private commandDict: CommandDictionary;
    private validator: CommandValidator;
    private params: Param[];

    constructor(ptm: PTM) {
        this.ptm = ptm;
        this.params = [];
        this.validator = new CommandValidator();

        this.commandDict = {
            [Command.Nop]: this.Nop,
            [Command.Halt]: this.Halt,
            [Command.Exit]: this.Exit,
            [Command.Title]: this.Title,
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        this.validator.programLine = programLine;
        this.params = programLine.params;
        const impl = this.commandDict[cmd];
        impl();
    }

    private Nop() {
        this.validator.argc(0);
        console.info("NOP executed");
    }

    private Halt() {
        this.validator.argc(0);
        console.info("HALT executed");
    }

    private Exit() {
        this.validator.argc(0);
        console.info("EXIT executed");
    }

    private Title() {
        this.validator.argc(1);
        console.info(`TITLE executed with params: ${this.params}`);
    }
}
