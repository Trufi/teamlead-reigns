import React, { useReducer } from 'react';
import { reducer } from '../../reducers';
import { createState } from '../../state';
import { Card } from '../../../../src/types';
import { CardComponent } from '../card';

interface ColumnProps {
    data: Array<ColumnCard>;
    maxLen: number;
}

const cardSize = 350;

const Column = ({ data }: ColumnProps) => {
    return (
        <div
            style={{
                position: 'relative',
                width: `${cardSize}px`,
            }}
        >
            {data.map((cc, index) => (
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: `${Math.max(cc.parentIndex, index) * cardSize}px`,
                    }}
                >
                    {cc.parentIndex} - {index}
                    <CardComponent card={cc.card} key={index} />
                </div>
            ))}
        </div>
    );
};

export const App = () => {
    const [state] = useReducer(reducer, createState());

    const suite = state.suites[state.currentSuite];

    const columns = cardToColumns(suite.startCard);

    let maxLen = 0;
    columns.forEach((c) => (maxLen = Math.max(c.length, maxLen)));

    return (
        <div>
            <div style={{ display: 'flex', width: `${cardSize * columns.length}px` }}>
                {columns.map((c, index) => (
                    <Column data={c} maxLen={maxLen} key={index} />
                ))}
            </div>
            <pre>
                <code>{JSON.stringify(state, null, 2)}</code>
            </pre>
        </div>
    );
};

interface ColumnCard {
    card: Card;
    parentIndex: number;
}

const cardToColumns = (card: Card): Array<ColumnCard[]> => {
    const columns: Array<ColumnCard[]> = [];

    columns[0] = [{ card, parentIndex: 0 }];

    cardToColumnsIter(card, columns, 1, 0);

    return columns;
};

const cardToColumnsIter = (
    card: Card,
    columns: Array<Array<ColumnCard>>,
    index: number,
    parentIndex: number,
) => {
    if (!columns[index]) {
        columns[index] = [];
    }

    if (card.yes.nextCard) {
        const cardIndex = columns[index].push({ card: card.yes.nextCard.card, parentIndex }) - 1;
        cardToColumnsIter(card.yes.nextCard.card, columns, index + 1, cardIndex);
    }

    if (card.no.nextCard) {
        const cardIndex = columns[index].push({ card: card.no.nextCard.card, parentIndex }) - 1;
        cardToColumnsIter(card.no.nextCard.card, columns, index + 1, cardIndex);
    }
};
