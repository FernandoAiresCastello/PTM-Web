import { PTM_InitializationError } from "../Errors/PTM_InitializationError";
import { CanvasPoint } from "./CanvasPoint";

export class Display {

    private canvasElement: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private pixelBufWidth: number;
    private pixelBufHeight: number;
    private pixelBufSize: number;
    private pixels: string[];
    private pixelWidth: number;
    private pixelHeight: number;
    private pixelPositions: CanvasPoint[];

    constructor(parentElement: HTMLElement, bufWidth: number, bufHeight: number, pixelWidth: number, pixelHeight: number) {
        
        this.pixelBufWidth = bufWidth;
        this.pixelBufHeight = bufHeight;
        this.pixelBufSize = bufWidth * bufHeight;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        this.canvasWidth = bufWidth * pixelWidth;
        this.canvasHeight = bufHeight * pixelHeight;

        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.canvasWidth;
        this.canvasElement.height = this.canvasHeight;
        parentElement.append(this.canvasElement);

        let ctx = this.canvasElement.getContext("2d");
        if (ctx === null) {
            throw new PTM_InitializationError("Unable to create CanvasRenderingContext2D");
        }
        this.canvas = ctx;
        this.canvas.imageSmoothingEnabled = false;
        this.canvas.imageSmoothingQuality = 'low';
        this.pixelPositions = this.calculatePixelPositions();
        this.pixels = [];
        this.clearPixels('#000000');
        this.update();
    }

    private clearPixels(rgb: string) {
        for (let pos = 0; pos < this.pixelBufSize; pos++) {
            this.putPixelRgbLinear(pos, rgb);
        }
    }

    private putPixelRgbLinear(pos: number, rgb: string) {
        this.pixels[pos] = rgb;
    }

    private putPixelRgb(x: number, y: number, rgb: string) {
        this.pixels[y * this.pixelBufWidth + x] = rgb;
    }

    private update() {
        for (let i = 0; i < this.pixelPositions.length; i++) {
            const pos = this.pixelPositions[i];
            this.canvas.fillStyle = this.pixels[pos.index];
            this.canvas.fillRect(pos.x, pos.y, this.pixelWidth, this.pixelHeight);
        }
    }

    private calculatePixelPositions() : CanvasPoint[] {
        const positions = [];
        let canvasX = 0;
        let canvasY = 0;
        for (let pixelBufIndex = 0; pixelBufIndex < this.pixelBufSize; pixelBufIndex++) {
            positions.push(new CanvasPoint(canvasX, canvasY, pixelBufIndex));
            canvasX += this.pixelWidth;
            if (canvasX >= this.canvasWidth) {
                canvasX = 0;
                canvasY += this.pixelHeight;
            }
        }
        return positions;
    }

    // === Frame rendering tests ===

    private test1() {
        this.clearPixels('#ffff00');
        this.putPixelRgb(0, 0, '#ff0000');
        for (let x = 0; x < this.pixelBufWidth; x++) {
            this.putPixelRgb(x, 0, '#ff0000');
            this.putPixelRgb(x, this.pixelBufHeight - 1, '#ff0000');
        }
        for (let y = 0; y < this.pixelBufHeight; y++) {
            this.putPixelRgb(0, y, '#ff0000');
            this.putPixelRgb(this.pixelBufWidth - 1, y, '#ff0000');
        }
        this.update();
    }

    private test2() {
        for (let pos = 0; pos < this.pixelBufSize; pos++) {
            let color = '';
            const rnd = Math.floor(Math.random() * 3);
            if (rnd == 0) color = '#ff0000';
            else if (rnd == 1) color = '#00ff00';
            else if (rnd == 2) color = '#0000ff';
            this.putPixelRgbLinear(pos, color);
        }
        this.update();
    }
}
