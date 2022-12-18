import { PTM } from "../PTM";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { CommandValidator } from "./CommandValidator";
import { CommandDictionary } from "./CommandDictionary";
import { Interpreter } from "./Interpreter";
import { ProgramLine } from "../Parser/ProgramLine";
import { Command } from "../Parser/Command";
import { Display } from "../Graphics/Display";

export class CommandExecutor {

    private readonly ptm: PTM;
    private readonly validator: CommandValidator;
    private readonly commandDict: CommandDictionary;

    constructor(ptm: PTM, validator: CommandValidator) {
        this.ptm = ptm;
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
            this.ptm.log(` ${programLine.lineNr}: ${programLine.src}`);
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction({ ptm: this.ptm, validator: this.validator, param: programLine.params });
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }

    NOP(intp: Interpreter) {
        intp.validator.argc(0);
    }

    TEST(intp: Interpreter) {
    }

    DATA(intp: Interpreter) {
    }

    HALT(intp: Interpreter) {
        intp.validator.argc(0);
        intp.ptm.stop("Halt requested");
    }

    RESET(intp: Interpreter) {
        intp.validator.argc(0);
        intp.ptm.reset();
    }

    TITLE(intp: Interpreter) {
        intp.validator.argc(1);
        window.document.title = intp.param[0].text;
    }

    SCREEN(intp: Interpreter) {
        intp.validator.argc(4);

        const width = intp.param[0].number;
        const height = intp.param[1].number;
        const hStretch = intp.param[2].number;
        const vStretch = intp.param[3].number;

        if (!intp.ptm.display) {
            intp.ptm.display = new Display(intp.ptm.displayElement, width, height, hStretch, vStretch);
        }
    }

    VAR(intp: Interpreter) {
        intp.validator.argc(2);
    }
}
