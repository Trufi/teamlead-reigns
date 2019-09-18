import { Suite } from '../types';

export const fridayRelease: Suite = {
    startCard: {
        character: 'Лена, аналитик',
        description: 'Мы готовы выкатить новую фичу, но сегодня пятница, все равно релизимся?',
        skipSteps: 0,
        yes: {
            description: 'Да',
            scores: { money: 5, audience: 5 },
            nextCard: {
                skipSteps: 0,
                character: 'Лена, аналитик',
                description: 'Все плохо! У нас баг на бою!',
                yes: {
                    description: 'Фиксим!',
                    scores: { team: -5, money: -10 },
                },
                no: {
                    description: 'Подождет',
                    scores: { audience: -10 },
                },
            },
        },
        no: {
            description: 'Нет',
            scores: { money: -5, audience: -5 },
        },
    },
};
