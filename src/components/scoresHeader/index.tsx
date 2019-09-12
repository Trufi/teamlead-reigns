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
