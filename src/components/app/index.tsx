import React, { useReducer } from 'react';
import { reducer } from '../../reducers';
import { createState } from '../../state';
import { Scores, ScoresEffect } from '../../types';
import { Score } from '../score';
import { CardComponent } from '../card';

interface ScoresProps {
    scores: Scores;
    effect?: ScoresEffect;
}

const ScoresComponent = ({ scores, effect }: ScoresProps) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 30px 20px 30px',
            }}
        >
            <div>
                <Score
                    type={'audience'}
                    value={scores.audience}
                    willChange={effect && Boolean(effect.audience)}
                />
            </div>
            <div>
                <Score
                    type={'code'}
                    value={scores.code}
                    willChange={effect && Boolean(effect.code)}
                />
            </div>
            <div>
                <Score
                    type={'team'}
                    value={scores.team}
                    willChange={effect && Boolean(effect.team)}
                />
            </div>
            <div>
                <Score
                    type={'money'}
                    value={scores.money}
                    willChange={effect && Boolean(effect.money)}
                />
            </div>
        </div>
    );
};

export const App = () => {
    const [state, dispatch] = useReducer(reducer, createState(1));

    const card = state.deck[0].card;

    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <ScoresComponent
                scores={state.scores}
                effect={state.answer && card[state.answer].scores}
            />
            <CardComponent card={card} dispatch={dispatch} />
            <div style={{ margin: '20px 0 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '60px', lineHeight: 0.9 }}>{state.day}</div>
                <div>day</div>
            </div>
            {state.lose && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100%',
                        lineHeight: '100vh',
                        textAlign: 'center',
                        fontSize: '70px',
                        fontWeight: 700,
                        color: '#ff0000',
                        background: 'radial-gradient(#ff00004f, #00000000)',
                        userSelect: 'none',
                    }}
                >
                    WASTED
                </div>
            )}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    fontStyle: 'italic',
                    fontSize: '10px',
                }}
            >
                Игра про сложную жизнь тимлида. Все совпадения случайны.
            </div>
        </div>
    );
};
