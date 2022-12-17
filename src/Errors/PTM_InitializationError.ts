export class PTM_InitializationError extends Error {
    constructor(msg: string) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.stack = undefined;
        this.message = msg;
    }
}
