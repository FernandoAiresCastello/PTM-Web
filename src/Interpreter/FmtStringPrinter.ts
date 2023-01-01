import { PTM_RuntimeError } from "../Errors/PTM_RuntimeError";
import { Cursor } from "../Graphics/Cursor";
import { TileSeq } from "../Graphics/TileSeq";
import { PTM } from "../PTM";
import { Interpreter } from "./Interpreter";

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

class ResolvedEscapeSeq {

    varValue: string | null = null;
    tileIndex: number | null = null;
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
        
        let isVariable = false;
        let resolvedVariableValue = "";

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
                const res = this.interpretEscapeSequence(escapeSeq, csr, initX, textColor);
                escapeSeq = "";
                if (res) {
                    if (res.tileIndex) {
                        tileIndex = res.tileIndex;
                    } else if (res.varValue) {
                        isVariable = true;
                        resolvedVariableValue = res.varValue;
                    }
                } else {
                    continue;
                }

            } else if (escaped) {
                escapeSeq += ch;
                continue;
            }

            if (isVariable) {
                isVariable = false;
                for (let i = 0; i < resolvedVariableValue.length; i++) {
                    tile.set(0, resolvedVariableValue.charCodeAt(i), textColor.fg, textColor.bg);
                    buf.setTile(tile, layer, csr.x, csr.y);
                    csr.x++;
                }
            } else {
                tile.set(0, tileIndex, textColor.fg, textColor.bg);
                buf.setTile(tile, layer, csr.x, csr.y);
                csr.x++;
            }
        }
    }

    private interpretEscapeSequence(esc: string, csr: Cursor, initX: number, textColor: TextColor): ResolvedEscapeSeq | null {

        if (esc.toUpperCase() === "LF") {
            csr.y++;
            csr.x = initX;
            return null;

        } else if (esc[0].toUpperCase() === "F") {
            textColor.fgPrev = textColor.fg;
            textColor.fg = Number(esc.substring(1).trim());
            return null;

        } else if (esc.toUpperCase() === "/F") {
            textColor.fg = textColor.fgPrev;
            return null;

        } else if (esc[0].toUpperCase() === "B") {
            textColor.bgPrev = textColor.bg;
            textColor.bg = Number(esc.substring(1).trim());
            return null;

        } else if (esc.toUpperCase() === "/B") {
            textColor.bg = textColor.bgPrev;
            return null;

        } else if (esc[0].toUpperCase() === "C") {
            const res = new ResolvedEscapeSeq();
            res.tileIndex = Number(esc.substring(1).trim());
            return res;

        } else if (esc[0] === "%") {
            const varId = esc.substring(1);
            if (varId.indexOf("[") > 0 && varId.indexOf("]") > 0) { // Array element
                const open = varId.indexOf("[");
                const close = varId.indexOf("]");
                const arrId = varId.substring(0, open);
                const arrIndex = varId.substring(open + 1, close);
                
                const arr = this.ptm.arrays[arrId];
                if (arr === undefined) {
                    throw new PTM_RuntimeError(`Array not found: ${arrId}`, this.ptm.currentLine!);
                }

                let value = "";
                if (Interpreter.isValidIdentifier(arrIndex)) {
                    const ixStr = this.ptm.vars[arrIndex];
                    if (ixStr === undefined) {
                        throw new PTM_RuntimeError(`Variable used as array index not found: ${arrId}[${arrIndex}]`, this.ptm.currentLine!);
                    }
                    const ix = Number(ixStr);
                    if (Number.isNaN(ix)) {
                        throw new PTM_RuntimeError(`Invalid array subscript: ${ixStr}`, this.ptm.currentLine!);
                    }
                    if (ix < 0 || ix >= arr.length) {
                        throw new PTM_RuntimeError(`Index out of bounds for array ${arrId}: ${ix}`, this.ptm.currentLine!);
                    }
                    value = arr[ix];

                } else {
                    const ix = Number(arrIndex);
                    if (ix < 0 || ix >= arr.length) {
                        throw new PTM_RuntimeError(`Index out of bounds for array ${arrId}: ${ix}`, this.ptm.currentLine!);
                    }
                    value = arr[ix];
                }

                const res = new ResolvedEscapeSeq();
                res.varValue = value;
                return res;

            } else { // Simple variable
                const value = this.ptm.vars[varId];
                if (value === undefined) {
                    throw new PTM_RuntimeError(`Variable not found: ${varId}`, this.ptm.currentLine!);
                }
                const res = new ResolvedEscapeSeq();
                res.varValue = value;
                return res;
            }
        
        } else {
            throw new PTM_RuntimeError(`Unrecognized escape sequence: ${esc}`, this.ptm.currentLine!);
        }
    }
}
