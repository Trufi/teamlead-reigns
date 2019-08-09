import { Suite } from '../types';

export const refactor: Suite = {
    startCard: {
        character: 'Петя',
        description: 'Я думаю, что нам пора порефакторить работу со стором',
        yes: {
            description: 'Давай',
            scores: {
                code: 20,
                team: 5,
                money: -10,
            },
        },
        no: {
            description: 'Нет',
            scores: {
                team: -5,
                code: -10,
            },
        },
    },
};
