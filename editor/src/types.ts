import { Suite } from '../../src/types';

export interface State {
    suites: { [key: string]: Suite };
    currentSuite: string;
}

export interface OpenSuiteAction {
    type: 'openSuite';
    suite: string;
}

export type Action = OpenSuiteAction;
