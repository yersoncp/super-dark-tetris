export interface ICell {
    x: number;
    y: number;
    color?: string;
}

export class Cell implements ICell {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}