import { Suite } from '../types';

export const junior: Suite = {
    startCard: {
        character: 'Антон, джуниор',
        description: 'А тебе, что больше нравится: ООП или ФП?',
        skipSteps: 0,
        yes: {
            description: 'ООП',
            scores: {},
            nextCard: {
                skipSteps: 3,
                character: 'Андрей, джуниор',
                description: 'Я сделал тройное наследование с абстрактным классом',
                yes: {
                    description: 'Попробуй примеси',
                    scores: {
                        team: 10,
                        code: -10,
                    },
                },
                no: {
                    description: 'Завязывай с этим',
                    scores: {
                        team: -10,
                    },
                },
            },
        },
        no: {
            description: 'ФП',
            scores: {},
            nextCard: {
                skipSteps: 3,
                character: 'Петя, сеньор',
                description:
                    'Андрей пишет какой-то непонятный код и говорит, что это мультипликативный функтор',
                yes: {
                    description: 'Пусть учится',
                    scores: {
                        code: -20,
                        team: -10,
                    },
                },
                no: {
                    description: 'Поговорю с ним',
                    scores: {
                        code: -10,
                    },
                },
            },
        },
    },
};
