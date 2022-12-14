export class Display {

    private canvasElement: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private elementWidth: number;
    private elementHeight: number;
    private pixelBufWidth: number;
    private pixelBufHeight: number;
    private imageData: ImageData;
    private pixels: number[];
    private pixelWidth: number;
    private pixelHeight: number;

    constructor(parentElement: HTMLElement, width: number, height: number, pixelWidth: number, pixelHeight: number) {
        this.pixelBufWidth = width;
        this.pixelBufHeight = height;
        this.elementWidth = width * pixelWidth;
        this.elementHeight = height * pixelHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;

        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.elementWidth;
        this.canvasElement.height = this.elementHeight;
        parentElement.append(this.canvasElement);

        let ctx = this.canvasElement.getContext("2d");
        if (ctx === null) {
            throw new Error("Unable to create CanvasRenderingContext2D");
        }
        this.canvas = ctx;
        this.canvas.imageSmoothingEnabled = false;
        this.canvas.imageSmoothingQuality = 'low';
        this.imageData = this.canvas.getImageData(0, 0, this.elementWidth, this.elementHeight);
        this.pixels = [];
        this.clearPixels(0x000000);
        this.test();
    }

    private test() {
        for (let i = 0; i < 1000; i++) {
            const x = Math.floor(Math.random() * this.pixelBufWidth);
            const y = Math.floor(Math.random() * this.pixelBufHeight);
            this.putPixelRgb(x, y, 0x00ff00);
        }
        this.update();
    }

    private clearPixels(rgb: number) {
        for (let y = 0; y < this.elementHeight; y++) {
            for (let x = 0; x < this.elementWidth; x++) {
                this.putPixelRgb(x, y, rgb);
            }
        }
    }

    private putPixelRgb(x: number, y: number, rgb: number) {
        this.pixels[y * this.elementWidth + x] = rgb;
    }

    update() {
        for (let y = 0; y < this.elementHeight; y++) {
            for (let py = 0; py < this.pixelHeight; py++) {
                const yOffset = (y * this.pixelHeight + py) * this.elementWidth;
                for (let x = 0; x < this.elementWidth; x++) {
                    for (let px = 0; px < this.pixelWidth; px++) {
                        let offset = yOffset + (x * this.pixelWidth + px);
                        const rgb = this.pixels[y * this.elementWidth + x];
                        this.imageData.data[offset * 4 + 0] = (rgb >> 16) & 0xff;
                        this.imageData.data[offset * 4 + 1] = (rgb >> 8) & 0xff;
                        this.imageData.data[offset * 4 + 2] = rgb & 0xff;
                        this.imageData.data[offset * 4 + 3] = 0xff;
                    }
                }
            }
        }
        this.canvas.putImageData(this.imageData, 0, 0);
    }
}
