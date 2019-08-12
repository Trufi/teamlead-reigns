import React from 'react';
import { Card } from '../../../../src/types';
import styles from './index.module.css';

export interface CardComponentProps {
    card: Card | undefined;
}

export const CardComponent = ({ card }: CardComponentProps) => {
    if (card) {
        return (
            <div className={styles.container}>
                <div className={styles.description}>{card.description}</div>
                <div className={styles.character}>{card.character}</div>
            </div>
        );
    }

    return <div className={styles.container}></div>;
};
