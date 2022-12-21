import { PTM } from "../PTM";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Interpreter } from "./Interpreter";
import { CommandDictionary } from "./CommandDictionary";
import { ProgramLine } from "../Parser/ProgramLine";
import { Command } from "../Parser/Command";
import { Display } from "../Graphics/Display";

export class CommandExecutor {

    private readonly ptm: PTM;
    private readonly intp: Interpreter;
    private readonly commandDict: CommandDictionary;

    constructor(ptm: PTM, intp: Interpreter) {
        this.ptm = ptm;
        this.intp = intp;
        this.commandDict = this.initCommands();
    }

    private initCommands() {
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
            [Command.ARR_NEW]: this.ARR_NEW,
            [Command.ARR_SET]: this.ARR_SET,
            [Command.ARR_PUSH]: this.ARR_PUSH
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.logExecution(programLine);
            this.intp.programLine = programLine;
            const commandFunction = this.commandDict[cmd];
            commandFunction(this.ptm, this.intp);
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid (${cmd})`, programLine);
        }
    }

    TEST(ptm: PTM, intp: Interpreter) {
    }

    DATA(ptm: PTM, intp: Interpreter) {
    }

    HALT(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.stop("Halt requested");
    }

    RESET(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.reset();
    }

    TITLE(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        window.document.title = intp.requireString(0);
    }

    SCREEN(ptm: PTM, intp: Interpreter) {
        intp.argc(4);

        const width = intp.requireNumber(0);
        const height = intp.requireNumber(1);
        const hStretch = intp.requireNumber(2);
        const vStretch = intp.requireNumber(3);

        if (ptm.display) {
            ptm.display.reset();
        } else {
            ptm.display = new Display(ptm.displayElement, width, height, hStretch, vStretch);
        }
    }

    GOTO(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const ixProgramLine = intp.requireLabelTarget(0);
        ptm.gotoSubroutine(ixProgramLine);
    }

    CALL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const ixProgramLine = intp.requireLabelTarget(0);
        ptm.callSubroutine(ixProgramLine);
    }

    RET(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.returnFromSubroutine();
    }

    VAR(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const id = intp.requireId(0);
        ptm.vars[id] = intp.requireString(1);
    }

    ARR_NEW(ptm: PTM, intp: Interpreter) {
        const argc = intp.argcMinMax(1, 2);
        const arrayId = intp.requireId(0);
        let initialArrLen = 0;
        if (argc > 1) {
            initialArrLen = intp.requireNumber(1);
        }
        const arr: string[] = [];
        if (initialArrLen > 0) {
            for (let i = 0; i < initialArrLen; i++) {
                arr.push("");
            }
        }
        ptm.arrays[arrayId] = arr;
    }

    ARR_PUSH(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const array = intp.requireExistingArray(0);
        const value = intp.requireString(1);
        array.push(value);
    }

    ARR_SET(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const arraySubscript = intp.requireArraySubscript(0);
        const arrayId = arraySubscript.arrayId;
        const ix = arraySubscript.ix;
        const arr = ptm.arrays[arrayId];
        const value = intp.requireString(1);
        arr[ix] = value;
    }
}
