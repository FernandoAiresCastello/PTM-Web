import { Command } from "./Command";
import { Param } from "./Param";

export class ProgramLine {

    src: string;
    line_nr: number;
    cmd: Command;
    params: Param[];

    constructor(src: string, line_nr: number) {
        this.src = src;
        this.line_nr = line_nr;
        this.cmd = Command.Nop;
        this.params = [];
    }
}
