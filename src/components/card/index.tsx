import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { Card, Dispatch } from '../../types';
import styles from './index.module.css';

export interface CardComponentProps {
    previusCard?: Card;
    card: Card;
    dispatch: Dispatch;
}

const choiceThreshold = 30;

interface CardComponentState {
    down: boolean;
    start: number[];
    move: number[];
    prevCard?: {
        start: number[];
        move: number[];
        card: Card;
    };
}

export const CardComponent = ({ card, previusCard, dispatch }: CardComponentProps) => {
    const [state, setState] = useState<CardComponentState>({
        down: false,
        start: [0, 0],
        move: [0, 0],
    });

    const { character, description, yes, no } = card;

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

        let answer: 'yes' | 'no' | undefined;

        if (state.move[0] > choiceThreshold) {
            answer = 'yes';
        } else if (state.move[0] < -choiceThreshold) {
            answer = 'no';
        }

        setState({
            ...state,
            down: false,
            start: [0, 0],
            move: [0, 0],
            prevCard: answer
                ? {
                      start: state.start,
                      move: state.move,
                      card,
                  }
                : state.prevCard,
        });

        if (answer) {
            dispatch({ type: answer } as any);
        }
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

    let choiceDesc = '';
    if (state.move[0] > choiceThreshold) {
        choiceDesc = yes.description;
    } else if (state.move[0] < -choiceThreshold) {
        choiceDesc = no.description;
    }

    const prevCardOnEntered = () => {
        setTimeout(() => {
            setState({
                ...state,
                prevCard: undefined,
            });
        }, 2000);
    };

    let prevCard: JSX.Element | undefined;
    if (state.prevCard) {
        const { description, character } = state.prevCard.card;
        const { R, y, angle, x } = getPos(state.prevCard.move[0]);

        const transitionStyles = {
            // entering: {
            //     transform: `translate(0px, 500px)`,
            // },
            entered: {
                transform: `translate(${x}px, ${R - y + 3000}px) rotate(${angle +
                    Math.sign(angle) * 1000}rad)`,
            },
            exited: {
                transform: `translate(${x}px, ${R - y}px) rotate(${angle}rad)`,
            },
        } as any;

        prevCard = (
            <Transition timeout={0} onEntered={prevCardOnEntered}>
                {(s) => (
                    <div
                        className={styles.previusCard}
                        style={{
                            transform: `translate(${x}px, ${R - y}px) rotate(${angle}rad)`,
                            ...transitionStyles[s],
                        }}
                    >
                        <div className={styles.description}>{description}</div>
                        {character && <div className={styles.character}>{character}</div>}
                    </div>
                )}
            </Transition>
        );
    }

    const { R, y, angle } = getPos(state.move[0]);

    return (
        <div className={styles.container}>
            <TransitionGroup component={null}>{prevCard}</TransitionGroup>
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
                <CSSTransition
                    classNames={{
                        enter: styles.choiceEnter,
                        enterActive: styles.choiceEnterActive,
                        exit: styles.choiceExit,
                        exitActive: styles.choiceExitActive,
                    }}
                    timeout={{
                        enter: 200,
                        exit: 50,
                    }}
                    in={choiceDesc.length !== 0}
                    unmountOnExit
                >
                    <div className={styles.choice}>{choiceDesc}</div>
                </CSSTransition>
                {character && <div className={styles.character}>{character}</div>}
            </div>
        </div>
    );
};

function getPos(x: number) {
    const R = 500;
    // x^2 + y^2 = R^2
    // y = \/r^2 - x^2
    // x = sinA * R
    const angle = Math.asin(x / R);
    const y = Math.sqrt(R * R - x * x);
    return {
        y,
        angle,
        R,
        x,
    };
}
