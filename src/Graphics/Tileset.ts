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
        const tile = this.tiles[ix];
        const bitIndex = pixelRow * PixelBlock.Width;
        let currentPixels = tile.pixels;
        let newPixels = "";
        const binaryRow = byte.toString(2).padStart(PixelBlock.Width);
        for (let i = 0; i < currentPixels.length; i++) {
            if (i >= bitIndex && i < bitIndex + PixelBlock.Width) {
                newPixels += binaryRow[i % PixelBlock.Width];
            } else {
                newPixels += currentPixels[i];
            }
        }
        tile.pixels = newPixels;
    }

    get(ix: number): PixelBlock {
        return this.tiles[ix];
    }

    size(): number {
        return this.tiles.length;
    }
}
