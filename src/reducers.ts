import {
    Action,
    State,
    YesAction,
    NoAction,
    Scores,
    ScoresEffect,
    CardChoice,
    ShowAnswerAction,
    Card,
    DeckCard,
    Suite,
    ConditionSign,
} from './types';
import { arrayInsert, clamp, randomDeck } from './utils';
import { suites } from './suites';
import { createState } from './state';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'yes':
            return yes(state, action);
        case 'no':
            return no(state, action);
        case 'showAnswer':
            return showAnswer(state, action);
        case 'restart':
            return createState(state.seed);
        default:
            return state;
    }
};

const showAnswer = (state: State, { answer }: ShowAnswerAction): State => {
    return {
        ...state,
        answer,
    };
};

const createDeckCard = (suite: string, card: Card): DeckCard => ({
    suite,
    card,
});

const signValue = (sign: ConditionSign, a: number, b: number): boolean => {
    switch (sign) {
        case '<':
            return a < b;
        case '>':
            return a > b;
    }

    return true;
};

const satisfyConditions = (suite: Suite, state: State): boolean => {
    if (!suite.conditions) {
        return true;
    }

    return suite.conditions.every(([type, sign, value]) => {
        switch (type) {
            case 'code':
            case 'money':
            case 'audience':
            case 'team':
                return signValue(sign, state.scores[type], value);
        }

        return true;
    });
};

const skipUnableSuites = (state: State, deck: DeckCard[]) => {
    const skipedDeckCards: DeckCard[] = [];

    // Если следующая карта — первая в кейсе, то проверить условия
    let [deckCard, ...rest] = deck;

    while (deckCard) {
        const { suite, card } = deckCard;
        const nextSuite = suites[suite];

        if (card === nextSuite.startCard) {
            if (!satisfyConditions(nextSuite, state)) {
                skipedDeckCards.push(deckCard);
                [deckCard, ...rest] = rest;
            }
        }
    }

    return [deckCard, ...skipedDeckCards, ...rest];
};

const effect = (state: State, effect: CardChoice): State => {
    let [{ suite }, ...deck] = state.deck;

    if (effect.nextCard) {
        deck = arrayInsert(deck, effect.nextCard.skipSteps, createDeckCard(suite, effect.nextCard));
    } else {
        deck = [...deck, createDeckCard(suite, suites[suite].startCard)];

        deck = skipUnableSuites(state, deck);
    }

    let { seed } = state;

    if (deck.length === 0) {
        [seed, deck] = randomDeck(seed);
    }

    const scores = effect.scores ? newScores(state.scores, effect.scores) : state.scores;

    return {
        ...state,
        seed,
        scores,
        deck,
        answer: undefined,
        lose: checkLose(scores),
        day: state.day + 1,
    };
};

const yes = (state: State, _action: YesAction): State => {
    return effect(state, state.deck[0].card.yes);
};

const no = (state: State, _action: NoAction): State => {
    return effect(state, state.deck[0].card.no);
};

const newScores = (score: Scores, diff: ScoresEffect): Scores => {
    const sc = (v: number) => clamp(v, 0, 100);

    return {
        audience: diff.audience ? sc(score.audience + diff.audience) : score.audience,
        money: diff.money ? sc(score.money + diff.money) : score.money,
        team: diff.team ? sc(score.team + diff.team) : score.team,
        code: diff.code ? sc(score.code + diff.code) : score.code,
    };
};

const checkLose = (scores: Scores): boolean => {
    return (
        scores.audience === 0 ||
        scores.audience === 100 ||
        scores.code === 0 ||
        scores.code === 100 ||
        scores.money === 0 ||
        scores.money === 100 ||
        scores.team === 0 ||
        scores.team === 100
    );
};
