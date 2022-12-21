import { PTM_InitializationError } from "./Errors/PTM_InitializationError";
import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { Interpreter } from "./Interpreter/Interpreter";
import { ProgramLine } from "./Parser/ProgramLine";
import { Display } from "./Graphics/Display";
import { PTM_RuntimeError } from "./Errors/PTM_RuntimeError";
import { Variables } from "./Interpreter/Variables";
import { Arrays } from "./Interpreter/Arrays";

document.addEventListener("DOMContentLoaded", () => {

    console.log("%c" +
        "=======================================================\n" +
        "  ~ Welcome to the PTM - Programmable Tile Machine! ~  \n" +
        "    Developed by: Fernando Aires Castello  (C) 2022    \n" +
        "=======================================================",
        "color:#0f0"
    );

    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new PTM_InitializationError("PTML script tag not found");
    }
    console.log("PTML script loaded");

    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new PTM_InitializationError("Display element not found");
    }
    console.log("Display element found");

    (window as any).PTM = new PTM(displayElement, ptmlElement.textContent);
});

export class PTM {

    readonly executor: CommandExecutor;
    readonly intp: Interpreter;
    private readonly parser: Parser;
    private readonly program: Program;
    private readonly intervalLength: number;
    private programPtr: number;
    private intervalId: number;
    private branching: boolean;
    private currentLine: ProgramLine | null;
    private callStack: number[];
    displayElement: HTMLElement;
    display: Display | null;
    vars: Variables;
    arrays: Arrays;

    constructor(displayElement: HTMLElement, srcPtml: string) {

        this.displayElement = displayElement;
        this.display = null;
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intp = new Interpreter(this, this.program);
        this.executor = new CommandExecutor(this, this.intp);
        this.intervalLength = 255;
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.callStack = [];
        this.vars = {};
        this.arrays = {};
        this.intervalId = this.start();
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
        console.log(msg, "color:#0ff");
    }

    logExecution(programLine: ProgramLine) {
        console.log(` ${programLine.lineNr}: %c${programLine.src}`, `color:#ff0`);
    }

    start(): number {
        this.logInfo("Interpreter started");
        return window.setInterval(() => this.cycle(), this.intervalLength);
    }

    cycle() {
        if (this.programPtr >= this.program.length()) {
            this.stop("Execution pointer past end of script");
        } else {
            this.currentLine = this.program.lines[this.programPtr];
            try {
                this.executor.execute(this.currentLine);
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

    stop(reason?: string) {
        window.clearInterval(this.intervalId);
        const msg = "Interpreter exited";
        if (reason) {
            console.log(`${msg}\n%cReason: ${reason}`, "color:#888");
        } else {
            console.log(msg);
        }
    }

    reset() {
        this.logInfo("Machine reset");
        this.programPtr = 0;
        this.branching = true;
        this.display?.reset();
        this.callStack = [];
        this.vars = {};
        this.arrays = {};
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
}
