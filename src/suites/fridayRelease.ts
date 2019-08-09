import { Suite } from '../types';

export const fridayRelease: Suite = {
    startCard: {
        character: 'Лена',
        description: 'Мы готовы зарелизить новую фичу, но сегодня пятница, отложим?',
        yes: {
            description: 'Да',
            scores: { money: 10, audience: 10 },
        },
        no: {
            description: 'Нет, релизимся',
            scores: { money: -10, audience: -10 },
        },
    },
};
