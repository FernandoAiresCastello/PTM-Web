import { CommandValidator } from "./CommandValidator";
import { Param } from "../Parser/Param";
import { PTM } from "../PTM";

export interface Interpreter {
    ptm: PTM;
    validator: CommandValidator;
    param: Param[];
}
