import Action from './Action';

export interface SetHeroWrote extends Action<'SetHeroWrote'>
{
    payload: boolean;
}

export interface SetCurrentSection extends Action<'SetCurrentSection'>
{
    payload: string;
}

export interface SetInnerActive extends Action<'SetInnerActive'>
{
    payload: boolean;
}

export interface SetDidInnerOpen extends Action<'SetDidInnerOpen'>
{
    payload: boolean;
}

export interface SetInnerSectionRelativeItem extends Action<'SetInnerSectionRelativeItem'>
{
    payload: HTMLElement;
}

export interface SetActiveProject extends Action<'SetActiveProject'>
{
    payload: number | null;
}

export type HomeActions =
    SetHeroWrote
    | SetActiveProject
    | SetCurrentSection
    | SetDidInnerOpen
    | SetInnerActive
    | SetInnerSectionRelativeItem;
