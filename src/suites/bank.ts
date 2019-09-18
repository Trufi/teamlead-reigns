import { Suite, Card } from '../types';

const lastRepayment: Card = {
    skipSteps: 5,
    character: 'Владислав, личный менеджер',
    description: 'Здравствуйте, последняя выплата по кредиту',
    yes: {
        description: 'На',
        scores: {
            money: -15,
        },
    },
    no: {
        description: 'Нет',
        nextCard: {
            skipSteps: 5,
            character: 'Владимир, судебный пристав',
            description: 'Мы забираем у вас компьютеры на сумму задолженности',
            yes: {
                description: 'Что...',
                scores: {
                    money: -10,
                    team: -5,
                },
            },
            no: {
                description: 'Что...',
                scores: {
                    money: -10,
                    team: -5,
                },
            },
        },
    },
};

export const bank: Suite = {
    startCard: {
        character: 'Владислав, личный менеджер',
        description:
            'Здравствуйте, я ваш личный менеджер. Не желаете приобрести кредит на выгодных условиях?',
        skipSteps: 0,
        yes: {
            description: 'Желаю',
            scores: {
                money: 20,
            },
            nextCard: {
                skipSteps: 5,
                character: 'Владислав, личный менеджер',
                description: 'Здравствуйте, пора делать первую выплату по кредиту',
                yes: {
                    description: 'Ок',
                    scores: {
                        money: -15,
                    },
                    nextCard: lastRepayment,
                },
                no: {
                    description: 'Нет',
                    nextCard: {
                        skipSteps: 0,
                        character: 'Владислав, личный менеджер',
                        description:
                            'Вам придется заплатить неустойку и мы все еще ждем от вас выплату',
                        yes: {
                            description: 'Ок',
                            scores: {
                                money: -15,
                            },
                            nextCard: lastRepayment,
                        },
                        no: {
                            description: 'Нет',
                            nextCard: {
                                skipSteps: 5,
                                character: 'Кирилл, коллектор',
                                description: 'Когда вернете кредит?',
                                yes: {
                                    description: 'Нате',
                                    scores: {
                                        money: -30,
                                    },
                                },
                                no: {
                                    description: 'Обойдетесь',
                                    nextCard: {
                                        skipSteps: 2,
                                        character: 'Кирилл и Сергей, коллекторы',
                                        description: 'Где деньги, Лебовски?',
                                        yes: {
                                            description: 'Ковер не трогайте',
                                            scores: {
                                                money: -30,
                                            },
                                        },
                                        no: {
                                            description: 'Уходите',
                                            nextCard: {
                                                skipSteps: 2,
                                                character: 'Кирилл, Сергей, Андрей, коллекторы',
                                                description: 'Слышь, ты че, не понял?',
                                                yes: {
                                                    description: 'Понял',
                                                    scores: {
                                                        money: -30,
                                                    },
                                                },
                                                no: {
                                                    description: 'Нет',
                                                    nextCard: {
                                                        skipSteps: 0,
                                                        character:
                                                            'Кирилл, Сергей, Андрей, коллекторы',
                                                        description: 'Кончай с ним, Серега',
                                                        yes: {
                                                            description: 'Что...',
                                                            scores: {
                                                                money: -100,
                                                                audience: -100,
                                                                code: -100,
                                                                team: -100,
                                                            },
                                                        },
                                                        no: {
                                                            description: 'Что...',
                                                            scores: {
                                                                money: -100,
                                                                audience: -100,
                                                                code: -100,
                                                                team: -100,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        no: {
            description: 'Нет',
        },
    },
};
