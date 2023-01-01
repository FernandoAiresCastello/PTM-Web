import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Cursor } from "../Graphics/Cursor";
import { TileSeq } from "../Graphics/TileSeq";
import { PTM } from "../PTM";

class TextColor {

    fg: number = 0;
    bg: number = 0;
    fgPrev: number = 0;
    bgPrev: number = 0;

    constructor(fg: number, bg: number) {
        this.fg = fg;
        this.bg = bg;
        this.fgPrev = fg;
        this.bgPrev = bg;
    }
}

export class FmtStringPrinter {
    
    ptm: PTM;
    error: string | null;

    constructor(ptm: PTM) {
        this.ptm = ptm;
        this.error = null;
    }

    print(fmt: string, csr: Cursor, initFgc: number, initBgc: number, transp: boolean) {
        const buf = csr.buffer;
        const layer = csr.layer;
        const initX = csr.x;

        let tile = new TileSeq();
        tile.transparent = transp;
        tile.setSingle(0, 0, 0);
        let textColor = new TextColor(initFgc, initBgc);

        const chEscapeBegin = "{";
        const chEscapeEnd = "}";
        let escaped = false;
        let escapeSeq = "";

        for (let i = 0; i < fmt.length; i++) {
            let tileIndex = fmt.charCodeAt(i);
            const ch = fmt.charAt(i);

            if (ch === chEscapeBegin) {
                if (escaped) {
                    this.error = "Escape sequences cannot be nested";
                    return;
                }
                escaped = true;
                continue;

            } else if (ch === chEscapeEnd) {
                if (!escaped) {
                    this.error = "Missing opening escape character";
                    return;
                }
                escaped = false;
                const ch = this.interpretEscapeSequence(escapeSeq, csr, initX, textColor);
                escapeSeq = "";
                if (ch) {
                    tileIndex = ch;
                } else {
                    continue;
                }

            } else if (escaped) {
                escapeSeq += ch;
                continue;
            }

            tile.set(0, tileIndex, textColor.fg, textColor.bg);
            buf.setTile(tile, layer, csr.x, csr.y);
            csr.x++;
        }
    }

    private interpretEscapeSequence(esc: string, csr: Cursor, initX: number, textColor: TextColor): number | null {
        const src = esc;
        esc = esc.toUpperCase();

        if (esc === "LF") {
            csr.y++;
            csr.x = initX;

        } else if (esc[0] === "F") {
            textColor.fgPrev = textColor.fg;
            textColor.fg = Number(esc.substring(1).trim());

        } else if (esc === "/F") {
            textColor.fg = textColor.fgPrev;

        } else if (esc[0] === "B") {
            textColor.bgPrev = textColor.bg;
            textColor.bg = Number(esc.substring(1).trim());

        } else if (esc === "/B") {
            textColor.bg = textColor.bgPrev;

        } else if (esc[0] === "C") {
            return Number(esc.substring(1).trim());

        } else {
            throw new PTM_RuntimeError(`Unrecognized escape sequence: ${src}`, this.ptm.currentLine!);
        }
        return null;
    }
}
