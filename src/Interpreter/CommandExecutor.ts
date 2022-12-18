import { PTM } from "../PTM";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Environment } from "../Runtime/Environment";
import { CommandValidator } from "./CommandValidator";
import { CommandDictionary } from "./CommandDictionary";
import { Interpreter } from "./Interpreter";
import { ProgramLine } from "../Parser/ProgramLine";
import { Command } from "../Parser/Command";
import { Display } from "../Graphics/Display";

export class CommandExecutor {

    private readonly ptm: PTM;
    private readonly env: Environment;
    private readonly validator: CommandValidator;
    private readonly commandDict: CommandDictionary;

    constructor(ptm: PTM, env: Environment, validator: CommandValidator) {
        this.ptm = ptm;
        this.env = env;
        this.validator = validator;
        this.commandDict = this.initCommands();
    }

    initCommands() {
        return {
            [Command.NOP]: this.NOP,
            [Command.TEST]: this.TEST,
            [Command.DATA]: this.DATA,
            [Command.HALT]: this.HALT,
            [Command.RESET]: this.RESET,
            [Command.TITLE]: this.TITLE,
            [Command.SCREEN]: this.SCREEN,
            [Command.VAR]: this.VAR,
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction({ validator: this.validator, param: programLine.params }, this.env);
            this.ptm.log(` ${programLine.lineNr}: ${programLine.src}`);
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }

    NOP(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
    }

    TEST(intp: Interpreter, env: Environment) {
    }

    DATA(intp: Interpreter, env: Environment) {
    }

    HALT(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
        env.haltRequested = true;
    }

    RESET(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
    }

    TITLE(intp: Interpreter, env: Environment) {
        intp.validator.argc(1);
        window.document.title = intp.param[0].text;
    }

    SCREEN(intp: Interpreter, env: Environment) {
        intp.validator.argc(4);

        const width = intp.param[0].number;
        const height = intp.param[1].number;
        const hStretch = intp.param[2].number;
        const vStretch = intp.param[3].number;

        env.display = new Display(env.displayElement, width, height, hStretch, vStretch);
    }

    VAR(intp: Interpreter, env: Environment) {
        intp.validator.argc(2);
    }
}
