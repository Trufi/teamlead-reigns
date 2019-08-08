import React, { useState, useEffect } from 'react';
import { Card, Dispatch } from '../../types';
import styles from './index.module.css';

export interface CardComponentProps {
    card: Card;
    dispatch: Dispatch;
}

const choiceThreshold = 50;

export const CardComponent = ({
    card: { character, description, yes, no },
    dispatch,
}: CardComponentProps) => {
    const [state, setState] = useState({
        down: false,
        start: [0, 0],
        move: [0, 0],
    });

    const onMouseDown = (ev: React.MouseEvent) => {
        ev.preventDefault();
        setState({
            ...state,
            down: true,
            start: [ev.clientX, ev.clientY],
        });
    };

    const onTouchStart = (ev: React.TouchEvent) => {
        ev.preventDefault();
        const touch = ev.touches[0];
        setState({
            ...state,
            down: true,
            start: [touch.clientX, touch.clientY],
        });
    };

    const onMouseUp = () => {
        if (!state.down) {
            return;
        }

        if (state.move[0] > choiceThreshold) {
            dispatch({ type: 'yes' });
        } else if (state.move[0] < -choiceThreshold) {
            dispatch({ type: 'no' });
        }

        setState({
            ...state,
            down: false,
            start: [0, 0],
            move: [0, 0],
        });
    };

    const onMouseMove = (ev: React.MouseEvent) => {
        ev.preventDefault();

        if (!state.down) {
            return;
        }

        if (state.move[0] > choiceThreshold) {
            dispatch({ type: 'showAnswer', answer: 'yes' });
        } else if (state.move[0] < -choiceThreshold) {
            dispatch({ type: 'showAnswer', answer: 'no' });
        } else {
            dispatch({ type: 'showAnswer', answer: undefined });
        }

        setState({
            ...state,
            move: [ev.clientX - state.start[0], ev.clientY - state.start[1]],
        });
    };

    const onTouchMove = (ev: React.TouchEvent) => {
        ev.preventDefault();
        if (!state.down) {
            return;
        }

        if (state.move[0] > choiceThreshold) {
            dispatch({ type: 'showAnswer', answer: 'yes' });
        } else if (state.move[0] < -choiceThreshold) {
            dispatch({ type: 'showAnswer', answer: 'no' });
        } else {
            dispatch({ type: 'showAnswer', answer: undefined });
        }

        const touch = ev.touches[0];
        setState({
            ...state,
            move: [touch.clientX - state.start[0], touch.clientY - state.start[1]],
        });
    };

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchend', onMouseUp);
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchend', onMouseUp);
        };
    });

    const R = 500;
    const x = state.move[0];
    // x^2 + y^2 = R^2
    // y = \/r^2 - x^2
    // x = sinA * R
    const angle = Math.asin(x / R);
    const y = Math.sqrt(R * R - x * x);

    let choice: JSX.Element | undefined;

    if (state.move[0] > choiceThreshold) {
        choice = <div className={styles.choice}>{yes.description}</div>;
    } else if (state.move[0] < -choiceThreshold) {
        choice = <div className={styles.choice}>{no.description}</div>;
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.movePart}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                style={{
                    transform: `translate(${state.move[0]}px, ${R - y}px) rotate(${angle}rad)`,
                }}
            >
                <div className={styles.description}>{description}</div>
                {/* <div>
                    {state.move[0]} - {state.move[1]} - {y} - {angle}
                </div> */}
                {choice}
                {character && <div className={styles.character}>{character}</div>}
            </div>
        </div>
    );
};
