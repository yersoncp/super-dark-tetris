export interface IColor {
    x: number;
    y: number;
    color?: string;
}

export class Point implements IColor {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}