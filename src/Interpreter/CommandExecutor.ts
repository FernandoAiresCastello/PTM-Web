import { Environment } from "../Runtime/Environment";
import { CommandValidator } from "./CommandValidator";
import { CommandDictionary } from "./CommandDictionary";
import { ProgramLine } from "../Parser/ProgramLine";
import { Command } from "../Parser/Command";
import { Display } from "../Graphics/Display";
import { Interpreter } from "./Interpreter";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";

export class CommandExecutor {

    private readonly env: Environment;
    private readonly validator: CommandValidator;
    private readonly commandDict: CommandDictionary;

    constructor(env: Environment, validator: CommandValidator) {
        this.env = env;
        this.validator = validator;
        this.commandDict = {

            [Command.NOP]: this.NOP,
            [Command.DATA]: this.DATA,
            [Command.HALT]: this.HALT,
            [Command.RESET]: this.RESET,
            [Command.TITLE]: this.TITLE,
            [Command.SCREEN]: this.SCREEN
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction({ validator: this.validator, param: programLine.params }, this.env);
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }

    NOP(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
    }

    DATA(intp: Interpreter, env: Environment) {
    }

    HALT(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
    }

    RESET(intp: Interpreter, env: Environment) {
        intp.validator.argc(0);
    }

    TITLE(intp: Interpreter, env: Environment) {
        intp.validator.argc(1);
    }

    SCREEN(intp: Interpreter, env: Environment) {
        intp.validator.argc(4);

        const width = intp.param[0].numeric_value;
        const height = intp.param[1].numeric_value;
        const horizontalStretch = intp.param[2].numeric_value;
        const verticalStretch = intp.param[3].numeric_value;

        env.display = new Display(
            env.displayElement, width, height, horizontalStretch, verticalStretch);
    }
}
