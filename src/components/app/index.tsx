import React, { useReducer } from 'react';
import styles from './index.module.css';
import { reducer } from '../../reducers';
import { createState } from '../../state';
import { State } from '../../types';
import { CardComponent } from '../card';
import { randomSeed } from '../../utils';
import { ScoresHeader } from '../scoresHeader';
import { GameOver } from '../gameover';

export const App = () => {
    let initialState = createState(randomSeed());

    const storageItem = localStorage && localStorage.getItem('reigns');
    if (storageItem) {
        const storageState = JSON.parse(storageItem) as State;
        if (!storageState.lose) {
            initialState = storageState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    if (localStorage) {
        localStorage.setItem('reigns', JSON.stringify(state));
    }

    const card = state.deck[0].card;

    return (
        <div className={styles.container}>
            <ScoresHeader
                scores={state.scores}
                effect={state.answer && card[state.answer].scores}
            />
            {state.lose === false && <CardComponent card={card} dispatch={dispatch} />}
            <div className={styles.days}>
                <div className={styles.dayCounter}>{state.day}</div>
                <div>day</div>
            </div>
            {state.lose && <GameOver scores={state.scores} dispatch={dispatch} />}
            <div className={styles.description}>
                Игра про сложную жизнь тимлида. Все совпадения случайны.
            </div>
        </div>
    );
};
