import { Utils } from "../utils/Utils";
import { ICell } from "./Cell";

export interface ITetramino {
    cells: ICell[];
    rotations: ICell[][];
    rotationIndex: number;
}

export class Tetromino implements ITetramino {

    public rotations: ICell[][];
    public rotationIndex: number;
    public cells: ICell[];

    constructor(rotations: ICell[][]) {
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
    }

    getNextRotation(): ICell[] {
        return this.rotations[(this.rotationIndex + 1) % this.rotations.length];
    }

}