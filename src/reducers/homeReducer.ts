import { Reducer } from 'redux';
import HomeReducer, { HomeReducerHandler } from '../types/reducers/HomeReducer';
import { HomeActions } from '../types/actions/HomeActions';

const initialState: HomeReducer = {
    didHeroWrote:   false,
    currentSection: '',
    innerActive:    false,
    didInnerOpen:   false,
};

const handlers: HomeReducerHandler = {
    SetHeroWrote:      ( state, didHeroWrote: boolean ) => {
        return {
            ...state,
            didHeroWrote
        }
    },
    SetCurrentSection: ( state, currentSection: string ) => {
        return {
            ...state,
            currentSection
        }
    },
    SetInnerActive:    ( state, innerActive: boolean ) => {
        return {
            ...state,
            innerActive
        };
    },
    SetDidInnerOpen:   ( state, didInnerOpen: boolean ) => {
        return {
            ...state,
            didInnerOpen
        }
    }
};

const homeReducer: Reducer<HomeReducer, HomeActions> = ( state: HomeReducer = initialState, action: any = {} ) => {

    if ( !action ) {
        return state;
    }

    const { type } = action as HomeActions;

    if ( !type || !handlers[ type ] ) {
        return state;
    }

    return handlers[ type ]( state, action.payload );

};

export default homeReducer;
