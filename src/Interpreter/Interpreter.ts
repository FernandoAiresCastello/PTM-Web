import { CommandValidator } from "./CommandValidator";
import { Param } from "../Parser/Param";

export interface Interpreter {
    validator: CommandValidator;
    param: Param[];
}
