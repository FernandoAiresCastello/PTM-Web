import { Command } from "../Parser/Command"
import { Interpreter } from "./Interpreter"
import { Environment } from "../Runtime/Environment"

export type CommandDictionary = {
    [cmd in Command] : (intp: Interpreter, env: Environment) => void;
}
