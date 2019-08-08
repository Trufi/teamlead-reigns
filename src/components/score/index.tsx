import React from 'react';
import styles from './index.module.css';

export interface ScoreProps {
    type: string;
    value: number;
    willChange?: boolean;
}

export const Score = ({ type, value, willChange }: ScoreProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.point}>
                {
                    <div
                        className={styles.pointInner}
                        style={{ visibility: willChange ? 'visible' : 'hidden' }}
                    />
                }
            </div>
            <div className={styles.volume}>
                <div
                    className={styles.innerVolume}
                    style={{
                        height: `${value}%`,
                    }}
                />
            </div>
            <div className={styles.icon}>{type}</div>
        </div>
    );
};
