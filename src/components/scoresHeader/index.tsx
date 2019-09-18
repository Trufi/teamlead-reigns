import React from 'react';
import styles from './index.module.css';
import { Scores, ScoresEffect } from '../../types';
import { Score } from '../score';

export interface ScoresHeaderProps {
    scores: Scores;
    effect?: ScoresEffect;
}

export const ScoresHeader = ({ scores, effect }: ScoresHeaderProps) => {
    return (
        <div className={styles.container}>
            <div>
                <Score
                    type={'audience'}
                    value={scores.audience}
                    delta={effect && effect.audience}
                />
            </div>
            <div>
                <Score type={'code'} value={scores.code} delta={effect && effect.code} />
            </div>
            <div>
                <Score type={'team'} value={scores.team} delta={effect && effect.team} />
            </div>
            <div>
                <Score type={'money'} value={scores.money} delta={effect && effect.money} />
            </div>
        </div>
    );
};
