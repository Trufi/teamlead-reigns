import { Suite, Card } from '../types';

const character = 'Андрей, веган';

const turned: Card = {
    character: 'Андрей, джуниор',
    description: 'Я теперь тоже веган, хотел, чтобы ты знал',
    skipSteps: 5,
    yes: {
        description: 'Ок',
    },
    no: {
        description: 'Хм',
    },
};

const recycle: Card = {
    character,
    description: 'А давайте сортировать мусор по специальным контейнерам?',
    skipSteps: 5,
    yes: {
        description: 'Ок',
        scores: { team: 5 },
        nextCard: turned,
    },
    no: {
        description: 'Нет',
        scores: { team: -5 },
        nextCard: turned,
    },
};

export const vegan: Suite = {
    startCard: {
        character,
        description: 'Может будем использовать свои кружки вместо пластиковых стаканчиков?',
        skipSteps: 0,
        yes: {
            description: 'Ок',
            scores: { money: -5 },
            nextCard: recycle,
        },
        no: {
            description: 'Нет',
            scores: { team: -5 },
            nextCard: {
                skipSteps: 3,
                character,
                description: 'Ну может заменим стаканчики на картонные?',
                yes: {
                    description: 'Ладно',
                    scores: { money: -5 },
                    nextCard: recycle,
                },
                no: {
                    description: 'Нет',
                    scores: { team: -5 },
                    nextCard: recycle,
                },
            },
        },
    },
};
