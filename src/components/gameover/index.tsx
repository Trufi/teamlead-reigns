import React from 'react';
import styles from './index.module.css';
import { Scores, Dispatch } from '../../types';

const messages: { [key in keyof Scores]: { max: string; min: string } } = {
    code: {
        min: 'Проект стало невозможно поддерживать.',
        max: 'Разработчики всецело посветили себя рефакторингу кода.',
    },
    money: {
        min: 'Компания разорена.',
        max: 'Босс заработал столько денег — сколько мечтал. Вы уволены.',
    },
    audience: {
        min: 'Ваш продукт забыт, и место ему в музее.',
        max: 'Вас поглотил Hooli. Вы уволены.',
    },
    team: {
        min: 'Как жаль, что один вы вряд ли что-то сможете.',
        max: 'Компания слишком разрослась, процессы стали неуправляемыми. Вы уволены.',
    },
};

export interface GameOverProps {
    scores: Scores;
    dispatch: Dispatch;
}

export const GameOver = ({ scores, dispatch }: GameOverProps) => {
    let message = '';

    let score: keyof Scores;
    for (score in scores) {
        if (scores[score] === 0) {
            message = messages[score].min;
        } else if (scores[score] === 100) {
            message = messages[score].max;
        }
    }

    return (
        <div className={styles.container} onClick={() => dispatch({ type: 'restart' })}>
            <div className={styles.title}>WASTED</div>
            <div className={styles.description}>{message}</div>
        </div>
    );
};
