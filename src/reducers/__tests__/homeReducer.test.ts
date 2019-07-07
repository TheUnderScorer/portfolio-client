import HomeReducer from '../../types/reducers/HomeReducer';
import { SetHeroWrote } from '../../types/actions/HomeActions';
import homeReducer, { initialState } from '../homeReducer';

describe( 'themeReducer', () => {

    let state: HomeReducer;

    beforeEach( () => {
        state = initialState;
    } );

    it( 'Should return state if action is empty', () => {
        const newState = homeReducer( state, {} as any );

        expect( newState ).toEqual( state );
    } );

    it( 'SetHeroWrote action', () => {
        const action: SetHeroWrote = {
            type:    'SetHeroWrote',
            payload: true
        };

        const newState = homeReducer( state, action );

        expect( newState.didHeroWrote ).toBeTruthy();
    } )

} );
