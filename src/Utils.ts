export class Utils {
    static getRandomColor() {
        const colors = [
            'orange',
            'red',
            'purple',
            'blue'
        ]
        return colors[Utils.getRandomInt(0, colors.length - 1)];
    }
    
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}