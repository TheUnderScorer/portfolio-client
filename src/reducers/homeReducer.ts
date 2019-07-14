import HomeReducer, { HomeReducerHandler } from '../types/reducers/HomeReducer';
import reducer from './reducer';

export const initialState: HomeReducer = {
    didHeroWrote:   false,
    currentSection: '',
    innerActive:    false,
    didInnerOpen:   false,
};

const handlers: HomeReducerHandler = {
    SetHeroWrote:                ( state, didHeroWrote: boolean ) => ( {
        ...state,
        didHeroWrote
    } ),
    SetCurrentSection:           ( state, currentSection: string ) => ( {
        ...state,
        currentSection
    } ),
    SetInnerActive:              ( state, innerActive: boolean ) => ( {
        ...state,
        innerActive
    } ),
    SetDidInnerOpen:             ( state, didInnerOpen: boolean ) => ( {
        ...state,
        didInnerOpen
    } ),
    SetInnerSectionRelativeItem: ( state, innerSectionRelativeItem: HTMLElement ) => ( {
        ...state,
        innerSectionRelativeItem
    } ),
    SetActiveProject:            ( state, activeProject: number | null ) => ( {
        ...state,
        activeProject
    } )
};

export default reducer( handlers, initialState );

