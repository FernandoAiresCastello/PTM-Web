export class PixelBlock {

    static readonly Width = 8;
    static readonly Height = 8;
    static readonly Size = this.Width * this.Height;
    static readonly PixelOn: string = '1';
    static readonly PixelOff: string = '0';

    pixels: string;

    constructor() {
        this.pixels = "";
        this.clear();
    }

    clear() {
        this.pixels = "";
        for (let i = 0; i < PixelBlock.Size; i++) {
            this.pixels += PixelBlock.PixelOff;
        }
    }

    toString(): string {
        return this.pixels;
    }

    getPixelRowsAsNumbers(): number[] {
        let bytes = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            bytes.push(this.getPixelRowAsNumber(row));
        }
        return bytes;
    }

    getPixelRowAsNumber(pixelRow: number): number {
        const binary = this.getPixelRowAsBinaryString(pixelRow);
        const rowPixels = Number.parseInt(binary, 2);
        return rowPixels;
    }

    getPixelRowAsBinaryString(pixelRow: number): string {
        const bitIndex = pixelRow * PixelBlock.Width;
        let binary = "";
        for (let i = bitIndex; i < bitIndex + PixelBlock.Width; i++) {
            binary += this.pixels[i];
        }
        return binary;
    }

    getPixelRowsAsBinaryStrings(): string[] {
        let str = [];
        for (let row = 0; row < PixelBlock.Height; row++) {
            str.push(this.getPixelRowAsBinaryString(row));
        }
        return str;
    }
}
