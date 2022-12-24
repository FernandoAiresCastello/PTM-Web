import { TileSeq } from "./TileSeq";

export class TileBufferLayer {

    readonly width: number;
    readonly height: number;
    readonly size: number;
    readonly tiles: TileSeq[];

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.tiles = [];
        for (let i = 0; i < this.size; i++) {
            const emptyTile = new TileSeq();
            this.tiles.push(emptyTile);
        }
    }

    clear() {
        for (let i = 0; i < this.size; i++) {
            this.tiles[i].deleteAll();
        }        
    }

    setTile(tile: TileSeq, x: number, y: number) {
        this.tiles[y * this.width + x].setEqual(tile);
    }

    getTileCopy(x: number, y: number): TileSeq {
        const tile = new TileSeq();
        tile.setEqual(this.getTileRef(x, y));
        return tile;
    }

    getTileRef(x: number, y: number): TileSeq {
        return this.tiles[y * this.width + x];
    }
}
