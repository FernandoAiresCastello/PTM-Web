import { ProgramLine } from "../Parser/ProgramLine";

export class RuntimeError extends Error {
    constructor(msg: string, programLine: ProgramLine) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = `${msg}\n\tLine: ${programLine.lineNr}\n\tSource: ${programLine.src.trim()}`;
    }
}
