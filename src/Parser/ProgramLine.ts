import { ProgramLineType } from "./ProgramLineType";
import { Command } from "./Command";
import { Param } from "./Param";

export class ProgramLine {

    type: ProgramLineType;
    src: string;
    lineNr: number;
    cmd: Command | null;
    params: Param[];

    constructor(src: string, lineNr: number) {
        this.type = ProgramLineType.Undefined;
        this.src = src;
        this.lineNr = lineNr;
        this.cmd = null;
        this.params = [];
    }

    toString(): string {
        return this.src;
    }
}
