import { ParseError } from "../Errors/ParseError";
import { PTM } from "../PTM";
import { Program } from "./Program";
import { ProgramLine } from "./ProgramLine";
import { ProgramLineType } from "./ProgramLineType";

export class Parser {
    
    private ptm: PTM;
    private srcPtml: string;
    private program: Program;

    private readonly crlf: string = "\n";

    constructor(ptm: PTM, srcPtml: string) {
        this.ptm = ptm;
        this.srcPtml = srcPtml;
        this.program = new Program();
    }

    parse() : Program {
        this.program.lines = [];
        let lineNr = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            lineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, lineNr);
            if (newPrgLine.type === ProgramLineType.RuntimeCommand) {
                this.program.addLine(newPrgLine);
            } else if (newPrgLine.type === ProgramLineType.CompilerCommand) {
                this.ptm.cmdExec.execute(newPrgLine);
            } else if (newPrgLine.type === ProgramLineType.Undefined) {
                throw new ParseError("Undefined program line type", newPrgLine);
            } else if (newPrgLine.type === ProgramLineType.Ignore) {
                // Ignorable PTML source code line
            }
        });
        return this.program;
    }

    private parseSrcLine(srcLine: string, lineNr: number): ProgramLine {
        const line = new ProgramLine(srcLine, lineNr);
        if (line.src.trim() === "" || line.src.trim().startsWith("#")) {
            line.type = ProgramLineType.Ignore;
        }
        return line;
    }
}
