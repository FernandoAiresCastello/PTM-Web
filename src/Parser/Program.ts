import { ProgramLine } from "./ProgramLine";

export class Program {

    lines: ProgramLine[];

    constructor() {
        this.lines = [];
    }

    addLine(line: ProgramLine) {
        this.lines.push(line);
    }

    length() {
        return this.lines.length;
    }
}
