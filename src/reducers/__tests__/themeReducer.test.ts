import ThemeReducer from '../../types/reducers/ThemeReducer';
import themeReducer from '../themeReducer';
import { SetThemeMode } from '../../types/actions/ThemeActions';

describe( 'themeReducer', () =>
{
    let state: ThemeReducer;

    beforeEach( () =>
    {
        state = {
            mode: 'light'
        }
    } );

    it( 'Should return state if action is empty', () =>
    {
        const newState = themeReducer( state, null as any );

        expect( newState ).toEqual( state );
    } );

    it( 'SetThemeMode action', () =>
    {
        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: 'dark'
        };

        const newState = themeReducer( state, action );

        expect( newState.mode ).toEqual( 'dark' );
    } )
} );
