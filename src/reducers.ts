import {
    Action,
    State,
    YesAction,
    NoAction,
    Scores,
    ScoresEffect,
    DeckCard,
    NextCard,
    CardChoice,
    ShowAnswerAction,
} from './types';
import { arrayInsert, randomDeckCard, clamp } from './utils';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'yes':
            return yes(state, action);
        case 'no':
            return no(state, action);
        case 'showAnswer':
            return showAnswer(state, action);
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

const effect = (state: State, effect: CardChoice): State => {
    let [{ suite }, ...deck] = state.deck;

    if (effect.nextCard) {
        deck = newDeck(deck, effect.nextCard, suite);
    }

    let { seed } = state;

    if (deck.length === 0) {
        const res = randomDeckCard(seed);
        seed = res[0];
        deck.unshift(res[1]);
    }

    const scores = newScores(state.scores, effect.scores);

    return {
        ...state,
        seed,
        scores,
        deck,
        answer: undefined,
        lose: checkLose(scores),
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

const newDeck = (deck: Array<DeckCard>, newCard: NextCard, suite: string): Array<DeckCard> => {
    return arrayInsert(deck, newCard.skipSteps, { suite, card: newCard.card });
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
