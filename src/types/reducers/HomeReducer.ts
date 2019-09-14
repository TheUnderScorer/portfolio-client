import { ReducerHandler } from './ReducerHandler';
import { HomeActions } from '../actions/HomeActions';

export default interface HomeReducer
{
    didHeroWrote: boolean;
    currentSection: string;
    innerActive: boolean;
    didInnerOpen: boolean;
    innerSectionRelativeItem?: HTMLElement;
    activeProject?: number | null;
}

export type HomeReducerHandler = Record<HomeActions['type'], ReducerHandler<HomeReducer>>
