import { Suite } from '../types';

export const prodVsTech: Suite = {
    startCard: {
        skipSteps: 0,
        character: 'Алексей, agile-мастер',
        description: 'Скоро релиз, забьем на техдолг и сосредоточимся на продуктовых фичах?',
        yes: {
            description: 'Да',
            scores: { code: -10, money: 10 },
        },
        no: {
            description: 'Нет',
            scores: { code: 10, money: -10 },
        },
    },
};
