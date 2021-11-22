import { Utils } from "../Utils";
import { IPoint } from "./Point";

export class Tetromino {

    public rotations: IPoint[][];
    public rotationIndex: number;
    private points: IPoint[];

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

    getPoints(): IPoint[] {
        return this.points;
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