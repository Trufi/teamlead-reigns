import { Suite, Card } from '../types';

const objection: Card = {
    skipSteps: 0,
    character: 'Лена, аналитик',
    description: 'Но ведь WebGL 2.0 не поддерживается в 25% браузерах!',
    yes: {
        description: 'Пофиг',
        scores: { team: 10, audience: -10 },
    },
    no: {
        description: 'Не используем',
        scores: { team: -10 },
    },
};

export const deviceCut: Suite = {
    startCard: {
        skipSteps: 0,
        character: 'Федор, новатор',
        description: 'Давай использовать WebGL 2.0? Он быстрее и круче.',
        yes: {
            description: '',
            nextCard: objection,
        },
        no: {
            description: '',
            nextCard: objection,
        },
    },
};
