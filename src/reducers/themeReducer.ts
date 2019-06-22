import { Reducer } from 'redux';
import ThemeReducer, { ThemeMode, ThemeReducerHandler } from '../types/reducers/ThemeReducer';
import { ThemeActions } from '../types/actions/ThemeActions';

const initialState: ThemeReducer = {
    mode: localStorage.getItem( 'themeMode' )
              ? localStorage.getItem( 'themeMode' ) as ThemeMode
              : 'white'
};

const handlers: ThemeReducerHandler = {
    SetThemeMode: ( state, mode: ThemeMode ) => {
        localStorage.setItem( 'themeMode', mode );

        return {
            ...state,
            mode
        }
    }
};

const themeReducer: Reducer<ThemeReducer, ThemeActions> = ( state: ThemeReducer = initialState, action ) => {

    if ( !action ) {
        return state;
    }

    const { type } = action;

    if ( !type || !handlers[ type ] ) {
        return state;
    }

    return handlers[ type ]( state, action.payload );

};

export default themeReducer;
