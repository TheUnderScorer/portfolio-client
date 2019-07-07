import Action from './Action';

export interface SetHeroWrote extends Action<'SetHeroWrote'> {
    payload: boolean;
}

export interface SetCurrentSection extends Action<'SetCurrentSection'> {
    payload: string;
}

export interface SetInnerActive extends Action<'SetInnerActive'> {
    payload: boolean;
}

export interface SetDidInnerOpen extends Action<'SetDidInnerOpen'> {
    payload: boolean;
}

export type HomeActions = SetHeroWrote | SetCurrentSection | SetDidInnerOpen | SetInnerActive;
