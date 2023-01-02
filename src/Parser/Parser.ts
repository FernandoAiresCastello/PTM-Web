import { PTM_ParseError } from "../Errors/PTM_ParseError";
import { Interpreter } from "../Interpreter/Interpreter";
import { PTM } from "../PTM";
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
        this.ptm.log.info("Parse/compile started");
        this.program.lines = [];
        let srcLineNr = 0;
        let actualLineIndex = 0;
        const srcLines = this.srcPtml.trim().split(this.crlf);
        srcLines.forEach((srcLine) => {
            srcLineNr++;
            const newPrgLine = this.parseSrcLine(srcLine, srcLineNr);

            if (newPrgLine.type === ProgramLineType.Command || 
                newPrgLine.type === ProgramLineType.If || 
                newPrgLine.type === ProgramLineType.EndIf ||
                newPrgLine.type === ProgramLineType.EndFor) {

                if (newPrgLine.execTime === ExecutionTime.RunTime) {
                    this.program.addLine(newPrgLine);
                    actualLineIndex++;
                } else if (newPrgLine.execTime === ExecutionTime.CompileTime) {
                    this.ptm.commands.execute(newPrgLine);

                } else if (newPrgLine.execTime === ExecutionTime.Undefined) {
                    throw new PTM_ParseError("Could not determine execution time for this line", newPrgLine);
                }

            } else if (newPrgLine.type === ProgramLineType.Label) {
                const newLabel = newPrgLine.src;
                for (let existingLabel in this.program.labels) {
                    if (newLabel === existingLabel) {
                        throw new PTM_ParseError(`Duplicate label: ${newLabel}`, newPrgLine);
                    }
                }
                this.program.addLabel(newLabel, actualLineIndex);

            } else if (newPrgLine.type === ProgramLineType.Undefined) {
                throw new PTM_ParseError("Could not determine type of this line", newPrgLine);

            } else if (newPrgLine.type === ProgramLineType.Ignore) {
                // Ignore entire line
            }
        });

        this.ptm.log.info("Parse/compile finished normally");
        return this.program;
    }

    private parseSrcLine(srcLine: string, lineNr: number): ProgramLine {
        const line = new ProgramLine(srcLine, lineNr);
        if (this.isBlank(line.src) || this.isComment(line.src)) {
            line.type = ProgramLineType.Ignore;
        } else if (line.src.trim().endsWith(":")) {
            line.type = ProgramLineType.Label;
            line.src = line.src.substring(0, line.src.length - 1);
        } else if (line.src.trim().toUpperCase().startsWith("IF.")) {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType.If;
        } else if (line.src.trim().toUpperCase() === "ENDIF") {
            line.cmd = "ENDIF";
            line.type = ProgramLineType.EndIf;
        } else if (line.src.trim().toUpperCase() === "NEXT") {
            line.cmd = "NEXT";
            line.type = ProgramLineType.EndFor;
        } else {
            line.cmd = this.extractCommand(line);
            line.params = this.extractParams(line);
            line.type = ProgramLineType.Command;
        }
        line.execTime = this.determineExecutionTime(line.cmd!);
        return line;
    }

    private extractCommand(line: ProgramLine): string {
        let cmdName = "";
        const src = line.src.trim();
        const ixFirstSpace = src.indexOf(" ");
        if (ixFirstSpace >= 0) {
            cmdName = src.substring(0, ixFirstSpace).trim();
        } else {
            cmdName = src;
        }
        return cmdName.toUpperCase();
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
            const param = new Param(line, rawParam);
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

    private determineExecutionTime(cmd: string): ExecutionTime {
        if (cmd === "DATA") {
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
