export class Loop {

    lineIxBegin: number = 0;

    varId: string = "";
    current: number = 0;
    first: number = 0;
    last: number = 0;
    step: number = 0;

    isArray: boolean = false;
    arrayId: string = "";
    iterationVariable: string = "";
}

export class LoopStack {

    private loops: Loop[];

    constructor() {
        this.loops = [];
    }

    push(loop: Loop) {
        this.loops.push(loop);
    }

    pop(): Loop | undefined {
        return this.loops.pop();
    }

    top(): Loop | undefined {
        if (this.loops.length > 0) {
            return this.loops[this.loops.length - 1];
        } else {
            return undefined;
        }
    }

    isEmpty(): boolean {
        return this.loops.length === 0;
    }

    clear() {
        this.loops = [];
    }
}
