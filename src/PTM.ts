import { PTM_InitializationError } from "./Errors/PTM_InitializationError";
import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { Environment } from "./Runtime/Environment";
import { CommandValidator } from "./Interpreter/CommandValidator";

document.addEventListener("DOMContentLoaded", () => {
    let ptmlElement = document.querySelector('script[type="text/ptml"]');
    if (ptmlElement === null || ptmlElement.textContent === null) {
        throw new PTM_InitializationError("PTML script not found");
    }
    let displayElement = document.getElementById("display");
    if (displayElement === null) {
        throw new PTM_InitializationError("Display element not found");
    }
    (window as any).PTM = new PTM(displayElement, ptmlElement.textContent);
});

export class PTM {

    readonly executor: CommandExecutor;
    readonly validator: CommandValidator;
    private readonly env: Environment;
    private readonly parser: Parser;
    private readonly program: Program;
    
    constructor(displayElement: HTMLElement,  srcPtml: string) {

        this.env = new Environment(displayElement);
        this.validator = new CommandValidator();
        this.executor = new CommandExecutor(this, this.env, this.validator);
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();

        this.start();
    }

    start() {
        // TODO: This should run asynchronously at 1ms intervals
        this.program.lines.forEach(line => {
            this.executor.execute(line);
        });
    }

    log(msg: string) {
        console.log(`PTM -> ${msg}`);
    }
}
