import { PTM } from "../PTM";
import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Interpreter } from "./Interpreter";
import { ProgramLine } from "../Parser/ProgramLine";
import { Comparison } from "./Comparison";

type Command = { [cmd: string] : (ptm: PTM, intp: Interpreter) => void; }

export class Commands {

    private readonly ptm: PTM;
    private readonly intp: Interpreter;
    private readonly commandList: Command;
   
    constructor(ptm: PTM, intp: Interpreter) {
        this.ptm = ptm;
        this.intp = intp;
        this.commandList = {

            ["TEST"]: this.TEST,
            ["DEBUG"]: this.DEBUG,
            ["DATA"]: this.DATA,
            ["EXIT"]: this.EXIT,
            ["RESET"]: this.RESET,
            ["TITLE"]: this.TITLE,
            ["SCREEN"]: this.SCREEN,
            ["GOTO"]: this.GOTO,
            ["CALL"]: this.CALL,
            ["RET"]: this.RET,
            ["VAR"]: this.VAR,
            ["ARR.NEW"]: this.ARR_NEW,
            ["ARR.SET"]: this.ARR_SET,
            ["ARR.PUSH"]: this.ARR_PUSH,
            ["ARR.FOR"]: this.ARR_FOR,
            ["INC"]: this.INC,
            ["DEC"]: this.DEC,
            ["CLS"]: this.CLS,
            ["PAL"]: this.PAL,
            ["CHR"]: this.CHR,
            ["WCOL"]: this.WCOL,
            ["VSYNC"]: this.VSYNC,
            ["BUF.SEL"]: this.BUF_SEL,
            ["BUF.VIEW"]: this.BUF_VIEW,
            ["BUF.SCRL"]: this.BUF_SCRL,
            ["LAYER"]: this.LAYER,
            ["LOCATE"]: this.LOCATE,
            ["TILE.NEW"]: this.TILE_NEW,
            ["TILE.ADD"]: this.TILE_ADD,
            ["PUT"]: this.PUT,
            ["FILL"]: this.FILL,
            ["TRON"]: this.TRON,
            ["TROFF"]: this.TROFF,
            ["PRINT"]: this.PRINT,
            ["PRINTL"]: this.PRINTL,
            ["PRINT.ADD"]: this.PRINT_ADD,
            ["FCOL"]: this.FCOL,
            ["BCOL"]: this.BCOL,
            ["COLOR"]: this.COLOR,
            ["PAUSE"]: this.PAUSE,
            ["FOR"]: this.FOR,
            ["NEXT"]: this.NEXT,
            ["BRK"]: this.BRK,
            ["SKIP"]: this.SKIP,
            ["IF.EQ"]: this.IF_EQ,
            ["IF.NEQ"]: this.IF_NEQ,
            ["IF.GT"]: this.IF_GT,
            ["IF.GTE"]: this.IF_GTE,
            ["IF.LT"]: this.IF_LT,
            ["IF.LTE"]: this.IF_LTE,
            ["ENDIF"]: this.ENDIF
        };
    }

    execute(programLine: ProgramLine) {
        const cmd = programLine.cmd;
        if (cmd) {
            this.ptm.log.printCommandExecution(programLine);
            this.intp.programLine = programLine;
            const commandFunction = this.commandList[cmd];
            if (commandFunction) {
                commandFunction(this.ptm, this.intp);
            } else {
                throw new PTM_RuntimeError(`Unknown command: ${cmd}`, programLine);
            }
        } else {
            throw new PTM_RuntimeError(`Command reference is invalid`, programLine);
        }
    }

    TEST(ptm: PTM, intp: Interpreter) { // Used only for internal testing
    }

    DEBUG(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        if (intp.isArray(0)) {
            const arrId = intp.getArg(0).text;
            const arr = intp.requireExistingArray(0);
            ptm.log.printVariableOrArray(arrId, arr);
        } else {
            const varId = intp.getArg(0).text;
            const value = intp.requireString(0);
            ptm.log.printVariableOrArray(varId, value);
        }
    }

    DATA(ptm: PTM, intp: Interpreter) {
    }

    EXIT(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.stop("Exit requested");
        if (ptm.display) {
            ptm.display.update();
        }
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
        intp.argc(5);
        const width = intp.requireNumber(0);
        const height = intp.requireNumber(1);
        const defaultBufLayers = intp.requireNumber(2);
        const hStretch = intp.requireNumber(3);
        const vStretch = intp.requireNumber(4);
        ptm.createDisplay(width, height, hStretch, vStretch, defaultBufLayers);
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
        const argc = intp.argcMinMax(1, 3);
        const arrayId = intp.requireId(0);
        let initialArrLen = 0;
        if (argc > 1) {
            initialArrLen = intp.requireNumber(1);
        }
        let initialElement = "";
        if (argc > 2) {
            initialElement = intp.requireString(2);
        }
        const arr: string[] = [];
        if (initialArrLen > 0) {
            for (let i = 0; i < initialArrLen; i++) {
                arr.push(initialElement);
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

    ARR_FOR(ptm: PTM, intp: Interpreter) {
        intp.argc(2)
        const arrId = intp.requireId(0);
        const arr = intp.requireExistingArray(0);
        const iterVarId = intp.requireId(1);
        ptm.beginArrayLoop(arr, arrId, iterVarId);
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

    BUF_VIEW(ptm: PTM, intp: Interpreter) {
        intp.argc(4);
        const x = intp.requireNumber(0);
        const y = intp.requireNumber(1);
        const w = intp.requireNumber(2);
        const h = intp.requireNumber(3);
        if (ptm.cursor) {
            ptm.cursor.buffer.view.set(x, y, w, h);
        }
    }

    BUF_SCRL(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const dx = intp.requireNumber(0);
        const dy = intp.requireNumber(1);
        if (ptm.cursor) {
            ptm.cursor.buffer.view.scroll(dx, dy);
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

    TILE_ADD(ptm: PTM, intp: Interpreter) {
        intp.argc(3);
        const ch = intp.requireNumber(0);
        const fgc = intp.requireNumber(1);
        const bgc = intp.requireNumber(2);
        ptm.currentTile.add(ch, fgc, bgc);
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

    PRINT(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const text = intp.requireString(0);
        ptm.printTileStringAtCursorPos(text);
    }

    PRINTL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const text = intp.requireString(0);
        ptm.printTileStringAtCursorPos(text + "\n");
    }

    PRINT_ADD(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const text = intp.requireString(0);
        if (ptm.cursor && ptm.display) {
            ptm.cursor.buffer.overlapTileString(
                text, ptm.cursor.layer, ptm.cursor.x, ptm.cursor.y, 
                ptm.currentTextFgc, ptm.currentTextBgc, ptm.currentTile.transparent);
            ptm.cursor.x += text.length;
        }
    }

    FCOL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const color = intp.requireNumber(0);
        ptm.currentTextFgc = color;
    }

    BCOL(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const color = intp.requireNumber(0);
        ptm.currentTextBgc = color;
    }

    COLOR(ptm: PTM, intp: Interpreter) {
        const argc = intp.argcMinMax(1, 2);
        const fgc = intp.requireNumber(0);
        ptm.currentTextFgc = fgc;
        if (argc === 2) {
            const bgc = intp.requireNumber(1);
            ptm.currentTextBgc = bgc;
        }
    }

    PAUSE(ptm: PTM, intp: Interpreter) {
        intp.argc(1);
        const length = intp.requireNumber(0);
        ptm.pause(length);
    }

    FOR(ptm: PTM, intp: Interpreter) {
        const argc = intp.argcMinMax(3, 4);
        const varId = intp.requireId(0);
        const first = intp.requireNumber(1);
        const last = intp.requireNumber(2);
        const step = argc === 4 ? intp.requireNumber(3) : 1;
        ptm.beginLoop(varId, first, last, step);
    }

    NEXT(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.endLoop();
    }

    BRK(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.abortLoop();
    }

    SKIP(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
        ptm.skipLoopIteration();
    }

    IF_EQ(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.Equal, a, b);
    }

    IF_NEQ(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.NotEqual, a, b);
    }

    IF_GT(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.Greater, a, b);
    }

    IF_GTE(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.GreaterOrEqual, a, b);
    }

    IF_LT(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.Lesser, a, b);
    }

    IF_LTE(ptm: PTM, intp: Interpreter) {
        intp.argc(2);
        const a = intp.requireString(0);
        const b = intp.requireString(1);
        ptm.beginIfBlock(Comparison.LesserOrEqual, a, b);
    }

    ENDIF(ptm: PTM, intp: Interpreter) {
        intp.argc(0);
    }
}
