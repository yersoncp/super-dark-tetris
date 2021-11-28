import { PARAMS } from "./Params";

export class Utils {
    static getRandomColor(): string {
        const colors = PARAMS.colors
        return colors[Utils.getRandomInt(0, colors.length - 1)];
    }
    
    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}