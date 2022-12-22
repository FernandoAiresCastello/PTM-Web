import { TileBufferLayer } from "./TileBufferLayer";
import { Viewport } from "./Viewport";

export class TileBuffer {

    visible: boolean;    
    readonly id: string;
    readonly layerCount: number;
    readonly width: number;
    readonly height: number;
    readonly size: number;
    readonly layers: TileBufferLayer[];
    readonly view: Viewport;

    constructor(id: string, layerCount: number, w: number, h: number) {
        this.id = id;
        this.layerCount = layerCount;
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.layers = [];
        for (let i = 0; i < layerCount; i++) {
            const emptyLayer = new TileBufferLayer(w, h);
            this.layers.push(emptyLayer);
        }
        this.view = new Viewport(0, 0, w, h);
        this.visible = true;
    }

    clearAllLayers() {
        for (let i = 0; i < this.layerCount; i++) {
            this.clearLayer(i);
        }
    }

    clearLayer(layer: number) {
        this.layers[layer].clear();
    }
}
