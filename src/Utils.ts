export class Utils {
    static getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}