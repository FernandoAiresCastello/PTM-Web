export class IfStack {

    programPtrs: number[];

    constructor() {
        this.programPtrs = [];
    }

    push(programPtr: number) {
        this.programPtrs.push(programPtr);
    }

    pop(): number | undefined {
        return this.programPtrs.pop();
    }

    isEmpty(): boolean {
        return this.programPtrs.length === 0;
    }

    clear() {
        this.programPtrs = [];
    }
}
