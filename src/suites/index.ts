import { offer } from './offer';
import { ads } from './ads';
import { Suite } from '../types';
import { newTech } from './newTech';
import { refactor } from './refactor';
import { fridayRelease } from './fridayRelease';

export const suites: { [key: string]: Suite } = {
    offer,
    ads,
    newTech,
    refactor,
    fridayRelease,
};
