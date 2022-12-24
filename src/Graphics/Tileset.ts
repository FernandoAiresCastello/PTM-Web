import { PixelBlock } from "./PixelBlock";

export class Tileset {

    tiles: PixelBlock[];

    constructor() {
        this.tiles = this.init(256);
    }

    init(numberOfTiles: number): PixelBlock[] {
        this.tiles = [];
        for (let i = 0; i < numberOfTiles; i++) {
            this.tiles.push(new PixelBlock());
        }
        return this.tiles;
    }

    set(ix: number, tile: PixelBlock) {
        this.tiles[ix] = tile;
    }

    setPixelRow(ix: number, pixelRow: number, byte: number) {
        this.tiles[ix].setPixelRow(pixelRow, byte);
    }

    get(ix: number): PixelBlock {
        return this.tiles[ix];
    }

    size(): number {
        return this.tiles.length;
    }
}
