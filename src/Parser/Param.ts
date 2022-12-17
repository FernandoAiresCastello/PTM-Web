import { PTM_ParseError } from "../Errors/PTM_ParseError";
import { ArrayAccess } from "./ArrayAccess";
import { NumberBase } from "./NumberBase";
import { ParamType } from "./ParamType";
import { ProgramLine } from "./ProgramLine";

export class Param {

    type: ParamType;
    text: string;
    number: number;
    arrayAccess: ArrayAccess | null;

    static readonly StringLitDelimiter = "\"";
    static readonly CharLitDelimiter = "'";
    static readonly HexPrefix = "&H";
    static readonly BinPrefix = "&B";
    static readonly ArrayLeftBrace = "[";
    static readonly ArrayRightBrace = "]";

    private readonly programLine: ProgramLine;
    private numericBase = NumberBase.None;
    private numericSign = "";

    constructor(programLine: ProgramLine, src: string) {
        this.programLine = programLine;
        this.text = src;
        this.arrayAccess = null;
        this.type = this.parseType(src);
        this.text = this.maybeTransformText();
        this.number = this.tryParseNumber();
    }

    toString(): string {
        if (this.type === ParamType.NumberLiteral) {
            return ` ${this.number} (${this.type} | ${this.numericBase})`;
        } else {
            return ` ${this.text} (${this.type})`;
        }
    }

    private parseType(src: string): ParamType {
        if (src.length === 0) {
            return ParamType.Empty;
        }
        if (src.length > 1 && (src[0] === "-" || src[0] === "+")) {
            this.numericSign = src[0];
            src = src.substring(1);
        }
        const srcPrefix = src.length > 2 ? src.substring(0, 2).toUpperCase() : "";

        if (src[0] === Param.StringLitDelimiter && src[src.length - 1] === Param.StringLitDelimiter) {
            return ParamType.StringLiteral;
        } else if (src[0] === Param.CharLitDelimiter && src[src.length - 1] === Param.CharLitDelimiter) {
            return ParamType.CharLiteral;
        } else if (srcPrefix === Param.HexPrefix) {
            this.numericBase = NumberBase.Hexadecimal;
            return ParamType.NumberLiteral;
        } else if (srcPrefix === Param.BinPrefix) {
            this.numericBase = NumberBase.Binary;
            return ParamType.NumberLiteral;
        } else if (this.isValidIdentifier(src)) {
            return ParamType.Identifier;
        } else if (src[0].match(/[0-9]/)) {
            this.numericBase = NumberBase.Decimal;
            return ParamType.NumberLiteral;
        } else if (src[0].match(/[a-z]/i)) {
            const ixLeftBrace = src.indexOf(Param.ArrayLeftBrace);
            const ixRightBrace = src.indexOf(Param.ArrayRightBrace);
            if (ixLeftBrace > 0 && ixRightBrace > ixLeftBrace + 1) {
                const id = src.substring(0, ixLeftBrace);
                const subscript = src.substring(ixLeftBrace + 1, ixRightBrace);
                if (this.isValidIdentifier(subscript)) {
                    this.arrayAccess = {
                        arrayId: id,
                        ixLiteral: null,
                        ixVariable: subscript
                    };
                    return ParamType.ArrayIxVarIdentifier;
                } else {
                    const index = Number(subscript.toUpperCase().replace(Param.HexPrefix, "0x").replace(Param.BinPrefix, "0b"));
                    if (Number.isNaN(index) || index < 0) {
                        throw new PTM_ParseError(`Invalid array subscript: ${subscript}`, this.programLine);
                    }
                    this.arrayAccess = {
                        arrayId: id,
                        ixLiteral: index,
                        ixVariable: null
                    };
                    return ParamType.ArrayIxLiteral;
                }
            } 
        }
        throw new PTM_ParseError(`Could not parse parameter: ${src}`, this.programLine);
    }

    private isValidIdentifier(src: string): boolean {
        return src.match(/^[$A-Z_][0-9A-Z._$]*$/i) !== null;
    }

    private maybeTransformText(): string {
        if (this.type === ParamType.StringLiteral) {
            return this.unenclose(this.text);
        } else if (this.type === ParamType.CharLiteral) {
            if (this.text.length === 3) {
                return this.unenclose(this.text);
            } else {
                throw new PTM_ParseError(`Invalid character literal: ${this.text}`, this.programLine);
            }
        } else if (this.type == ParamType.NumberLiteral) {
            return this.text;
        }
        return this.text;
    }

    private unenclose(str: string): string {
        if (str.length > 2) {
            return str.substring(1, this.text.length - 1);
        } else {
            return "";
        }
    }

    private tryParseNumber(): number {
        let num = NaN;
        let str = this.text.toUpperCase().replace("-", "").replace("+", "");
        if (this.type === ParamType.NumberLiteral) {
            if (this.numericBase == NumberBase.Hexadecimal) {
                str = str.replace(Param.HexPrefix, "0x");
                num = Number(str);
            } else if (this.numericBase == NumberBase.Binary) {
                str = str.replace(Param.BinPrefix, "0b");
                num = Number(str);
            } else {
                num = Number(str);
            }
        } else if (this.type === ParamType.CharLiteral) {
            num = this.text.charCodeAt(0);
        } else if (this.type === ParamType.StringLiteral) {
            num = Number(this.text);
        }
        if (this.type !== ParamType.StringLiteral && this.numericSign === "-") {
            num = num * -1;
        }
        return num;
    }
}
