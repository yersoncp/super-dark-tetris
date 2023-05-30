import { Utils } from "../utils/Utils";
import { Cell } from "./Cell";
import { Tetromino } from "./Tetromino";

export enum TetrominoType {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z'
}

export class TetrominoFactory {

    public static createRandom(): Tetromino {
        const tetrominoType = this.getRandomTetrominoType();
        return this.create(tetrominoType);
    }

    private static getRandomTetrominoType(): TetrominoType {
        const tetrominoTypes = Object.keys(TetrominoType).map(key => TetrominoType[key]);
        return tetrominoTypes[Utils.getRandomInt(0, tetrominoTypes.length - 1)];
    }

    public static create(type: TetrominoType): Tetromino {
        switch (type) {
            case TetrominoType.I:
                return new Tetromino([
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)],
                    [new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)],
                ]);
            case TetrominoType.J:
                return new Tetromino([
                    [new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(2, 0)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(0, 1)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(1, 2)],
                ]);
            case TetrominoType.L:
                return new Tetromino([
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(2, 1)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(1, 0)],
                    [new Cell(0, 0), new Cell(0, 1), new Cell(1, 1), new Cell(2, 1)],
                    [new Cell(0, 2), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
                ]);
            case TetrominoType.O:
                return new Tetromino([
                    [new Cell(0, 0), new Cell(0, 1), new Cell(1, 0), new Cell(1, 1)],
                ])
            case TetrominoType.S:
                return new Tetromino([
                    [new Cell(0, 1), new Cell(0, 2), new Cell(1, 0), new Cell(1, 1)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(1, 1), new Cell(2, 1)],

                ]);
            case TetrominoType.T:
                return new Tetromino([
                    [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(1, 1)],
                    [new Cell(0, 1), new Cell(1, 1), new Cell(1, 0), new Cell(2, 1)],
                    [new Cell(0, 1), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
                    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(1, 1)],
                ]);
            case TetrominoType.Z:
                return new Tetromino([
                    [new Cell(0, 0), new Cell(0, 1), new Cell(1, 1), new Cell(1, 2)],
                    [new Cell(0, 1), new Cell(1, 0), new Cell(1, 1), new Cell(2, 0)],
                ]);
        }
    }
}