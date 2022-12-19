import { PTM_InitializationError } from "./Errors/PTM_InitializationError";
import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { CommandValidator } from "./Interpreter/CommandValidator";
import { ProgramLine } from "./Parser/ProgramLine";
import { Display } from "./Graphics/Display";
import { PTM_RuntimeError } from "./Errors/PTM_RuntimeError";

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
    readonly validator: CommandValidator;
    private readonly parser: Parser;
    private readonly program: Program;
    private readonly intervalLength: number;
    private programPtr: number;
    private intervalId: number;
    private branching: boolean;
    displayElement: HTMLElement;
    display: Display | null;
    private currentLine: ProgramLine | null;

    constructor(displayElement: HTMLElement,  srcPtml: string) {

        this.displayElement = displayElement;
        this.display = null;
        this.validator = new CommandValidator();
        this.executor = new CommandExecutor(this, this.validator);
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();
        this.intervalLength = 255;
        this.programPtr = 0;
        this.branching = false;
        this.currentLine = null;
        this.intervalId = this.start();
    }

    logInfo(msg: string) {
        console.log(msg);
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
        if (reason) {
            console.log(`Interpreter exited.\n%cReason: ${reason}`, "color:#888");
        } else {
            console.log(`Interpreter exited`);
        }
    }

    reset() {
        this.logInfo("Machine reset");
        this.programPtr = 0;
        this.branching = true;
        this.display?.reset();
    }

    branchToLabel(label: string) {
        const prgLineIx = this.program.labels[label];
        if (prgLineIx !== undefined) {
            this.programPtr = prgLineIx;
            this.branching = true;
        } else {
            throw new PTM_RuntimeError(`Label not found: ${label}`, this.currentLine!);
        }
    }
}
