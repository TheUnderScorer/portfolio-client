import UserReducer from '../../types/reducers/UserReducer';
import * as faker from 'faker';
import userReducer from '../userReducer';

describe( 'userReducer', () =>
{

    let state: UserReducer;

    beforeEach( () =>
    {
        state = {
            token: faker.random.uuid()
        };
    } );

    it( 'Should return state if action is empty', () =>
    {
        const newState = userReducer( state, {} as any );

        expect( newState ).toEqual( state );
    } );

} );
