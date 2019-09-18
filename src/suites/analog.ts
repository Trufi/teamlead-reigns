import { Suite } from '../types';

const analytic = 'Лена, аналитик';
const lawyer = 'Дмитрий, юрист';

export const analog: Suite = {
    startCard: {
        skipSteps: 0,
        character: analytic,
        description: 'В Китае делают 100% аналог нашего приложения, будем с ними судиться?',
        yes: {
            description: 'Да',
            scores: { money: -10 },
            nextCard: {
                skipSteps: 3,
                character: lawyer,
                description:
                    'Китайцы предлагают заключить мирное соглашение: они выплатят нам компенсацию, но продолжать разрабатывать приложение',
                yes: {
                    description: 'Хорошо',
                    scores: { money: 20, audience: -10 },
                },
                no: {
                    description: 'Нет, засудить!',
                    scores: { money: -10, audience: 10 },
                },
            },
        },
        no: {
            description: 'Нет',
            scores: { audience: -10 },
            nextCard: {
                skipSteps: 3,
                character: analytic,
                description:
                    'Китайцы со своим аналогом начинают отбирать у нас аудиторию, может попробуем их купить?',
                yes: {
                    description: 'Да',
                    scores: { money: -20, audience: 20 },
                },
                no: {
                    description: 'Нет',
                    scores: { audience: -10 },
                },
            },
        },
    },
};
