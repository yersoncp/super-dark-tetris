import { Config } from "../../Config";
import { Board } from "../board/Board";
import { ICell, Cell } from "../cell/Cell";
import { Tetromino } from "../tetramino/Tetromino";
import { TetrominoFactory } from "../tetramino/TetrominoFactory";

type Piece = {
    color: string;
    taken: boolean;
};

export class Game {
    public currentTetromino: Tetromino | undefined;
    public pieces: Piece[][] = []
    public existingPieces: Piece[][] = []
    public globalX: number;
    public globalY: number;
    public intervalId!: any;

    public canPlay: boolean;

    private score: number;
    private score$!: HTMLSpanElement;
    private speed: number = Config.speed;

    public board!: Board;

    constructor(canvas: HTMLCanvasElement) {
        this.board = new Board(canvas)
        this.initControls()
        this.initGame()
        this.startGame()
    }

    /**
     * Inicializa los controles
     */
    private initControls() {
        const puaseLabel$ = document.querySelector('#pauseLabel') as HTMLLabelElement
        this.score$ = document.querySelector('#score') as HTMLSpanElement;
        document.addEventListener('keydown', (event) => {
            if(event.keyCode === 13) {
                this.canPlay = !this.canPlay
                puaseLabel$.className = this.canPlay ? 'hidden' : 'paused'
                this.canPlay ? this.startGame() : this.pauseGame()
            }
            if (!this.canPlay) return
            this.keyDownHandler(event.keyCode)
        })
    }

    /**
     * Inicializa los valores por defecto del juego
     */
    private initGame() {
        this.score = 0
        this.score$.textContent = `${this.score}`
        this.pieces = this.board.pieces
        this.existingPieces = this.board.existingPieces
        this.chooseTetromino()
        this.initGlobalPosition()
        this.syncExistingPieces()
    }

    private pauseGame(): void {
        clearInterval(this.intervalId)
    }

    private startGame(): void {
        this.canPlay = true;
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
        // eslint-disable-next-line no-console
        console.table(board);
    }

    keyDownHandler(e: number): void {
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
        const nextPosition = this.currentTetromino.getNextRotation()
        for (const cell of nextPosition) {
            if (this.isOutOfBounds(cell) || this.isTaken(cell)) {
                return
            }
        }
        this.currentTetromino.cells = nextPosition
        this.currentTetromino.incrementRotationIndex()
    }

    private moveLeft() {
        for (const cell of this.currentTetromino.cells) {
            const newCell = new Cell(cell.x - 1, cell.y)
            if (this.isOutOfBounds(newCell) || this.isTaken(newCell)) {
                return
            }
        }
        this.globalX--
    }

    private moveRight() {
        for (const point of this.currentTetromino.cells) {
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
        for (const point of this.currentTetromino.cells) {
            this.pieces[point.y + this.globalY][point.x + this.globalX].color = point.color as string;
        }
    }

    private cleanBoardAndOverlapExistingPieces() {
        for (let y = 0; y < Config.rows; y++) {
            for (let x = 0; x < Config.cols; x++) {
                this.pieces[y][x] = {
                    color: Config.emptyColor,
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
                    cell.color = Config.deleteRowColor
                }
                setTimeout(() => {
                    this.existingPieces = this.existingPieces.filter(row => !row.every(cell => cell.taken))
                    this.existingPieces.unshift(Array(Config.cols).fill({ color: Config.emptyColor, taken: false }))
                    this.addScore(Config.scorePerSquare * Config.cols)
                    this.tempLog()
                }, Config.timeDeleteRow);
            }
        })
    }

    private initGlobalPosition() {
        this.globalX = Math.floor(Config.cols / 2) - 1;
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
        return absX < 0 || absX >= Config.cols || absY < 0 || absY >= Config.rows
    }

    private moveTetrominoPointsToExistingPieces() {
        for (const point of this.currentTetromino.cells) {
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

    private getTetromino(): Tetromino {
        return TetrominoFactory.createRandom();
    }

}