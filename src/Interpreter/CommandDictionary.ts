import { Command } from "../Parser/Command"

export type CommandDictionary = {
    [cmd in Command] : () => void;
}
