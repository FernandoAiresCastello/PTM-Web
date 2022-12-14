import { ProgramLineType } from "./ProgramLineType";
import { Param } from "./Param";
import { ExecutionTime } from "./ExecutionTime";

export class ProgramLine {

    src: string;
    lineNr: number;
    type: ProgramLineType;
    execTime: ExecutionTime;
    cmd: string | null;
    params: Param[];

    constructor(src: string, lineNr: number) {
        this.src = src.trim();
        this.lineNr = lineNr;
        this.type = ProgramLineType.Undefined;
        this.execTime = ExecutionTime.Undefined;
        this.cmd = null;
        this.params = [];
    }

    toString(): string {
        return this.src;
    }
}
