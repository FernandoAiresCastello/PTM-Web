import { ParseError } from "../Errors/ParseError";
import { PTM } from "../PTM";
import { Command } from "./Command";
import { ExecutionTime } from "./ExecutionTime";
import { Param } from "./Param";
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
        console.log("Compilation started");
        this.program.lines = [];
        let lineNr = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            lineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, lineNr);
            if (newPrgLine.type === ProgramLineType.Executable) {
                if (newPrgLine.execTime === ExecutionTime.RunTime) {
                    this.program.addLine(newPrgLine);
                } else if (newPrgLine.execTime === ExecutionTime.CompileTime) {
                    this.ptm.executor.execute(newPrgLine);
                } else if (newPrgLine.execTime === ExecutionTime.Undefined) {
                    throw new ParseError("Could not determine execution time for this line", newPrgLine);
                }
            } else if (newPrgLine.type === ProgramLineType.Undefined) {
                throw new ParseError("Could not determine type of this line", newPrgLine);
            } else if (newPrgLine.type === ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });
        console.log("Compilation finished");
        return this.program;
    }

    private parseSrcLine(srcLine: string, lineNr: number): ProgramLine {
        const line = new ProgramLine(srcLine, lineNr);
        if (this.isBlank(line.src) || this.isComment(line.src)) {
            line.type = ProgramLineType.Ignore;
        } else {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType.Executable;
            line.execTime = this.determineExecutionTime(line.cmd);
        }
        return line;
    }

    private extractCommand(line: ProgramLine): Command {
        let cmdName = "";
        const src = line.src.trim();
        const ixFirstSpace = src.indexOf(" ");
        if (ixFirstSpace >= 0) {
            cmdName = src.substring(0, ixFirstSpace).trim();
        } else {
            cmdName = src;
        }
        cmdName = cmdName.toUpperCase();
        if (this.ptm.executor.validator.commandExists(cmdName)) {
            return cmdName as Command;
        } else {
            throw new ParseError(`Command not recognized: ${cmdName}`, line);
        }
    }

    private extractParams(line: ProgramLine): Param[] {
        const src = line.src.trim();
        const ixFirstSpace = src.indexOf(" ");
        if (ixFirstSpace < 0) {
            return [];
        }
        let params: Param[] = [];
        const paramString = src.substring(ixFirstSpace);
        const paramList = this.splitParamString(paramString);
        paramList.forEach(rawParam => {
            const param = new Param(rawParam);
            params.push(param);
        })
        return params;
    }

    private splitParamString(paramString: string): string[] {
        let params : string[] = [];
        let quote = false;
        let param = "";
        for (let i = 0; i < paramString.length; i++) {
            const ch = paramString[i];
            if (ch == '\"') {
                quote = !quote;
                param += ch;
                if (!quote && i == paramString.length - 1) {
                    params.push(param.trim());
                    param = "";
                }
            } else if (!quote && ch == ',' || i == paramString.length - 1) {
                if (ch != ',') param += ch;
                params.push(param.trim());
                param = "";
            } else {
                param += ch;
            }
        }
        return params;
    }

    private determineExecutionTime(cmd: Command): ExecutionTime {
        if (cmd === Command.Data) {
            return ExecutionTime.CompileTime;
        } else {
            return ExecutionTime.RunTime;
        }
    }

    private isBlank(src: string): boolean {
        return src.trim() === "";
    }

    private isComment(src: string): boolean {
        return src.trim().startsWith("#");
    }
}
