import { PTM } from "../PTM";
import { ProgramLine } from "../Parser/ProgramLine";
import { CommandDictionary } from "./CommandDictionary";
import { CommandValidator } from "./CommandValidator";
import { Command } from "../Parser/Command";
import { Param } from "../Parser/Param";
import { Display } from "../Graphics/Display";
import { InterpreterContext } from "./InterpreterContext";

export class CommandExecutor {

    readonly validator: CommandValidator;
    private readonly ptm: PTM;
    private readonly commandDict: CommandDictionary;

    constructor(ptm: PTM) {
        this.ptm = ptm;
        this.validator = new CommandValidator();

        this.commandDict = {
            [Command.Nop]: this.Nop,
            [Command.Data]: this.Data,
            [Command.Halt]: this.Halt,
            [Command.Reset]: this.Reset,
            [Command.Title]: this.Title,
            [Command.Screen]: this.Screen
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.validator.programLine = programLine;
            const interpreterCtx = { executor: this, validator: this.validator, param: programLine.params };
            const commandImpl = this.commandDict[cmd];
            commandImpl(interpreterCtx);
        }
    }

    private Nop(ctx: InterpreterContext) {
        ctx.validator.argc(0);
        console.log("--- NOP executed. Params: " + ctx.param);
    }

    private Data(ctx: InterpreterContext) {
        console.log("--- DATA executed. Params: " + ctx.param);
    }

    private Halt(ctx: InterpreterContext) {
        ctx.validator.argc(0);
        console.log("--- HALT executed. Params: " + ctx.param);
    }

    private Reset(ctx: InterpreterContext) {
        ctx.validator.argc(0);
        console.log("--- RESET executed. Params: " + ctx.param);
    }

    private Title(ctx: InterpreterContext) {
        ctx.validator.argc(1);
        console.log("--- TITLE executed. Params: " + ctx.param);
    }

    private Screen(ctx: InterpreterContext) {
        ctx.validator.argc(4);
        console.log("--- SCREEN executed. Params: " + ctx.param);

        const width = ctx.param[0].numeric_value;
        const height = ctx.param[1].numeric_value;
        const horizontalStretch = ctx.param[2].numeric_value;
        const verticalStretch = ctx.param[3].numeric_value;

        ctx.executor.ptm.display = new Display(ctx.executor.ptm.displayElement!, 
            width, height, horizontalStretch, verticalStretch);
    }
}
