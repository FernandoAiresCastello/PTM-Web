import { PTM_InitializationError } from "./Errors/PTM_InitializationError";
import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { CommandValidator } from "./Interpreter/CommandValidator";
import { Display } from "./Graphics/Display";

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "=======================================================\n" +
        "  ~ Welcome to the PTM - Programmable Tile Machine! ~  \n" +
        "    Developed by: Fernando Aires Castello  (C) 2022    \n" +
        "=======================================================\n"
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
        this.intervalId = this.start();
    }

    log(msg: string) {
        console.log(`${msg}`);
    }

    start(): number {
        this.log("Interpreter started");
        return window.setInterval(() => this.cycle(), this.intervalLength);
    }

    cycle() {
        if (this.programPtr < this.program.length()) {
            this.executor.execute(this.program.lines[this.programPtr]);
            if (!this.branching) {
                this.programPtr++;
                if (this.programPtr >= this.program.length()) {
                    this.stop("Execution pointer past end of script");
                }
            } else {
                this.branching = false;
            }
        }
    }

    stop(reason: string) {
        window.clearInterval(this.intervalId);
        this.log(`Interpreter exited.\nReason: ${reason}`);
    }

    reset() {
        this.log("Machine reset");
        this.branching = true;
        this.programPtr = 0;
    }
}
