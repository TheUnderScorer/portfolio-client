import { Action } from 'redux';

export interface SetHeroWrote extends Action<'SetHeroWrote'> {
    payload: boolean;
}

export type HomeActions = SetHeroWrote | any;
