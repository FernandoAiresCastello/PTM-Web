import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { Commands } from "./Interpreter/Commands";
import { Interpreter } from "./Interpreter/Interpreter";
import { ProgramLine } from "./Parser/ProgramLine";
import { PTM_RuntimeError } from "./Errors/PTM_RuntimeError";
import { Variables } from "./Interpreter/Variables";
import { Arrays } from "./Interpreter/Arrays";
import { Palette } from "./Graphics/Palette";
import { Tileset } from "./Graphics/Tileset";
import { Display } from "./Graphics/Display";
import { Cursor } from "./Graphics/Cursor";
import { TileSeq } from "./Graphics/TileSeq";
import { DefaultTileset } from "./Graphics/DefaultTileset";
import { PTM_Main } from "./main";
import { LoopStack } from "./Interpreter/Loop";

document.addEventListener("DOMContentLoaded", PTM_Main);

export class PTM {

    vars: Variables;
    arrays: Arrays;
    palette: Palette;
    tileset: Tileset;
    display: Display | null;
    cursor: Cursor | null;
    currentTile: TileSeq;
    currentTextFgc: number;
    currentTextBgc: number;

    private readonly logDebugFormat = "color:#0ff";
    private readonly logExecFormat = "color:#ff0";
    private readonly trace: boolean = false;
    private readonly cycleInterval: number = 1;
    private readonly animationInterval: number = 400;
    readonly displayElement: HTMLElement;
    readonly commands: Commands;
    readonly intp: Interpreter;
    private readonly parser: Parser;
    private readonly program: Program;
    private readonly cycleIntervalId: number;
    private programPtr: number;
    private branching: boolean;
    private currentLine: ProgramLine | null;
    private pauseCycles: number;
    private callStack: number[];
    private loopStack: LoopStack;

    constructor(displayElement: HTMLElement, srcPtml: string) {

        this.displayElement = displayElement;
        this.display = null;
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter(this, this.program);
        this.commands = new Commands(this, this.intp);
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.pauseCycles = 0;
        this.callStack = [];
        this.loopStack = new LoopStack();
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette();
        this.tileset = new Tileset();
        DefaultTileset.init(this.tileset);
        this.cursor = null;
        this.currentTile = new TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;

        this.cycleIntervalId = this.start();
    }

    logInfo(msg: string) {
        console.log(msg);
    }

    logDebug(id: string, value: string | string[]) {
        let msg = "%c";
        if (Array.isArray(value)) {
            msg += "[";
            for (let i = 0; i < value.length; i++) {
                msg += `"${value[i]}"`;
                if (i < value.length - 1) {
                    msg += ", ";
                }
            }
            msg += "]";
        } else {
            msg += value;
        }
        console.log(msg, this.logDebugFormat);
    }

    logExecution(programLine: ProgramLine) {
        if (this.trace) {
            console.log(` ${programLine.lineNr}: %c${programLine.src}`, this.logExecFormat);
        }
    }

    start(): number {
        this.logInfo("Interpreter started");
        return window.setInterval(() => this.cycle(), this.cycleInterval);
    }

    cycle() {
        if (this.pauseCycles > 0) {
            this.pauseCycles--;
        } else {
            if (this.programPtr >= this.program.length()) {
                this.stop("Execution pointer past end of script");
            } else {
                this.currentLine = this.program.lines[this.programPtr];
                try {
                    this.commands.execute(this.currentLine);
                    if (!this.branching) {
                        this.programPtr++;
                    } else {
                        this.branching = false;
                    }
                } catch (e) {
                    this.stop("Runtime error");
                    throw e;
                }
            }
        }
    }

    stop(reason?: string) {
        window.clearInterval(this.cycleIntervalId);
        let msg = "Interpreter exited";
        if (reason) {
            msg += `\nReason: ${reason}`;
        }
        console.log(msg);
    }

    reset() {
        this.logInfo("Machine reset");
        this.programPtr = 0;
        this.branching = true;
        this.display?.reset();
        this.callStack = [];
        this.loopStack = new LoopStack();
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette();
        this.tileset = new Tileset();
    }

    createDisplay(width: number, height: number, hStretch: number, vStretch: number, defaultBufLayers: number) {
        if (this.display) {
            this.display.reset();
            if (this.cursor) {
                this.cursor.set(this.display.getDefaultBuffer(), 0, 0, 0);
            }
        } else {
            this.display = new Display(this.displayElement, 
                width, height, hStretch, vStretch, defaultBufLayers, 
                this.palette, this.tileset, this.animationInterval);
            this.cursor = new Cursor(this.display.getDefaultBuffer());
        }
    }

    gotoSubroutine(ixProgramLine: number) {
        this.programPtr = ixProgramLine;
        this.branching = true;
    }

    callSubroutine(ixProgramLine: number) {
        this.callStack.push(this.programPtr + 1);
        this.programPtr = ixProgramLine;
        this.branching = true;
    }

    returnFromSubroutine() {
        if (this.callStack.length > 0) {
            this.programPtr = this.callStack.pop()!;
            this.branching = true;
        } else {
            throw new PTM_RuntimeError("Call stack is empty", this.currentLine!);
        }
    }

    pause(cycles: number) {
        this.pauseCycles = cycles;
    }

    printTileStringAtCursorPos(str: string) {
        if (this.cursor && this.display) {
            this.cursor.buffer.setTileString(str, this.cursor, this.currentTextFgc, this.currentTextBgc, this.currentTile.transparent);
        }
    }
}
