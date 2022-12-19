import { ProgramLabels } from "./ProgramLabels";
import { ProgramLine } from "./ProgramLine";

export class Program {

    lines: ProgramLine[];
    labels: ProgramLabels;

    constructor() {
        this.lines = [];
        this.labels = {};
    }

    addLine(line: ProgramLine) {
        this.lines.push(line);
    }

    addLabel(name: string, lineIx: number) {
        this.labels[name] = lineIx;
    }

    length() {
        return this.lines.length;
    }
}
