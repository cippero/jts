const googleSearch = require('./script');

const mockDB = ['icecream.com', 'youscream.com', 'weallscream.com', 'ahhhhhh.com'];

describe('googleSearch', () => {
    it('is a silly test', () => {
        expect('hello').toBe('hello');
    });
    
    it('is searching google', () => {
        expect(googleSearch('testtest', mockDB)).toEqual([]);
        expect(googleSearch('am', mockDB)).toEqual(['icecream.com', 'youscream.com', 'weallscream.com']);
    });
    
    it('work with undefined and null', () => {
        expect(googleSearch(undefined, mockDB)).toEqual([]);
        expect(googleSearch(null, mockDB)).toEqual([]);
    });
    
    it('does not return more than 3 matches', () => {
        expect(googleSearch('.com', mockDB).length).toBeLessThanOrEqual(3)
    });
});
