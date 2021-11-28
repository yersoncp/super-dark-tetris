import { Cell } from "../cell/Cell";
import { Tetromino } from "./Tetromino";

describe('Tetromino class', () => {
    
    const tetromino = new Tetromino([
        [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)],
        [new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)],
    ])

    it('should create a new Tetromino', () => {
        expect(tetromino).toBeTruthy();
    })

    it('should rotation tetromino', () => {
        const rotatePosition = [
            [0, 1], [1, 1], [2, 1], [3, 1],
        ]
        const nextCells = tetromino.getNextRotation();

        for (const cell of nextCells) {
            expect([cell.x, cell.y]).toEqual(rotatePosition[0]);
            rotatePosition.shift();
        }
        expect(nextCells.length).toEqual(4)
    })

    it('should increment index', () => {
        expect(tetromino.rotationIndex).toBe(0);
        tetromino.incrementRotationIndex();
        expect(tetromino.rotationIndex).toBe(1);
    })
})