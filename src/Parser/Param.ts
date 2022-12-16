import { ParamType } from "./ParamType";

export class Param {

    type: ParamType = ParamType.Undefined;
    src?: string;
    textual_value?: string;
    numeric_value?: number;
}
