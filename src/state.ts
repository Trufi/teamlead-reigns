import { State } from './types';
import { randomDeck } from './utils';

export const createState = (seed: number): State => {
    const [nextSeed, deck] = randomDeck(seed);

    return {
        seed: nextSeed,
        scores: {
            audience: 50,
            money: 50,
            code: 50,
            team: 50,
        },
        deck,
        lose: false,
        day: 1,
    };
};
