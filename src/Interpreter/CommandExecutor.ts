import { PTM } from "../PTM";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Interpreter } from "./Interpreter";
import { CommandDictionary } from "./CommandDictionary";
import { ProgramLine } from "../Parser/ProgramLine";
import { Command } from "../Parser/Command";
import { TileSeq } from "../Graphics/TileSeq";

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
            [Command.DBG]: this.DBG,
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
            [Command.ARR_PUSH]: this.ARR_PUSH,
            [Command.INC]: this.INC,
            [Command.DEC]: this.DEC,
            [Command.CLS]: this.CLS,
            [Command.PAL]: this.PAL,
            [Command.CHR]: this.CHR,
            [Command.WCOL]: this.WCOL,
            [Command.VSYNC]: this.VSYNC,
            [Command.BUF_SEL]: this.BUF_SEL,
            [Command.LAYER]: this.LAYER,
            [Command.LOCATE]: this.LOCATE,
            [Command.TILE_NEW]: this.TILE_NEW,
            [Command.PUT]: this.PUT,
            [Command.FILL]: this.FILL,
            [Command.TRON]: this.TRON,
            [Command.TROFF]: this.TROFF
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

    DBG(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        if (intp.isArray(0)) {
            const arrId = intp.arg(0).text;
            const arr = intp.requireExistingArray(0);
            ptm.logDebug(arrId, arr);
        } else {
            const varId = intp.arg(0).text;
            const value = intp.requireString(0);
            ptm.logDebug(varId, value);
        }
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
        ptm.createDisplay(width, height, hStretch, vStretch);
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

    INC(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const varId = intp.requireExistingVariable(0);
        const value = intp.requireNumber(0);
        ptm.vars[varId] = (value + 1).toString();
    }    

    DEC(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const varId = intp.requireExistingVariable(0);
        const value = intp.requireNumber(0);
        ptm.vars[varId] = (value - 1).toString();
    }    

    PAL(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const ix = intp.requirePaletteIndex(0);
        const color = intp.requireColor(1);
        ptm.palette.set(ix, color);
    }

    CHR(ptm: PTM, intp: Interpreter) {
        intp.argc(3);
        const ix = intp.requireTilesetIndex(0);
        const pixelRow = intp.requireNumber(1);
        const byte = intp.requireNumber(2);
        ptm.tileset.setPixelRow(ix, pixelRow, byte);
    }

    CLS(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        if (ptm.display) {
            ptm.display.clearAllBuffers();
        }
    }

    WCOL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const ix = intp.requirePaletteIndex(0);
        if (ptm.display) {
            ptm.display.setBackColorIx(ix);
        }
    }

    VSYNC(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        if (ptm.display) {
            ptm.display.update();
        }
    }

    BUF_SEL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const bufId = intp.requireString(0);
        if (ptm.cursor && ptm.display) {
            const buf = ptm.display.getBuffer(bufId);
            if (buf) {
                ptm.cursor.buffer = buf;
            } else {
                throw new PTM_RuntimeError(`Buffer not found with id "${bufId}"`, intp.programLine);
            }
        }
    }

    LAYER(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const layer = intp.requireNumber(0);
        if (ptm.cursor) {
            if (layer >= 0 && layer < ptm.cursor.buffer.layerCount) {
                ptm.cursor.layer = layer;
            } else {
                throw new PTM_RuntimeError(
                    `Layer index out of bounds for buffer "${ptm.cursor.buffer.id}": ${layer}`, intp.programLine);
            }
        }
    }

    TILE_NEW(ptm: PTM, intp: Interpreter) {
        intp.argc(3);
        const ch = intp.requireNumber(0);
        const fgc = intp.requireNumber(1);
        const bgc = intp.requireNumber(2);
        ptm.currentTile.setSingle(ch, fgc, bgc);
    }

    LOCATE(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const x = intp.requireNumber(0);
        const y = intp.requireNumber(1);
        if (ptm.cursor) {
            ptm.cursor.setPos(x, y);
        }
    }

    PUT(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.setTile(
                ptm.currentTile, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y);
        }
    }

    FILL(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        if (ptm.cursor && ptm.display) {
            for (let y = 0; y < ptm.cursor.buffer.height; y++) {
                for (let x = 0; x < ptm.cursor.buffer.width; x++) {
                    ptm.cursor.buffer.setTile(ptm.currentTile, ptm.cursor.layer, x, y);            
                }
            }
        }        
    }

    TRON(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.currentTile.transparent = true;
    }

    TROFF(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.currentTile.transparent = false;
    }
}
