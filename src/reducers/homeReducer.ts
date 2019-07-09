import HomeReducer, { HomeReducerHandler } from '../types/reducers/HomeReducer';
import reducer from './reducer';

export const initialState: HomeReducer = {
    didHeroWrote:   false,
    currentSection: '',
    innerActive:    false,
    didInnerOpen:   false,
};

const handlers: HomeReducerHandler = {
    SetHeroWrote:                ( state, didHeroWrote: boolean ) => {
        return {
            ...state,
            didHeroWrote
        };
    },
    SetCurrentSection:           ( state, currentSection: string ) => {
        return {
            ...state,
            currentSection
        };
    },
    SetInnerActive:              ( state, innerActive: boolean ) => {
        return {
            ...state,
            innerActive
        };
    },
    SetDidInnerOpen:             ( state, didInnerOpen: boolean ) => {
        return {
            ...state,
            didInnerOpen
        };
    },
    SetInnerSectionRelativeItem: ( state, innerSectionRelativeItem: HTMLElement ) => {
        return {
            ...state,
            innerSectionRelativeItem
        };
    }
};

export default reducer( handlers, initialState );

