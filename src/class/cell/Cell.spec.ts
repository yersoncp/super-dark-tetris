import { Cell } from "./Cell";

describe('Cell class unit tsting', () => {
    it('should create an instance', () => {
        const cell = new Cell(1, 3);
        expect(cell).toBeTruthy();
        expect(cell.x).toEqual(1);
        expect(cell.y).toEqual(3);
    });
})
