import { CommandExecutor } from "./CommandExecutor";
import { CommandValidator } from "./CommandValidator";
import { Param } from "../Parser/Param";

export interface InterpreterContext {
    executor: CommandExecutor;
    validator: CommandValidator;
    param: Param[];
}
