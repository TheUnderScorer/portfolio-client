import UserReducer from '../../types/reducers/UserReducer';
import * as faker from 'faker';
import userReducer from '../userReducer';
import User from '../../types/models/User';
import { SetCurrentUser } from '../../types/actions/UserActions';

describe( 'userReducer', () => {

    let state: UserReducer;

    beforeEach( () => {
        state = {
            currentUser: {
                token: faker.random.uuid(),
                name:  faker.name.firstName(),
            }
        };
    } );

    it( 'Should return state if action is empty', () => {
        const newState = userReducer( state, null );

        expect( newState ).toEqual( state );
    } );

    it( 'SetCurrentUser action', () => {
        const newUser: User = {
            token: faker.random.uuid(),
            name:  faker.name.firstName()
        };
        const action: SetCurrentUser = {
            type:    'SetCurrentUser',
            payload: newUser
        };

        const newState = userReducer( state, action );

        expect( newState.currentUser ).toEqual( newUser );
    } )

} );
