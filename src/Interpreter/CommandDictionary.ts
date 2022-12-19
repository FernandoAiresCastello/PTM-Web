import { PTM } from "../PTM"
import { Command } from "../Parser/Command"
import { Interpreter } from "./Interpreter"

export type CommandDictionary = {
    [cmd in Command] : (ptm: PTM, intp: Interpreter) => void;
}
