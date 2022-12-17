import { PTM_ParseError } from "../Errors/PTM_ParseError";
import { NumberBase } from "./NumberBase";
import { ParamType } from "./ParamType";
import { ProgramLine } from "./ProgramLine";

export class Param {

    type: ParamType;
    text: string;
    number: number;

    private readonly programLine: ProgramLine;
    private numericBase = NumberBase.None;
    private numericSign = "";

    constructor(programLine: ProgramLine, src: string) {
        this.programLine = programLine;
        this.text = src;
        this.type = this.determineType(src);
        this.text = this.maybeTransformText();
        this.number = this.tryParseNumber();
    }

    toString(): string {
        if (this.type === ParamType.NumberLiteral) {
            return ` ${this.text} (${this.type} | ${this.numericBase} | Sign:${this.numericSign ? this.numericSign : "None"})`;
        } else {
            return ` ${this.text} (${this.type})`;
        }
    }

    private determineType(src: string): ParamType {
        if (src.length === 0) {
            return ParamType.Empty;
        }
        if (src.length > 1 && (src[0] === "-" || src[0] === "+")) {
            this.numericSign = src[0];
            src = src.substring(1);
        }
        const srcPrefix = src.length > 2 ? src.substring(0, 2).toUpperCase() : "";

        if (src[0] === "\"" && src[src.length - 1] === "\"") {
            return ParamType.StringLiteral;
        } else if (src[0] === "'" && src[src.length - 1] === "'") {
            return ParamType.CharLiteral;
        } else if (srcPrefix === "&H") {
            this.numericBase = NumberBase.Hexadecimal;
            return ParamType.NumberLiteral;
        } else if (srcPrefix === "&B") {
            this.numericBase = NumberBase.Binary;
            return ParamType.NumberLiteral;
        } else if (src[0].match(/[0-9]/)) {
            this.numericBase = NumberBase.Decimal;
            return ParamType.NumberLiteral;
        } else if (src[0].match(/[a-z]/i)) {
            return ParamType.Identifier;
        } else {
            throw new PTM_ParseError(`Could not parse parameter type: ${src}`, this.programLine);
        }
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
                str = str.replace("&H", "0x");
                num = Number(str);
            } else if (this.numericBase == NumberBase.Binary) {
                str = str.replace("&B", "0b");
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
