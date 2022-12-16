import { ParamType } from "./ParamType";

export class Param {

    type: ParamType;
    textual_value: string;
    numeric_value: number;

    constructor(src: string) {
        this.type = ParamType.Undefined;
        this.textual_value = src;
        this.numeric_value = Number(src);
    }

    toString(): string {
        return this.textual_value;
    }
}
