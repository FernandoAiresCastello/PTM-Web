import { PTM_Main } from "./main";
import { PTM_RuntimeError } from "./Errors/PTM_RuntimeError";
import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { Commands } from "./Interpreter/Commands";
import { Interpreter } from "./Interpreter/Interpreter";
import { ProgramLine } from "./Parser/ProgramLine";
import { Variables } from "./Interpreter/Variables";
import { Arrays } from "./Interpreter/Arrays";
import { Palette } from "./Graphics/Palette";
import { Tileset } from "./Graphics/Tileset";
import { Display } from "./Graphics/Display";
import { Cursor } from "./Graphics/Cursor";
import { TileSeq } from "./Graphics/TileSeq";
import { DefaultTileset } from "./Graphics/DefaultTileset";
import { Loop, LoopStack } from "./Interpreter/LoopStack";
import { CallStack } from "./Interpreter/CallStack";
import { Logger } from "./Interpreter/Logger";
import { DefaultPalette } from "./Graphics/DefaultPalette";
import { Comparison } from "./Interpreter/Comparison";
import { ProgramLineType } from "./Parser/ProgramLineType";
import { IfStack } from "./Interpreter/IfStack";
import { FmtStringPrinter } from "./Interpreter/FmtStringPrinter";
import { KeyboardInput } from "./Input/KeyboardInput";

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
    cycleCounter: number;
    readonly log: Logger;
    readonly displayElement: HTMLElement;
    readonly commands: Commands;
    readonly intp: Interpreter;
    readonly keyboard: KeyboardInput;

    private readonly animationInterval: number = 400;
    private readonly parser: Parser;
    private readonly program: Program;
    private readonly cycleExecHandle: number;
    private stopRequested: boolean;
    private programPtr: number;
    private branching: boolean;
    currentLine: ProgramLine | null;
    private pauseCycles: number;
    private callStack: CallStack;
    private loopStack: LoopStack;
    private ifStack: IfStack;
    private stringFmt: FmtStringPrinter;

    constructor(displayElement: HTMLElement, srcPtml: string) {
        // Initialize objects
        this.displayElement = displayElement;
        this.display = null;
        this.log = new Logger();
        this.stopRequested = false;
        this.cycleCounter = 0;
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter(this, this.program);
        this.commands = new Commands(this, this.intp);
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.pauseCycles = 0;
        this.callStack = new CallStack();
        this.loopStack = new LoopStack();
        this.ifStack = new IfStack();
        this.vars = {};
        this.arrays = {};
        this.palette = new Palette();
        this.tileset = new Tileset();
        this.cursor = null;
        this.currentTile = new TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;
        this.stringFmt = new FmtStringPrinter(this);
        this.keyboard = new KeyboardInput(this);
        // Configure defaults
        DefaultPalette.init(this.palette);
        DefaultTileset.init(this.tileset);
        // Begin program execution
        this.cycleExecHandle = this.start();
    }

    start(): number {
        this.log.info("Machine running...");
        return window.requestAnimationFrame(() => this.cycle());
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
        this.cycleCounter++;
        if (this.cycleCounter >= Number.MAX_SAFE_INTEGER) {
            this.cycleCounter = 0;
        }
        if (!this.stopRequested) {
            window.requestAnimationFrame(() => this.cycle());
        }
    }

    stop(reason?: string) {
        this.stopRequested = true;
        window.cancelAnimationFrame(this.cycleExecHandle);
        this.keepVsyncAfterStopping();

        let msg = "Machine stopped\nReason: ";
        if (reason) {
            msg += reason;
        } else {
            msg += "Manual stop request";
        }
        console.log(msg);
    }

    keepVsyncAfterStopping() {
        if (this.display) {
            this.display.update();
        }
        window.requestAnimationFrame(() => this.keepVsyncAfterStopping());
    }

    reset() {
        this.log.info("Machine reset");
        this.stopRequested = false;
        this.cycleCounter = 0;
        this.programPtr = 0;
        this.branching = true;
        this.display?.reset();
        if (this.display && this.cursor) {
            this.cursor.reset(this.display.getDefaultBuffer());
        }
        this.callStack.clear();
        this.loopStack.clear();
        this.vars = {};
        this.arrays = {};
        this.pauseCycles = 0;
        this.currentTile = new TileSeq();
        this.currentTextFgc = 1;
        this.currentTextBgc = 0;
        DefaultPalette.init(this.palette);
        DefaultTileset.init(this.tileset);
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
        if (!this.callStack.isEmpty()) {
            this.programPtr = this.callStack.pop()!;
            this.branching = true;
        } else {
            throw new PTM_RuntimeError("Call stack is empty", this.currentLine!);
        }
    }

    setVar(id: string, value: any) {
        this.vars[id] = value.toString();
    }

    pause(cycles: number) {
        this.pauseCycles = cycles;
    }

    printFmtTileStringAtCursorPos(fmt: string) {
        if (this.cursor && this.display) {
            this.stringFmt.print(fmt, this.cursor, this.currentTextFgc, this.currentTextBgc, this.currentTile.transparent);
            if (this.stringFmt.error) {
                throw new PTM_RuntimeError(`${this.stringFmt.error}: ${fmt}`, this.currentLine!);
            }
        }
    }

    printRawTileStringAtCursorPos(str: string) {
        if (this.cursor && this.display) {
            this.cursor.buffer.setTileString(str, this.cursor, this.currentTextFgc, this.currentTextBgc, this.currentTile.transparent);
        }
    }

    beginLoop(varId: string, first: number, last: number, step: number) {
        if (step === 0) {
            throw new PTM_RuntimeError("Invalid loop increment: 0", this.currentLine!);
        }
        this.vars[varId] = first.toString();
        const loop = new Loop();
        loop.isArray = false;
        loop.lineIxBegin = this.programPtr + 1;
        loop.varId = varId;
        loop.current = first;
        loop.first = first;
        loop.last = last;
        loop.step = step;
        this.loopStack.push(loop);
    }

    beginArrayLoop(arr: string[], arrId: string, iterVarId: string) {
        if (arr.length > 0) {
            this.vars[iterVarId] = arr[0];
        }
        const loop = new Loop();
        loop.isArray = true;
        loop.lineIxBegin = this.programPtr + 1;
        loop.arrayId = arrId;
        loop.iterationVariable = iterVarId;
        loop.current = 0;
        loop.first = 0;
        loop.last = arr.length - 1;
        loop.step = 1;
        this.loopStack.push(loop);
    }

    endLoop() {
        if (this.loopStack.isEmpty()) {
            return;
        }
        const loop = this.loopStack.top();
        if (!loop) {
            throw new PTM_RuntimeError("Loop stack is empty", this.currentLine!);
        }
    
        if (loop.isArray) {
            if (loop.current >= loop.last) { // Array loop ended
                this.loopStack.pop();
                return;
            }
            // Next array element
            loop.current++;
            const arr = this.arrays[loop.arrayId];
            this.vars[loop.iterationVariable] = arr[loop.current];
   
        } else {
            const nextValue = loop.current + loop.step;
            if (loop.step > 0) {
                if (nextValue > loop.last) { // Loop ended
                    this.loopStack.pop();
                    return;
                }
            } else if (loop.step < 0) {
                if (nextValue < loop.last) { // Loop ended
                    this.loopStack.pop();
                    return;
                }
            }
            // Next iteration
            loop.current = nextValue;
            this.vars[loop.varId] = nextValue.toString();
        }
    
        this.programPtr = loop.lineIxBegin;
        this.branching = true;
    }

    abortLoop() {
        if (this.loopStack.isEmpty()) {
            return;
        }
        this.loopStack.pop();
        
        let endForPtr = -1;
        for (let i = this.programPtr; i < this.program.length(); i++) {
            const line = this.program.lines[i];
            if (line.type === ProgramLineType.EndFor) {
                endForPtr = i;
                break;
            }
        }
        this.programPtr = endForPtr + 1;
        this.branching = true;
    }

    skipLoopIteration() {
        this.endLoop();
    }

    beginIfBlock(cmp: Comparison, a: string, b: string) {
        if (cmp === Comparison.Equal) {
            if (a == b) { return; } else { this.gotoMatchingEndIf(); }
        } else if (cmp === Comparison.NotEqual) {
            if (a != b) { return; } else { this.gotoMatchingEndIf(); }
            
        } else {
            const numA = Number(a);
            if (Number.isNaN(numA)) return;
            const numB = Number(b);
            if (Number.isNaN(numB)) return;

            if (cmp === Comparison.Greater) {
                if (numA > numB) { return; } else { this.gotoMatchingEndIf(); }
            } else if (cmp === Comparison.GreaterOrEqual) {
                if (numA >= numB) { return; } else { this.gotoMatchingEndIf(); }
            } else if (cmp === Comparison.Lesser) {
                if (numA < numB) { return; } else { this.gotoMatchingEndIf(); }
            } else if (cmp === Comparison.LesserOrEqual) {
                if (numA <= numB) { return; } else { this.gotoMatchingEndIf(); }
            }
        }
    }

    private gotoMatchingEndIf() {
        let endIfPtr = -1;
        for (let i = this.programPtr; i < this.program.length(); i++) {
            const line = this.program.lines[i];
            if (line.type === ProgramLineType.If) {
                this.ifStack.push(i);
            } else if (line.type === ProgramLineType.EndIf) {
                if (this.ifStack.isEmpty()) {
                    endIfPtr = i;
                    break;
                } else {
                    this.ifStack.pop();
                    if (this.ifStack.isEmpty()) {
                        endIfPtr = i;
                        break;
                    }
                }
            }
        }
        this.programPtr = endIfPtr + 1;
        this.branching = true;
    }
}
