import { suites } from './suites';
import { DeckCard } from './types';

export const randomSeed = () => Math.round(Math.random() * 2147483647);

export const random = (seed: number) => {
    seed = (seed * 16807) % 2147483647;
    return [seed, (seed - 1) / 2147483646];
};

export const arrayInsert = <T>(array: T[], index: number, newItem: T): T[] => [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index),
];

export const clamp = (value: number, min: number, max: number) => {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
};

export const randomDeckCard = (seed: number): [number, DeckCard] => {
    const suiteNames = Object.keys(suites);
    const [nextSeed, randomValue] = random(seed);
    const suiteName = suiteNames[Math.floor(randomValue * suiteNames.length)];
    const deckCard: DeckCard = {
        suite: suiteName,
        card: suites[suiteName].startCard,
    };
    return [nextSeed, deckCard];
};

export const randomDeck = (seed: number): [number, DeckCard[]] => {
    const suiteNames = Object.keys(suites);
    const [nextSeed, rndNames] = randomizeArray(seed, suiteNames);
    return [nextSeed, rndNames.map((name) => ({ suite: name, card: suites[name].startCard }))];
};

export const randomizeArray = <T>(seed: number, inArray: T[]): [number, T[]] => {
    const array = [...inArray];

    for (let i = 0; i < array.length; i++) {
        const rnd = random(seed);
        seed = rnd[0];
        const index = i + Math.floor(rnd[1] * (array.length - i));
        const t = array[i];
        array[i] = array[index];
        array[index] = t;
    }

    return [seed, array];
};
