import { Utils } from "../Utils";
import { IPoint } from "./Point";

export interface ITetramino {
    points: IPoint[];
    rotations: IPoint[][];
    rotationIndex: number;
}

export class Tetromino implements ITetramino {

    public rotations: IPoint[][];
    public rotationIndex: number;
    public points: IPoint[];

    constructor(rotations: Array<IPoint[]>) {
        this.rotations = rotations;
        this.rotationIndex = 0;
        this.points = this.rotations[this.rotationIndex];
     
        const color = Utils.getRandomColor();
        this.rotations.forEach(points => {
            points.forEach((point: IPoint) => {
                point.color = color;
            });
        });
    }

    incrementRotationIndex(): void {
        this.rotationIndex = (this.rotationIndex + 1) % this.rotations.length;
        // this.points = this.rotations[this.rotationIndex];
    }

    getNextRotation(): IPoint[] {
        return this.rotations[this.rotationIndex];
        // return this.rotations[(this.rotationIndex + 1) % this.rotations.length];
    }

}