import { PTM } from "../PTM";
import { ProgramLine } from "../Parser/ProgramLine";
import { CommandDictionary } from "./CommandDictionary";
import { CommandValidator } from "./CommandValidator";
import { Command } from "../Parser/Command";
import { Param } from "../Parser/Param";

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
        const cmd = programLine.cmd!;
        this.validator.programLine = programLine;
        this.params = programLine.params;
        const impl = this.commandDict[cmd];
        impl();
    }

    private Nop() {
        this.validator.argc(0);
        this.ptm.log("NOP executed");
    }

    private Halt() {
        this.validator.argc(0);
        this.ptm.log("HALT executed");
    }

    private Exit() {
        this.validator.argc(0);
        this.ptm.log("EXIT executed");
    }

    private Title() {
        this.validator.argc(1);
        this.ptm.log(`TITLE executed with params: ${this.params}`);
    }
}
