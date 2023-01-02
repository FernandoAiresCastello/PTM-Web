export class Perfmon {

    startTimeMs: number = 0;
    endTimeMs: number = 0;
    timeDiffMs: number = 0;

    constructor() {
        this.start();
    }

    start(): number {
        this.startTimeMs = performance.now();
        return this.startTimeMs;
    }

    end(): number {
        this.endTimeMs = performance.now();
        this.timeDiffMs = this.endTimeMs - this.startTimeMs;
        return this.timeDiffMs;
    }
}
