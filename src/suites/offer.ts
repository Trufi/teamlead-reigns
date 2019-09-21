import { Suite, Card } from '../types';

const character = 'Артем, мухожук';

const comeback: Card = {
    skipSteps: 15,
    character,
    description: 'Хочу назад',
    yes: {
        description: 'Ок',
        scores: {
            team: 10,
        },
    },
    no: {
        description: 'Нет',
    },
};

export const offer: Suite = {
    startCard: {
        character,
        description: 'Я ухожу, меня позвали в Nanosoft с увеличением зарплаты на 20%',
        skipSteps: 0,
        yes: {
            description: 'Поднять зарплату',
            scores: {
                money: -10,
            },
            nextCard: {
                skipSteps: 3,
                character,
                description:
                    'Друг предложил мне работать в Pear, я подумал и ухожу, там зарплата на 50% выше',
                yes: {
                    description: 'Поднять зарплату',
                    scores: {
                        money: -15,
                    },
                    nextCard: {
                        skipSteps: 3,
                        character,
                        description: 'Ухожу. Hooli. x2.',
                        yes: {
                            description: 'Поднять зарплату до х2',
                            scores: {
                                money: -20,
                            },
                            nextCard: {
                                skipSteps: 3,
                                character: 'Петя, сеньор',
                                description:
                                    'Почему Васе подняли зарплату, а мне нет? Он делает в 2 раза меньше меня!',
                                yes: {
                                    description: 'Поднять зарплату Пете',
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
                        no: {
                            description: 'Ну и катись!',
                            scores: {
                                team: -20,
                            },
                            nextCard: comeback,
                        },
                    },
                },
                no: {
                    description: 'Ну, удачи',
                    scores: {
                        team: -10,
                    },
                    nextCard: comeback,
                },
            },
        },
        no: {
            description: 'Прощай',
            scores: {
                team: -10,
            },
            nextCard: comeback,
        },
    },
};
