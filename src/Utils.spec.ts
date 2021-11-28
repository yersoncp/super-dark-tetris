import { Utils } from "./Utils";

describe('Utils unit testing', () => {
    
    it('getRandomInt', () => {
        const n = Utils.getRandomInt(0, 10);
        expect(n >= 0 && n <= 10).toBe(true);
    });

    it('getRandomInt with equal parameters', () => {
        const n = Utils.getRandomInt(0, 0);
        expect(n).toBe(0);
    })

    it('getRandomColor', () => {
        const color = Utils.getRandomColor();
        expect(color).toContain('#');
        expect(typeof color).toEqual('string');
    })
})