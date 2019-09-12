export interface Scores {
    code: number;
    money: number;
    audience: number;
    team: number;
}

export interface CardChoice {
    description: string;
    scores: ScoresEffect;
    nextCard?: Card;
}

export interface Card {
    character?: string;
    description: string;
    image?: string;
    yes: CardChoice;
    no: CardChoice;
    skipSteps: number;
}

export type ScoresEffect = Partial<Scores>;

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
    deck: DeckCard[];
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

export interface RestartAction {
    type: 'restart';
}

export type Action = YesAction | NoAction | ShowAnswerAction | RestartAction;
export type Dispatch = React.Dispatch<Action>;
