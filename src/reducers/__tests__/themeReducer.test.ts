import ThemeReducer from '../../types/reducers/ThemeReducer';
import themeReducer from '../themeReducer';
import { SetThemeMode } from '../../types/actions/ThemeActions';

describe( 'themeReducer', () => {

    let state: ThemeReducer;

    beforeEach( () => {
        state = {
            mode: 'white'
        }
    } );

    it( 'Should return state if action is empty', () => {
        const newState = themeReducer( state, null );

        expect( newState ).toEqual( state );
    } );

    it( 'SetThemeMode action', () => {
        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: 'black'
        };

        const newState = themeReducer( state, action );

        expect( newState.mode ).toEqual( 'black' );
    } )

} );
