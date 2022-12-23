import { Tile } from "./Tile";

export class TileSeq {

    frames: Tile[] = [];

    deleteAll() {
        this.frames = [];
    }

    add(ix: number, fgc: number, bgc: number) {
        const frame = new Tile();
        frame.set(ix, fgc, bgc);
        this.frames.push(frame);
    }

    set(frame: number, ix: number, fgc: number, bgc: number) {
        this.frames[frame].set(ix, fgc, bgc);
    }

    setSingle(ix: number, fgc: number, bgc: number) {
        this.deleteAll();
        this.add(ix, fgc, bgc);
    }

    isEmpty(): boolean {
        return this.frames.length === 0;
    }
}
