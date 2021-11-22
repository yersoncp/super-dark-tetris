import { PARAMS } from "../params";

export class Board {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D
    public pieces: Array<{ color: string, taken: boolean }[]> = []
    public existingPieces: Array<{ color: string, taken: boolean }[]> = []

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.initialCanvas()
        this.initialPieces()
        this.draw()
    }

    private initialCanvas() {
        this.canvas.setAttribute('width', `${PARAMS.width}`)
        this.canvas.setAttribute('height', `${PARAMS.height}`)
    }

    private initialPieces() {
        for (let y = 0; y < PARAMS.heightSize(); y++) {
            this.pieces.push([])
            this.existingPieces.push([])
            for (let x = 0; x < PARAMS.widthSize(); x++) {
                const p = { color: PARAMS.emptyColor, taken: false }
                this.pieces[y].push(p)
                this.existingPieces[y].push(p)
            }
        }
    }

    private draw() {
        const widthSize = PARAMS.widthSize()
        const heightSize = PARAMS.heightSize()
        let x = 0, y = 0;
        for (const row of this.pieces) {
            x = 0;
            for (const point of row) {
                this.ctx.fillStyle = point.color
                this.ctx.fillRect(x, y, widthSize, heightSize)
                this.ctx.restore()
                this.ctx.strokeStyle = '#fff';
                this.ctx.strokeRect(x, y, widthSize, heightSize)
                x += widthSize
            }
            y += heightSize
        }
        setTimeout(() => {
            requestAnimationFrame(this.draw.bind(this))
        }, 1000);
    }
}