import { suites } from './suites';
import { DeckCard } from './types';

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
