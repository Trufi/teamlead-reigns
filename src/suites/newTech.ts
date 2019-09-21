import { Suite, Card } from '../types';

const elm: Card = {
    skipSteps: 5,
    character: 'Федор, новатор',
    description: 'Хочу попробовать на проекте язык Elm',
    yes: {
        description: 'Давай попробуй',
        scores: { team: 5 },
        nextCard: {
            skipSteps: 3,
            character: 'Лена, аналитик',
            description: 'Пора искать нового разработчика со знанием Elm',
            yes: {
                description: 'Ищем',
                scores: { money: -5 },
                nextCard: {
                    skipSteps: 3,
                    character: 'Лиза, HR',
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
    no: {
        description: 'Зачем? Нет',
        scores: { team: -10 },
        // тут он дальше пробует еще какую-нибудь хипстерскую технологию
    },
};

export const newTech: Suite = {
    startCard: {
        character: 'Федор, новатор',
        description: 'Хочу для нового модуля использовать Reason',
        skipSteps: 0,
        yes: {
            description: 'Попробуй',
            scores: {
                team: 5,
            },
            nextCard: {
                skipSteps: 3,
                character: 'Лена, аналитик',
                description: 'Пора нанимать нового разработчика со знанием Reason',
                yes: {
                    description: 'Вперед!',
                    scores: {
                        money: -5,
                    },
                    nextCard: {
                        skipSteps: 3,
                        character: 'Лиза, HR',
                        description:
                            'Мы нашли разработчика со знанием Reason, но он привык к зарплате в полтора раз выше, берем?',
                        yes: {
                            description: 'Берем',
                            scores: {
                                money: -20,
                                team: 10,
                            },
                            nextCard: elm,
                        },
                        no: {
                            description: 'Нет',
                            scores: {
                                team: -10,
                                code: -10,
                                money: 5,
                            },
                            nextCard: elm,
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
                    nextCard: elm,
                },
            },
        },
        no: {
            description: 'Нет',
            scores: {
                team: -5,
            },
            nextCard: elm,
        },
    },
};
