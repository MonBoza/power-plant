import { storeState, changeState } from "../src/plant.js"

describe('storeState', () => {
    test('it should store first state and empty object ', () => {
      const garden = storeState();
      const emptyGarden = garden();
      expect(emptyGarden).toEqual({});
    });
    describe('changeState', () => {
    test('it should take an empty object, fill it with parameters, and put them in new garden', () => {
        const feed = changeState("soil")(1);
        const emptyGarden = feed({});
        expect(emptyGarden).toEqual({soil: 1});
    })
        test('countryMusic should give empty garden a height of 3', () =>{
        const countryMusic = changeState("height")(3);
        const emptyGarden = countryMusic({});
        expect(emptyGarden).toEqual({height: 3});
    })
})
})