import React, { useReducer } from 'react';
import { reducer } from '../../reducers';
import { createState } from '../../state';
import { Card } from '../../../../src/types';
import { CardComponent } from '../card';

const cardSize = 350;

export const App = () => {
    const [state] = useReducer(reducer, createState());

    const suite = state.suites[state.currentSuite];

    const data = cardToColumns(suite.startCard);

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <div>
                width: {data.width}, height: {data.height}
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${data.width}px`,
                    height: `${data.height}px`,
                }}
            >
                {data.cards.map((cc, index) => (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${cc.x}px`,
                            top: `${cc.y}px`,
                            margin: `${-cardSize / 2}px 0 0 ${-cardSize / 2}px`,
                        }}
                    >
                        <CardComponent card={cc.card} key={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

interface MarkedColumn {
    x: number;
    y: number;
    card: Card | undefined;
}

const cardToColumns = (card: Card) => {
    const columns: Array<Array<Card | undefined>> = [];

    columns[0] = [card];
    let needNext = true;
    let i = 1;

    do {
        columns[i] = [];
        needNext = iterator(columns[i - 1], columns[i]);
        i++;
    } while (needNext);

    const maxLen = columns[columns.length - 1].length;
    const height = maxLen * cardSize;
    const markedCards: MarkedColumn[] = [];

    columns.forEach((column, columnIndex) => {
        column.forEach((card, cardIndex) => {
            markedCards.push({
                card,
                x: (0.5 + columnIndex) * cardSize,
                y: (maxLen / column.length) * (0.5 + cardIndex) * cardSize,
            });
        });
    });

    return {
        cards: markedCards,
        height,
        width: columns.length * cardSize,
    };
};

const iterator = (prevColumn: Array<Card | undefined>, currentColumn: Array<Card | undefined>) => {
    let hasNextCard = false;

    prevColumn.forEach((card) => {
        if (card) {
            if (card.yes.nextCard) {
                currentColumn.push(card.yes.nextCard.card);
                hasNextCard = true;
            } else {
                currentColumn.push(undefined);
            }

            if (card.no.nextCard) {
                currentColumn.push(card.no.nextCard.card);
                hasNextCard = true;
            } else {
                currentColumn.push(undefined);
            }
        } else {
            currentColumn.push(undefined);
            currentColumn.push(undefined);
        }
    });

    return hasNextCard;
};
