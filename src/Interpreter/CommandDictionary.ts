import { Command } from "../Parser/Command"
import { Interpreter } from "./Interpreter"

export type CommandDictionary = {
    [cmd in Command] : (intp: Interpreter) => void;
}
