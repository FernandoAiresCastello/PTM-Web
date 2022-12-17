import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Command } from "../Parser/Command";
import { ProgramLine } from "../Parser/ProgramLine";

export class CommandValidator {

    programLine!: ProgramLine;

    commandExists(cmd: string): boolean {
        return Object.values(Command).includes(cmd as Command);
    }

    argc(expectedArgc: number) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc && actualArgc !== expectedArgc) {
            throw new PTM_RuntimeError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`, this.programLine);
        }
    }

    argcMinMax(min: number, max: number) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            throw new PTM_RuntimeError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`, this.programLine);
        }
    }
}
