export interface Scores {
    code: number;
    money: number;
    audience: number;
    team: number;
}

export interface CardChoice {
    description: string;
    scores: ScoresEffect;
    nextCard?: NextCard;
}

export interface Card {
    character?: string;
    description: string;
    image?: string;
    yes: CardChoice;
    no: CardChoice;
}

export type ScoresEffect = Partial<Scores>;

export interface NextCard {
    card: Card;
    skipSteps: number;
}

export interface Suite {
    startCard: Card;
}

export interface DeckCard {
    suite: string;
    card: Card;
}

export interface State {
    seed: number;
    scores: Scores;
    deck: Array<DeckCard>;
    lose: boolean;
    answer?: 'yes' | 'no';
    day: number;
}

export interface YesAction {
    type: 'yes';
}

export interface NoAction {
    type: 'no';
}

export interface ShowAnswerAction {
    type: 'showAnswer';
    answer: 'yes' | 'no' | undefined;
}

export type Action = YesAction | NoAction | ShowAnswerAction;
export type Dispatch = React.Dispatch<Action>;
