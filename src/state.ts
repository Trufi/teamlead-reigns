import { State } from './types';
import { randomDeckCard } from './utils';

export const createState = (seed: number): State => {
    const [nextSeed, deckCard] = randomDeckCard(seed);

    return {
        seed: nextSeed,
        scores: {
            audience: 50,
            money: 50,
            code: 50,
            team: 50,
        },
        deck: [deckCard],
        lose: false,
        day: 1,
    };
};
