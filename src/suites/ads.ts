import { Suite } from '../types';

export const ads: Suite = {
    startCard: {
        character: 'Лена, аналитик',
        description: 'Повесим рекламный баннер на входе?',
        skipSteps: 0,
        yes: {
            description: 'Деньги — нужны',
            scores: {
                audience: -10,
                money: 20,
            },
        },
        no: {
            description: 'Чёт, перебор',
            scores: {
                audience: 5,
                money: -10,
            },
        },
    },
};
