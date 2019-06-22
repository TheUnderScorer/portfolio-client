import { Reducer } from 'redux';
import HomeReducer, { HomeReducerHandler } from '../types/reducers/HomeReducer';
import { HomeActions } from '../types/actions/HomeActions';

const initialState: HomeReducer = {
    didHeroWrote:   false,
    currentSection: '',
    innerActive:    false,
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
    }
};

const homeReducer: Reducer<HomeReducer, HomeActions> = ( state: HomeReducer = initialState, action ) => {

    if ( !action ) {
        return state;
    }

    const { type } = action;

    if ( !type || !handlers[ type ] ) {
        return state;
    }

    return handlers[ type ]( state, action.payload );

};

export default homeReducer;
