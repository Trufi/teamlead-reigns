import { Suite } from '../types';

export const offer: Suite = {
    startCard: {
        character: 'Вася',
        description: 'Я ухожу, меня позвали в Google на зарплату х2',
        yes: {
            description: 'Ну и катись!',
            scores: {
                team: -20,
            },
        },
        no: {
            description: 'Поднять зп до х2',
            scores: {
                money: -20,
            },
            nextCard: {
                skipSteps: 3,
                card: {
                    character: 'Петя',
                    description:
                        'Почему Васе подняли зарплату, а мне нет? Он делает в 2 раза меньше меня',
                    yes: {
                        description: 'Поднять зп Пете',
                        scores: {
                            money: -20,
                        },
                    },
                    no: {
                        description: 'У Васи сложная ситуация',
                        scores: {
                            team: -10,
                        },
                    },
                },
            },
        },
    },
};
