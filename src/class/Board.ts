import { PARAMS } from "../params";

export class Board {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D
    public pieces: { color: string, taken: boolean }[][] = []
    public existingPieces: { color: string, taken: boolean }[][] = []

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.initialCanvas()
        this.initialPieces()
        this.draw()
    }

    private initialCanvas() {
        this.canvas.setAttribute('width', `${PARAMS.widthSize()}`)
        this.canvas.setAttribute('height', `${PARAMS.heightSize()}`)
    }

    private initialPieces() {
        for (let y = 0; y < PARAMS.rows; y++) {
            this.pieces.push([])
            this.existingPieces.push([])
            for (let x = 0; x < PARAMS.cols; x++) {
                const p = { color: PARAMS.emptyColor, taken: false }
                this.pieces[y].push(p)
                this.existingPieces[y].push(p)
            }
        }
    }

    private draw() {
        const size = PARAMS.squareSize;
        let x = 0, y = 0;
        for (const row of this.pieces) {
            x = 0;
            for (const point of row) {
                this.ctx.fillStyle = point.color
                this.ctx.fillRect(x, y, size, size)
                this.ctx.restore()
                this.ctx.strokeStyle = PARAMS.strokeColor;
                this.ctx.strokeRect(x, y, size, size)
                x += size
            }
            y += size
        }
        setTimeout(() => {
            requestAnimationFrame(this.draw.bind(this))
        }, 18);
    }
}