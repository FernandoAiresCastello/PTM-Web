export class Loop {

    lineIxBegin: number = 0;

    variable: string = "";
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
}
