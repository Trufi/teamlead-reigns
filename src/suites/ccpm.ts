import { Suite } from '../types';

export const ccpm: Suite = {
    startCard: {
        character: 'Денис',
        description: 'Надо для планирования задач использовать critical chain project management',
        yes: {
            description: 'Хорошая идея',
            scores: {},
            nextCard: {
                skipSteps: 3,
                card: {
                    character: 'Петя',
                    description: 'Я запарился рисовать эти критические колбаски!',
                    yes: {
                        description: 'Успокойся',
                        scores: {
                            team: -10,
                        },
                        nextCard: {
                            skipSteps: 3,
                            card: {
                                character: 'Вася',
                                description:
                                    'Я потратил 2 часа на заполнение колбасок, какой черта?',
                                yes: {
                                    description: 'Это полезно',
                                    scores: {
                                        team: -15,
                                        money: -10,
                                    },
                                    nextCard: {
                                        skipSteps: 3,
                                        card: {
                                            description:
                                                'На последнем планировании команда потратили целый день, чтобы обновить роадмап по методу критической цепи',
                                            yes: {
                                                description: 'Да к черту!',
                                                scores: {
                                                    team: 20,
                                                },
                                            },
                                            no: {
                                                description: 'Работа — есть работа',
                                                scores: {
                                                    money: -20,
                                                },
                                            },
                                        },
                                    },
                                },
                                no: {
                                    description: 'Поговори с Денисом',
                                    scores: {
                                        team: -10,
                                        money: -10,
                                    },
                                    nextCard: {
                                        skipSteps: 3,
                                        card: {
                                            character: 'Денис',
                                            description:
                                                'СCPM отлично работает: повысилась предсказуемость планирования и продуктивность команды',
                                            yes: {
                                                description: 'Согласен',
                                                scores: {
                                                    team: -10,
                                                    money: 10,
                                                },
                                            },
                                            no: {
                                                description: 'Отказываемся',
                                                scores: {
                                                    team: 10,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    no: {
                        description: 'Обсудим на ретре',
                        scores: {
                            team: -10,
                        },
                        nextCard: {
                            skipSteps: 3,
                            card: {
                                character: 'Ретра',
                                description: 'Мы продолжаем использовать метод критической цепи?',
                                yes: {
                                    description: 'Да',
                                    scores: {
                                        team: -10,
                                    },
                                },
                                no: {
                                    description: 'Нет',
                                    scores: {
                                        team: 10,
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
            scores: {
                team: -5,
            },
        },
    },
};
