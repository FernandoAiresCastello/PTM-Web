import { Command } from "../Parser/Command"
import { InterpreterContext } from "./InterpreterContext"

export type CommandDictionary = {
    [cmd in Command] : (ctx: InterpreterContext) => void;
}
