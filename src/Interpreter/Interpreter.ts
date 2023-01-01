import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { ColorString } from "../Graphics/ColorTypes";
import { PTM } from "../PTM";
import { Param } from "../Parser/Param";
import { ParamType } from "../Parser/ParamType";
import { Program } from "../Parser/Program";
import { ProgramLine } from "../Parser/ProgramLine";

export class Interpreter {

    ptm: PTM;
    program: Program;
    programLine!: ProgramLine;

    constructor(ptm: PTM, program: Program) {
        this.ptm = ptm;
        this.program = program;
    }

    static isValidIdentifier(id: string): boolean {
        return id.match(/^[$A-Z_][0-9A-Z._$]*$/i) !== null;
    }

    getArg(paramIx: number): Param {
        return this.programLine.params[paramIx];
    }

    argc(expectedArgc: number) {
        const actualArgc = this.programLine.params.length;
        if (actualArgc !== expectedArgc) {
            throw new PTM_RuntimeError(`Invalid parameter count. Expected ${expectedArgc}, got ${actualArgc}`, this.programLine);
        }
    }

    argcMinMax(min: number, max: number): number {
        const actualArgc = this.programLine.params.length;
        if (actualArgc < min || actualArgc > max) {
            throw new PTM_RuntimeError(`Invalid parameter count. Expected from ${min} to ${max}, got ${actualArgc}`, this.programLine);
        }
        return actualArgc;
    }

    private getStringValueFromVariable(id: string): string {
        const value = this.ptm.vars[id];
        if (value === undefined) {
            throw new PTM_RuntimeError(`Variable not found: ${id}`, this.programLine);
        }
        return value;
    }

    private getNumericValueFromVariable(id: string): number {
        const str = this.getStringValueFromVariable(id);
        const num = Number(str);
        if (Number.isNaN(num)) {
            throw new PTM_RuntimeError(`Expected a number, got string: ${str}`, this.programLine);
        }
        return num;
    }

    private getStringValueFromArrayElement(param: Param): string {
        if (!param.arrayAccess || !param.arrayAccess.arrayId) {
            throw new PTM_RuntimeError(`Array access expected`, this.programLine);
        }
        const arrayId = param.arrayAccess.arrayId;
        const arr = this.ptm.arrays[arrayId];
        if (arr === undefined) {
            throw new PTM_RuntimeError(`Array not found: ${arrayId}`, this.programLine);
        }
        if (param.type === ParamType.ArrayIxLiteral) {
            const ix = param.arrayAccess.ixLiteral;
            if (ix !== undefined && ix !== null) {
                const value = arr[ix];
                if (value === undefined) {
                    throw new PTM_RuntimeError(`Index out of bounds for array ${arrayId}: ${ix}`, this.programLine);
                }
                return value;
            }
        } else if (param.type === ParamType.ArrayIxVarIdentifier) {
            const ixVar = param.arrayAccess.ixVariable;
            if (ixVar) {
                const ix = this.getNumericValueFromVariable(ixVar);
                if (ix !== undefined && ix !== null) {
                    const value = arr[ix];
                    if (value === undefined) {
                        throw new PTM_RuntimeError(`Index out of bounds for array ${arrayId}: ${ix}`, this.programLine);
                    }
                    return value;
                }
            }
        }
        throw new PTM_RuntimeError(`Could not get string from array element`, this.programLine);
    }

    private getNumericValueFromArrayElement(param: Param): number {
        const str = this.getStringValueFromArrayElement(param);
        const num = Number(str);
        if (Number.isNaN(num)) {
            throw new PTM_RuntimeError(`Expected a number, got string: ${str}`, this.programLine);
        }
        return num;
    }

    requireId(paramIx: number): string {
        const param = this.programLine.params[paramIx];
        if (param.type !== ParamType.Identifier) {
            throw new PTM_RuntimeError(`Identifier expected: ${param.src}`, this.programLine);
        }
        return param.text;
    }

    requireExistingVariable(paramIx: number): string {
        const varId = this.requireId(paramIx);
        const value = this.ptm.vars[varId];
        if (value === undefined) {
            throw new PTM_RuntimeError(`Variable not found: ${varId}`, this.programLine);
        }
        return varId;
    }

    requireString(paramIx: number): string {
        const param = this.programLine.params[paramIx];
        if (param.type === ParamType.StringLiteral) {
            return param.text;
        } else if (param.type === ParamType.CharLiteral) {
            return param.text;
        } else if (param.type === ParamType.NumberLiteral) {
            return param.text;
        } else if (param.type === ParamType.Identifier) {
            return this.getStringValueFromVariable(param.text);
        } else if (param.type === ParamType.ArrayIxLiteral || param.type === ParamType.ArrayIxVarIdentifier) {
            return this.getStringValueFromArrayElement(param);
        } else {
            throw new PTM_RuntimeError(`Could not get string from parameter`, this.programLine);
        }
    }

    requireNumber(paramIx: number): number {
        const param = this.programLine.params[paramIx];
        if (param.type === ParamType.StringLiteral) {
            if (Number.isNaN(param.number)) {
                throw new PTM_RuntimeError(`Could not convert string to number: "${param.text}"`, this.programLine);
            } else {
                return param.number;
            }
        } else if (param.type === ParamType.CharLiteral) {
            return param.number;
        } else if (param.type === ParamType.NumberLiteral) {
            return param.number;
        } else if (param.type === ParamType.Identifier) {
            return this.getNumericValueFromVariable(param.text);
        } else if (param.type === ParamType.ArrayIxLiteral || param.type === ParamType.ArrayIxVarIdentifier) {
            return this.getNumericValueFromArrayElement(param);
        } else {
            throw new PTM_RuntimeError(`Could not get number from parameter`, this.programLine);
        }
    }

    requireBoolean(paramIx: number): boolean {
        const value = this.requireNumber(paramIx);
        return value > 0;
    }

    requirePaletteIndex(paramIx: number): number {
        const paletteIx = this.requireNumber(paramIx);
        if (paletteIx >= 0 && paletteIx < this.ptm.palette.size()) {
            return paletteIx;
        }
        throw new PTM_RuntimeError(`Palette index out of bounds: ${paletteIx}`, this.programLine);
    }

    requireTilesetIndex(paramIx: number): number {
        const tilesetIx = this.requireNumber(paramIx);
        if (tilesetIx >= 0 && tilesetIx < this.ptm.tileset.size()) {
            return tilesetIx;
        }
        throw new PTM_RuntimeError(`Tileset index out of bounds: ${tilesetIx}`, this.programLine);
    }

    requireColor(paramIx: number): ColorString {
        const rgb = this.requireNumber(paramIx);
        const color = "#" + rgb.toString(16).padStart(6, "0");
        return color;
    }

    requireLabelTarget(paramIx: number): number {
        const label = this.programLine.params[paramIx].text;
        const prgLineIx = this.program.labels[label];
        if (prgLineIx === undefined) {
            throw new PTM_RuntimeError(`Label not found: ${label}`, this.programLine);
        }
        return prgLineIx;
    }

    isArray(paramIx: number): boolean {
        const arrayId = this.programLine.params[paramIx].text;
        const arr = this.ptm.arrays[arrayId];
        return arr !== undefined;
    }

    requireExistingArray(paramIx: number): string[] {
        const arrayId = this.programLine.params[paramIx].text;
        const arr = this.ptm.arrays[arrayId];
        if (arr === undefined) {
            throw new PTM_RuntimeError(`Array not found: ${arrayId}`, this.programLine);
        }
        return arr;
    }

    requireArraySubscript(paramIx: number): {arrayId: string, ix: number} {
        const param = this.programLine.params[paramIx];
        if (param.arrayAccess && param.arrayAccess.arrayId) {
            let subscript = {arrayId: "", ix: -1};
            if (param.type === ParamType.ArrayIxLiteral && param.arrayAccess.ixLiteral !== null && param.arrayAccess.ixLiteral !== undefined) {
                subscript = { 
                    arrayId: param.arrayAccess.arrayId,
                    ix: param.arrayAccess.ixLiteral 
                };
            } else if (param.type === ParamType.ArrayIxVarIdentifier && param.arrayAccess.ixVariable) {
                subscript = { 
                    arrayId: param.arrayAccess.arrayId,
                    ix: this.getNumericValueFromVariable(param.arrayAccess.ixVariable)
                };
            }
            const arr = this.ptm.arrays[subscript.arrayId];
            const ix = subscript.ix;
            if (arr === undefined) {
                throw new PTM_RuntimeError(`Array not found: ${subscript.arrayId}`, this.programLine);
            }
            const value = arr[ix];
            if (value === undefined) {
                throw new PTM_RuntimeError(`Index out of bounds for array ${subscript.arrayId}: ${ix}`, this.programLine);                
            }
            return subscript;
        }
        throw new PTM_RuntimeError(`Array access expected: ${param.src}`, this.programLine);
    }
}
