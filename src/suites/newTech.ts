import { Suite } from '../types';

export const newTech: Suite = {
    startCard: {
        character: 'Федор',
        description: 'Хочу для нового модуля использовать Reason',
        yes: {
            description: 'Попробуй',
            scores: {
                team: 5,
            },
            nextCard: {
                skipSteps: 3,
                card: {
                    description: 'Пора нанимать нового разработчика со знанием Reason',
                    yes: {
                        description: 'Вперед!',
                        scores: {
                            money: -5,
                        },
                        nextCard: {
                            skipSteps: 3,
                            card: {
                                character: 'Лиза',
                                description:
                                    'Мы нашли разработчика со знанием Reason, но он хочет в полтора раза больше зп и полную удаленку, берем?',
                                yes: {
                                    description: 'Берем',
                                    scores: {
                                        money: -20,
                                        team: 10,
                                    },
                                },
                                no: {
                                    description: 'Нет',
                                    scores: {
                                        team: -10,
                                        code: -10,
                                        money: 5,
                                    },
                                },
                            },
                        },
                    },
                    no: {
                        description: 'Нет',
                        scores: {
                            code: -10,
                            team: -10,
                            money: 10,
                        },
                    },
                },
            },
        },
        no: {
            description: 'Нет',
            scores: {
                team: -5,
            },
            nextCard: {
                skipSteps: 3,
                card: {
                    character: 'Федор',
                    description: 'Хочу попробовать на проекте Elm',
                    yes: {
                        description: 'Давай попробуй',
                        scores: {
                            team: 5,
                        },
                        nextCard: {
                            skipSteps: 3,
                            card: {
                                description: 'Пора искать нового разработчика со знанием Elm',
                                yes: {
                                    description: 'Ищем',
                                    scores: {
                                        money: -5,
                                    },
                                    nextCard: {
                                        skipSteps: 3,
                                        card: {
                                            character: 'Лиза',
                                            description:
                                                'На рынке нет разрабов со знанием Elm, берем обычного со знанием JS?',
                                            yes: {
                                                description: 'А что делать? Берем',
                                                scores: {
                                                    money: -10,
                                                    team: 10,
                                                    code: -5,
                                                },
                                            },
                                            no: {
                                                description: 'Нет',
                                                scores: {
                                                    money: 5,
                                                    team: -10,
                                                    code: -10,
                                                },
                                            },
                                        },
                                    },
                                },
                                no: {
                                    description: 'Нет',
                                    scores: {
                                        team: -10,
                                        money: 10,
                                        code: -10,
                                    },
                                },
                            },
                        },
                    },
                    no: {
                        description: 'Зачем? Нет',
                        scores: {
                            team: -10,
                        },
                        // тут он дальше пробует еще какую-нибудь хипстерскую технологию
                    },
                },
            },
        },
    },
};
