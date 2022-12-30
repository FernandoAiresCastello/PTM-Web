import { ProgramLine } from "../Parser/ProgramLine";

export class Logger {

    trace: boolean = false;

    private readonly varPrintStyle = "color:#0ff";
    private readonly cmdExecPrintStyle = "color:#ff0";

    info(msg: string) {
        console.log(msg);
    }

    printVariableOrArray(id: string, value: string | string[]) {
        let msg = id + " = %c";
        if (Array.isArray(value)) {
            msg += "[";
            for (let i = 0; i < value.length; i++) {
                msg += `"${value[i]}"`;
                if (i < value.length - 1) {
                    msg += ", ";
                }
            }
            msg += "]";
        } else {
            msg += value;
        }
        console.log(msg, this.varPrintStyle);
    }

    printCommandExecution(programLine: ProgramLine) {
        if (this.trace) {
            console.log(` ${programLine.lineNr}: %c${programLine.src}`, this.cmdExecPrintStyle);
        }
    }
}
