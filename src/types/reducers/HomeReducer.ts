import { ReducerHandler } from './ReducerHandler';
import { HomeActions } from '../actions/HomeActions';

export default interface HomeReducer {
    didHeroWrote: boolean;
    currentSection: string;
    innerActive: boolean;
    didInnerOpen: boolean;
    innerSectionRelativeItem?: HTMLElement;
}

export type HomeReducerHandler = {
    [key in HomeActions['type']]: ReducerHandler<HomeReducer>;
}
