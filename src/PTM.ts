import { Parser } from "./Parser/Parser";
import { Program } from "./Parser/Program";
import { CommandExecutor } from "./Interpreter/CommandExecutor";
import { Display } from "./Graphics/Display";
import { MachineRuntime } from "./Runtime/MachineRuntime";

export class PTM {

    static readonly InvalidNumber: number = Number.MIN_VALUE;

    display: Display | null;
    readonly displayElement: HTMLElement | null;
    readonly machineRuntime: MachineRuntime;
    readonly executor: CommandExecutor;

    private readonly parser: Parser;
    private readonly program: Program;
    
    constructor(displayElement: HTMLElement,  srcPtml: string) {

        this.displayElement = displayElement;
        this.display = null;
        this.machineRuntime = new MachineRuntime();
        this.executor = new CommandExecutor(this);
        this.parser = new Parser(this, srcPtml);
        this.program = this.parser.parse();

        this.start();
    }

    start() {
        console.log("Machine started");
        // TODO: This should run asynchronously at 1ms intervals
        this.program.lines.forEach(line => {
            this.executor.execute(line);
        });
    }
}
