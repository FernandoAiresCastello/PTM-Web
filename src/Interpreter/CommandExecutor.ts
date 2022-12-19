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
            [Command.TEST]: this.TEST,
            [Command.DATA]: this.DATA,
            [Command.HALT]: this.HALT,
            [Command.RESET]: this.RESET,
            [Command.TITLE]: this.TITLE,
            [Command.SCREEN]: this.SCREEN,
            [Command.GOTO]: this.GOTO,
            [Command.CALL]: this.CALL,
            [Command.RET]: this.RET,
            [Command.VAR]: this.VAR,
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.logExecution(programLine);
            this.validator.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction(this.ptm, { validator: this.validator, param: programLine.params });
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }

    TEST(ptm: PTM, intp: Interpreter) {
    }

    DATA(ptm: PTM, intp: Interpreter) {
    }

    HALT(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(0);
        ptm.stop("Halt requested");
    }

    RESET(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(0);
        ptm.reset();
    }

    TITLE(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(1);
        window.document.title = intp.param[0].text;
    }

    SCREEN(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(4);

        const width = intp.param[0].number;
        const height = intp.param[1].number;
        const hStretch = intp.param[2].number;
        const vStretch = intp.param[3].number;

        if (ptm.display) {
            ptm.display.reset();
        } else {
            ptm.display = new Display(ptm.displayElement, width, height, hStretch, vStretch);
        }
    }

    GOTO(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(1);
        const label = intp.param[0].text;
        ptm.gotoSubroutine(label);
    }

    CALL(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(1);
        const label = intp.param[0].text;
        ptm.callSubroutine(label);
    }

    RET(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(0);
        ptm.returnFromSubroutine();
    }

    VAR(ptm: PTM, intp: Interpreter) {
        intp.validator.argc(2);
    }
}
