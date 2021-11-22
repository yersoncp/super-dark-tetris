import { PARAMS } from "../params";
import { Utils } from "../Utils";
import { Point } from "./Point";
import { Tetromino } from "./Tetromino";

export class Game {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D
    public currentTetromino: Tetromino | undefined;
    public board: Array<{ color: string, taken: boolean }[]> = []
    public existingPieces: Array<{ color: string, taken: boolean }[]> = []
    public globalX: number = 0;
    public globalY: number = 0;
    public intervalId!: any;

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.resetGame()
    }

    private resetGame() {
        this.chooseTetromino()
        // this.currentTetromino?.moveDown()
        this.initialCanvas(this.canvas)
        this.initialPieces()
        this.initGlobalPosition();
        this.draw()
        this.startGame()
        this.syncExistingPieces()
    }

    private startGame() {
        this.intervalId = setInterval(this.mainLoop.bind(this), PARAMS.speed);
    }

    private mainLoop() {
        if (this.tetrominoCanMoveDown()) {
            this.globalY++
        } else {
            console.log('mainLoop.clearInterval');
            clearInterval(this.intervalId)
        }
        // this.moveFigurePointsToExistingPieces()
        // setTimeout(() => {
        //     this.tetrominoCanMoveDown()
        // }, PARAMS.speed)
        this.syncExistingPieces();
    }

    private initialCanvas (canvas: HTMLCanvasElement) {
        canvas.setAttribute('width', `${PARAMS.width}`)
        canvas.setAttribute('height', `${PARAMS.height}`)
    }

    private syncExistingPieces(): void {
        this.overlapCurrentTetrominoOnBoard()
    }

    private  overlapCurrentTetrominoOnBoard(): void {
        for (const point of this.currentTetromino!.points) {
            this.board[point.y + this.globalY][point.x + this.globalX].color = point.color as string;
        }
    }

    private initGlobalPosition() {
        this.globalX = Math.floor(PARAMS.cols / 2) - 1;
        this.globalY = 0;
    }
    
    private initialPieces() {
        for (let y = 0; y < PARAMS.heightSize(); y++) {
            this.board.push([])
            this.existingPieces.push([])
            for (let x = 0; x < PARAMS.widthSize(); x++) {
                const p = { color: PARAMS.emptyColor, taken: false }
                this.board[y].push(p)
                this.existingPieces[y].push(p)
            }
        }
        console.log('initialPieces :: ', this.board)
    }

    private tetrominoCanMoveDown(): boolean {
        const { currentTetromino } = this
        if (!currentTetromino) return false
        for (const point of currentTetromino.points) {
            const { x, y } = point
            if (this.board[y + 1][x].taken) return false
        }
        return true
    }

    private moveFigurePointsToExistingPieces() {
        for (const point of this.currentTetromino!.points) {
            point.x += this.globalX
            point.y += this.globalY
            this.existingPieces[point.y][point.x] = {
                color: point.color as string,
                taken: true
            }
        }
        this.initGlobalPosition();
    }
    
    private draw() {
        const widthSize = PARAMS.widthSize()
        const heightSize = PARAMS.heightSize()
        let x = 0, y = 0;
        for (const row of this.board) {
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

    private chooseTetromino() {
        this.currentTetromino = this.getTetromino()
    }

    private getTetromino() {
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