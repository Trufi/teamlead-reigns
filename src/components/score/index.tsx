import React from 'react';
import cn from 'classnames';
import styles from './index.module.css';

export interface ScoreProps {
    type: string;
    value: number;
    delta?: number;
}

export const Score = ({ type, value, delta = 0 }: ScoreProps) => {
    return (
        <div className={cn(styles.container, { [styles.failed]: value === 0 || value === 100 })}>
            <div className={styles.point}>
                {delta !== 0 && (
                    <div
                        className={cn(styles.pointInner, {
                            [styles.low]: Math.abs(delta) <= 5,
                            [styles.high]: Math.abs(delta) >= 20,
                        })}
                    />
                )}
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
