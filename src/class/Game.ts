import { Utils } from "../Utils";
import { Point } from "./Point";
import { Tetromino } from "./Tetromino";

export class Game {

    public currentTetromino: Tetromino | undefined;

    constructor() {
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