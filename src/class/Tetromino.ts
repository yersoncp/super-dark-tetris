import { Utils } from "../Utils";
import { Cell, ICell } from "./Cell";

export interface ITetramino {
    cells: ICell[];
    rotations: ICell[][];
    rotationIndex: number;
}

export class Tetromino implements ITetramino {

    public rotations: ICell[][];
    public rotationIndex: number;
    public cells: ICell[];

    constructor(rotations: Array<ICell[]>) {
        this.rotations = rotations;
        this.rotationIndex = 0;
        this.cells = this.rotations[this.rotationIndex];
     
        const color = Utils.getRandomColor();
        this.rotations.forEach(cells => {
            cells.forEach((point: ICell) => {
                point.color = color;
            });
        });
    }

    incrementRotationIndex(): void {
        this.rotationIndex = (this.rotationIndex + 1) % this.rotations.length;
        // this.points = this.rotations[this.rotationIndex];
    }

    getNextRotation(): ICell[] {
        return this.rotations[this.rotationIndex];
        // return this.rotations[(this.rotationIndex + 1) % this.rotations.length];
    }

}