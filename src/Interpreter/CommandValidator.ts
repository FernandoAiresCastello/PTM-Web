import { ProgramLine } from "../Parser/ProgramLine";

export class CommandValidator {

    programLine!: ProgramLine;

    private throwError(msg: string) {
        throw new Error(`${msg}\nSource line: ${this.programLine.line_nr} ${this.programLine.src}`);
    }

    argc(expectedArgc: number) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc && actualArgc !== expectedArgc) {
            this.throwError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`);
        }
    }

    argcMinMax(min: number, max: number) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            this.throwError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`);
        }
    }
}
