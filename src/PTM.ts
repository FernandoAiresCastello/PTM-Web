import { Parser } from "./Parser/Parser";
import { Display } from "./Graphics/Display";
import { CommandExecutor } from "./Interpreter/CommandExecutor";

export class PTM {

    private parser: Parser;
    private cmdExec: CommandExecutor;
    private display: Display;

    constructor(displayElement: HTMLElement,  srcPtml: string) {
        
        this.parser = new Parser(srcPtml);
        const program = this.parser.parse();
        
        this.cmdExec = new CommandExecutor(this);

        program.lines.forEach(line => {
            this.cmdExec.execute(line);
        });

        this.display = new Display(displayElement, 256, 192, 3, 3);
    }
}
