import { State } from './types';
import { suites } from '../../src/suites';

export const createState = (): State => {
    return {
        suites,
        currentSuite: 'newTech',
    };
};
