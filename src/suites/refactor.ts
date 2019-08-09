import { Suite } from '../types';

export const refactor: Suite = {
    startCard: {
        character: 'Петя',
        description: 'Я думаю, что нам пора порефакторить работу со стором',
        yes: {
            description: 'Ты прав',
            scores: {
                code: 20,
                team: 5,
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
