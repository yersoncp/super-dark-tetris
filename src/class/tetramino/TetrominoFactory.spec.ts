import { Config } from "../../Config";
import { TetrominoFactory, TetrominoType } from "./TetrominoFactory";

describe('TetrominoFactory class', () => {
    const cellsCount = 4;

    it('should create a new tetromino', () => {
        const tetromino = TetrominoFactory.createRandom();
        expect(tetromino).toBeTruthy();
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    });

    it('should create a I Tetromino', () => {
        const cells = [
            [0, 0], [0, 1], [0, 2], [0, 3],
            [0, 1], [1, 1], [2, 1], [3, 1],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.I);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(2);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a J Tetromino', () => {
        const cells = [
            [0, 1], [1, 1], [2, 1], [2, 0],
            [0, 0], [1, 0], [1, 1], [1, 2],
            [0, 0], [1, 0], [2, 0], [0, 1],
            [0, 0], [0, 1], [0, 2], [1, 2],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.J);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(4);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a L Tetromino', () => {
        const cells = [
            [0, 0], [1, 0], [2, 0], [2, 1],
            [0, 0], [0, 1], [0, 2], [1, 0],
            [0, 0], [0, 1], [1, 1], [2, 1],
            [0, 2], [1, 0], [1, 1], [1, 2],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.L);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(4);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a O Tetromino', () => {
        const cells = [
            [0, 0], [0, 1], [1, 0], [1, 1]
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.O);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(1);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a S Tetromino', () => {
        const cells = [
            [0, 1], [0, 2], [1, 0], [1, 1],
            [0, 0], [1, 0], [1, 1], [2, 1],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.S);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(2);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a T Tetromino', () => {
        const cells = [
            [0, 0], [0, 1], [0, 2], [1, 1],
            [0, 1], [1, 1], [1, 0], [2, 1],
            [0, 1], [1, 0], [1, 1], [1, 2],
            [0, 0], [1, 0], [2, 0], [1, 1],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.T);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(4);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })

    it('should create a Z Tetromino', () => {
        const cells = [
            [0, 0], [0, 1], [1, 1], [1, 2],
            [0, 1], [1, 0], [1, 1], [2, 0],
        ]
        const tetromino = TetrominoFactory.create(TetrominoType.Z);
        for (const rotate of tetromino.rotations) {
            for (const j of rotate) {
                expect([j.x, j.y]).toEqual(cells[0]);
                cells.shift();
            }
        }
        expect(tetromino.rotations.length).toEqual(2);
        expect(tetromino.cells.length).toEqual(cellsCount);
        expect(Config.colors.includes(tetromino.cells[0].color)).toBe(true);
    })
});