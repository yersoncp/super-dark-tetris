import { PARAMS } from "../params";
import { Utils } from "../Utils";
import { Point } from "./Point";
import { Tetromino } from "./Tetromino";

export class Game {
    public canvas: HTMLCanvasElement;
    public currentTetromino: Tetromino | undefined;
    public board: Array<{ color: string, taken: boolean }[]> = []
    public existingPieces: Array<{ color: string, taken: boolean }[]> = []

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        this.canvas = canvas;
        this.initialCanvas(canvas)
        this.initialPieces()
        const ctx = canvas.getContext('2d')
        this.draw(ctx as CanvasRenderingContext2D)
    }

    initialCanvas (canvas: HTMLCanvasElement) {
        canvas.setAttribute('width', `${PARAMS.width}`)
        canvas.setAttribute('height', `${PARAMS.height}`)
      }
    
    initialPieces() {
        for (let y = 0; y < PARAMS.heightSize(); y++) {
            this.board.push([])
            this.existingPieces.push([])
            for (let x = 0; x < PARAMS.widthSize(); x++) {
                const p = { color: PARAMS.emptyColor, taken: false }
                this.board[y].push(p)
                this.existingPieces[y].push(p)
            }
        }
        console.log('initialPieces', this.board)
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        const widthSize = PARAMS.widthSize()
        const heightSize = PARAMS.heightSize()
        let x = 0, y = 0;
        for (const row of this.board) {
            x = 0;
            for (const point of row) {
                ctx.fillStyle = point.color
                ctx.fillRect(x, y, widthSize, heightSize)
                ctx.restore()
                ctx.strokeStyle = '#fff';
                ctx.strokeRect(x, y, widthSize, heightSize)
                x += widthSize
            }
            y += heightSize
        }

        setTimeout(() => {
            requestAnimationFrame(() => {
                this.draw.bind(this)
            })
        }, 200);
    }

    chooseTetromino() {
        this.currentTetromino = this.getTetromino()
    }

    getTetromino() {
        switch (Utils.getRandomInt(1, 7)) {
            case 1:
                /**
                 * Cuadrado
                 */
                return new Tetromino([
                    [new Point(0, 0), new Point(1, 0), new Point(1, 0), new Point(1, 1)],
                ]);
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                /**
                 * Línea
                 */
                return new Tetromino([
                    [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(3, 0)],
                    [new Point(0, 0), new Point(0, 1), new Point(0, 2), new Point(0, 3)],
                ]);
                 
        }
    }

}