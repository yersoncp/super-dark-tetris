import { Utils } from "../Utils";
import { IPoint } from "./Point";

export class Tetromino {

    public rotations: Array<IPoint[]>;

    constructor(rotations: Array<IPoint[]>) {
        this.rotations = rotations;
     
        const color = Utils.getRandomColor();
        this.rotations.forEach(points => {
            points.forEach((point: IPoint) => {
                point.color = color;
            });
        });
    }

}