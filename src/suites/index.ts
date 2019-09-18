import { offer } from './offer';
import { ads } from './ads';
import { Suite } from '../types';
import { newTech } from './newTech';
import { refactor } from './refactor';
import { fridayRelease } from './fridayRelease';
import { junior } from './junior';
import { bank } from './bank';
import { analog } from './analog';
import { vegan } from './vegan';
import { deviceCut } from './deviceCut';

export const suites: { [key: string]: Suite } = {
    offer,
    ads,
    newTech,
    refactor,
    fridayRelease,
    junior,
    bank,
    analog,
    vegan,
    deviceCut,
};
