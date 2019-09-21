import React, { useState, useEffect } from 'react';
import { Card, Dispatch } from '../../types';
import styles from './index.module.css';

const choiceThreshold = 30;

interface PrevCard {
    x: number;
    y: number;
    angle: number;
    card: Card;
}

const PrevCardComponent = ({ data: { card, x, y, angle } }: { data: PrevCard }) => {
    const [position, setPosition] = useState({ x, y, angle });
    const { description, character } = card;

    useEffect(() => {
        // TODO: переделать на что-то более нормальное, чем setTimeout
        const timeout = setTimeout(() => {
            setPosition({
                x: position.x + Math.sign(position.x) * 500,
                y: position.y + 1000,
                angle: position.angle + Math.sign(position.x) * 4,
            });
        }, 20);

        return () => {
            clearTimeout(timeout);
        };
    }, [position.x, position.y, position.angle]);

    return (
        <div
            className={styles.prevCard}
            style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${position.angle}rad)`,
            }}
        >
            <div className={styles.description}>{description}</div>
            {character && <div className={styles.character}>{character}</div>}
        </div>
    );
};

const CardContent = ({ card, x }: { card: Card; x: number }) => {
    const choice = getChoice(x);

    return (
        <div className={styles.content}>
            <div className={styles.description}>{card.description}</div>
            {choice && card[choice].description.length > 0 && (
                <div className={styles.choice}>{card[choice].description}</div>
            )}
            {card.character && <div className={styles.character}>{card.character}</div>}
        </div>
    );
};

export interface CardComponentProps {
    card: Card;
    dispatch: Dispatch;
}

export interface CardComponentState {
    down: boolean;
    start: number[];
    move: number[];
    prevCard?: PrevCard;
}

export const CardComponent = ({ card, dispatch }: CardComponentProps) => {
    const [state, setState] = useState<CardComponentState>({
        down: false,
        start: [0, 0],
        move: [0, 0],
    });

    const { x, y, angle } = getCardPosition(state.move[0]);

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

        const choice = getChoice(state.move[0]);

        setState({
            ...state,
            down: false,
            start: [0, 0],
            move: [0, 0],
            prevCard: choice ? { x, y, angle, card } : undefined,
        });

        if (choice) {
            dispatch({ type: choice });
        }
    };

    const onMouseMove = (ev: React.MouseEvent) => {
        ev.preventDefault();

        if (!state.down) {
            return;
        }

        dispatch({ type: 'showAnswer', answer: getChoice(state.move[0]) });

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

        dispatch({ type: 'showAnswer', answer: getChoice(state.move[0]) });

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

    return (
        <div className={styles.container}>
            {state.prevCard && (
                <PrevCardComponent
                    data={state.prevCard}
                    key={state.prevCard.card.description.slice(0, 9)}
                />
            )}
            <div
                // TODO: key переделать на uuid
                key={card.description.slice(0, 10)}
                className={styles.movePart}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
                }}
            >
                <CardContent card={card} x={state.move[0]} />
                <div className={styles.shirt} />
            </div>
        </div>
    );
};

function getChoice(x: number): 'yes' | 'no' | undefined {
    if (x > choiceThreshold) {
        return 'yes';
    }

    if (x < -choiceThreshold) {
        return 'no';
    }
}

function getCardPosition(x: number) {
    const R = 500;
    // x^2 + y^2 = R^2
    // y = \/r^2 - x^2
    // x = sinA * R
    const angle = Math.asin(x / R);
    const y = R - Math.sqrt(R * R - x * x);
    return {
        x,
        y,
        angle,
    };
}
