import { PARAMS } from "../params";
import { Utils } from "../Utils";
import { Board } from "./Board";
import { ICell, Cell } from "./Cell";
import { Tetromino } from "./Tetromino";

export class Game {
    public currentTetromino: Tetromino | undefined;
    public pieces: Array<{ color: string, taken: boolean }[]> = []
    public existingPieces: Array<{ color: string, taken: boolean }[]> = []
    public globalX: number = 0;
    public globalY: number = 0;
    public intervalId!: any;

    public board!: Board;

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        this.board = new Board(canvas)
        this.resetGame()
    }

    private resetGame() {
        this.chooseTetromino()
        this.pieces = this.board.pieces
        this.existingPieces = this.board.existingPieces
        this.initGlobalPosition();
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
            this.moveTetrominoPointsToExistingPieces()
            this.chooseTetromino()
            if (this.isLooser()) {
                console.log('mainLoop.clearInterval :: LOOSER');
                clearInterval(this.intervalId)
            }
            this.deleteFullRows()
        }
        this.syncExistingPieces();
    }

    keyDownHandler(e: number) {
        console.log('Game.keyDown', e)
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
                // this.moveDown()
        }
    }

    private isLooser(): boolean {
        for (const cell of this.existingPieces[1]) {
            return cell.taken
        }
        return false
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

    private deleteFullRows() {
        const a = this.existingPieces.filter((e, x) => {

            const all = e.every(k => k.taken)
            if (all) {
                console.log('all', all)
            }

            return e.filter((r, y) => {
                return r.taken
            })
        })
        const rowsToDelete = this.existingPieces.filter(row => row.every(cell => cell.taken))
        console.log(1, rowsToDelete);
        if (rowsToDelete.length) {
            this.existingPieces = this.existingPieces.filter(row => !row.every(cell => cell.taken))
            this.existingPieces.unshift(Array(PARAMS.cols).fill({ color: PARAMS.emptyColor, taken: false }))
            this.existingPieces.push(Array(PARAMS.cols).fill({ color: PARAMS.emptyColor, taken: false }))
            this.deleteFullRows()
        }
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
                    [new Cell(0, 1), new Cell(1, 1), new Cell(1, 0), new Cell(2, 1)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(1, 1)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(1, 1)],
                    [new Cell(0, 1), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
                ]);
                 
        }
    }

}