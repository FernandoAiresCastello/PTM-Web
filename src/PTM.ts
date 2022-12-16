import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { Display } from "./Graphics/Display";

export class PTM {

    display: Display | null;
    readonly displayElement: HTMLElement | null;
    readonly cmdExec: CommandExecutor;

    private parser: Parser;
    private program: Program;
    
    constructor(displayElement: HTMLElement,  srcPtml: string) {

        this.displayElement = displayElement;
        this.display = null;
        this.cmdExec = new CommandExecutor(this);
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();

        this.start();
    }

    start() {
        this.log("Machine started successfully!");

        this.program.lines.forEach(line => {
            this.cmdExec.execute(line);
        });

        // this.display = new Display(displayElement, 256, 192, 3, 3);
    }

    log(msg: string) {
        console.info(`PTM >>> ${msg}`);
    }

    error(msg: string) {
        console.error(`PTM >>> ${msg}`);
    }
}
