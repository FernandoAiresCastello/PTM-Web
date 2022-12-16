import { Program } from "./Program";

export class Parser {
    
    private srcPtml: string;
    private program: Program;

    constructor(srcPtml: string) {
        this.srcPtml = srcPtml;
        this.program = new Program();
    }

    parse() : Program {
        // TO DO: parse the this.srcPtml and build the AST into this.program.lines
        return this.program;
    }
}
