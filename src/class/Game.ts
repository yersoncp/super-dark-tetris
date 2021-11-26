import { PARAMS } from "../params";
import { Utils } from "../Utils";
import { Board } from "./Board";
import { ICell, Cell } from "./Cell";
import { Tetromino } from "./Tetromino";

type Piece = {
    color: string;
    taken: boolean;
};

export class Game {
    public currentTetromino: Tetromino | undefined;
    public pieces: Piece[][] = []
    public existingPieces: Piece[][] = []
    public globalX: number = 0;
    public globalY: number = 0;
    public intervalId!: any;

    public canPlay: boolean = true;

    private score: number = 0;
    private score$!: HTMLSpanElement;
    private speed: number = PARAMS.speed;

    public board!: Board;

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        this.board = new Board(canvas)
        this.initControls()
        this.resetGame()
    }

    private initControls() {
        this.score$ = document.querySelector('#score') as HTMLSpanElement;
        document.addEventListener('keydown', (event) => {
            if(event.keyCode === 13) {
                this.canPlay = !this.canPlay
                document.querySelector('#pauseLabel')!.className = this.canPlay ? 'hidden' : 'paused'
                if(this.canPlay) {
                    this.pauseGame()
                } else {
                    this.startGame()
                }
            }
            if (!this.canPlay) return
            this.keyDownHandler(event.keyCode)
        })
    }

    private resetGame() {
        this.chooseTetromino()
        this.pieces = this.board.pieces
        this.existingPieces = this.board.existingPieces
        this.initGlobalPosition()
        this.syncExistingPieces()
        this.startGame()
    }

    private pauseGame(): void {
        clearInterval(this.intervalId)
    }

    private startGame(): void {
        this.intervalId = setInterval(this.mainLoop.bind(this), this.speed);
    }

    private addScore(n: number) {
        this.score += n;
        this.score$.textContent = `${this.score}`;
    }

    private mainLoop() {
        if (!this.canPlay) return
        if (this.tetrominoCanMoveDown()) {
            this.globalY++
            this.addScore(1)
        } else {
            this.moveTetrominoPointsToExistingPieces();
            if (this.isLooser()) {
                console.warn('>>>>>>>> mainLoop.LOOSER!!!');
                clearInterval(this.intervalId)
                return;
            }
            this.deleteFullRows();
            this.chooseTetromino();
        }
        this.syncExistingPieces();
    }

    /**
     * Metodo temportal
     * que muestra estado del tablero
     */
    private tempLog(): void {
        const board = this.existingPieces.map((row, y) => row.map((cell, x) => cell.taken ? `(${x},${y})` : null))
        console.table(board);
    }

    keyDownHandler(e: number) {
        switch (e) {
            case 37:
                this.moveLeft()
                break;
            case 38:
                this.rotate()
                break;
            case 39:
                this.moveRight()
                break;
            case 40:
                this.moveDown()
        }
        this.syncExistingPieces();
    }

    private isLooser(): boolean {
        return this.existingPieces[1].some(cell => cell.taken)
    }

    private rotate(): void {
        const nextPosition = this.currentTetromino!.getNextRotation()
        for (const cell of nextPosition) {
            if (this.isOutOfBounds(cell) || this.isTaken(cell)) {
                return
            }
        }
        this.currentTetromino!.cells = nextPosition
        this.currentTetromino!.incrementRotationIndex()
    }

    private moveLeft() {
        for (const cell of this.currentTetromino!.cells) {
            const newCell = new Cell(cell.x - 1, cell.y)
            if (this.isOutOfBounds(newCell) || this.isTaken(newCell)) {
                return
            }
        }
        this.globalX--
    }

    private moveRight() {
        for (const point of this.currentTetromino!.cells) {
            const newCell = new Cell(point.x + 1, point.y)
            if (this.isOutOfBounds(newCell) || this.isTaken(newCell)) {
                return
            }
        }
        this.globalX++
    }

    private moveDown() {
        if (this.tetrominoCanMoveDown()) {
            this.globalY++
            this.addScore(1)
        }
    }

    private syncExistingPieces(): void {
        this.cleanBoardAndOverlapExistingPieces();
        this.overlapCurrentTetrominoOnBoard()
    }

    private  overlapCurrentTetrominoOnBoard(): void {
        for (const point of this.currentTetromino!.cells) {
            this.pieces[point.y + this.globalY][point.x + this.globalX].color = point.color as string;
        }
    }

    private cleanBoardAndOverlapExistingPieces() {
        for (let y = 0; y < PARAMS.rows; y++) {
            for (let x = 0; x < PARAMS.cols; x++) {
                this.pieces[y][x] = {
                    color: PARAMS.emptyColor,
                    taken: false
                }
                if (this.existingPieces[y][x].taken) {
                    this.pieces[y][x].color = this.existingPieces[y][x].color
                }
            }
        }
    }

    /**
     * Elimina las filas completas
     */
    private deleteFullRows() {
        this.existingPieces.map((row, y) => {
            const isFullRow = row.every(cell => cell.taken)
            if (isFullRow) {
                for (const cell of this.existingPieces[y]) {
                    cell.color = PARAMS.deleteRowColor
                }
                setTimeout(() => {
                    this.existingPieces = this.existingPieces.filter(row => !row.every(cell => cell.taken))
                    this.existingPieces.unshift(Array(PARAMS.cols).fill({ color: PARAMS.emptyColor, taken: false }))
                    this.addScore(PARAMS.scorePerSquare * PARAMS.cols)
                    this.tempLog()
                }, PARAMS.timeDeleteRow);
            }
        })
    }

    private initGlobalPosition() {
        this.globalX = Math.floor(PARAMS.cols / 2) - 1;
        this.globalY = 0;
    }
    
    private tetrominoCanMoveDown(): boolean {
        const { currentTetromino } = this
        if (!currentTetromino) return false
        for (const point of currentTetromino.cells) {
            const newPoint = new Cell(point.x, point.y + 1);
            if (this.isOutOfBounds(newPoint) || this.isTaken(newPoint)) {
                return false
            }
        }
        return true
    }

    private isTaken(point: ICell): boolean {
        const absX = point.x + this.globalX
        const absY = point.y + this.globalY
        return this.existingPieces[absY][absX].taken
    }

    private isOutOfBounds(point: ICell): boolean {
        const absX = point.x + this.globalX
        const absY = point.y + this.globalY
        return absX < 0 || absX >= PARAMS.cols || absY < 0 || absY >= PARAMS.rows
    }

    private moveTetrominoPointsToExistingPieces() {
        for (const point of this.currentTetromino!.cells) {
            point.x += this.globalX
            point.y += this.globalY
            this.existingPieces[point.y][point.x] = {
                color: point.color as string,
                taken: true
            }
        }
        this.initGlobalPosition();
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
                    [new Cell(0, 0), new Cell(0, 1), new Cell(1, 0), new Cell(1, 1)],
                ])
            case 2:
                /**
                 * Línea
                 */
                return new Tetromino([
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)],
                ]);
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                /**
                 * La T (tewee)
                 */
                return new Tetromino([
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)],
                ]);
                return new Tetromino([
                    [new Cell(0, 1), new Cell(1, 1), new Cell(1, 0), new Cell(2, 1)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(1, 1)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(1, 1)],
                    [new Cell(0, 1), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
                ]);
                 
        }
    }

}