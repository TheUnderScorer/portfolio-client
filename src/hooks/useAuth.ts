import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { useCallback } from 'react';
import { SetToken } from '../types/actions/UserActions';
import { MutationFn, MutationResult, useMutation } from 'react-apollo-hooks';
import { UserResult } from '../types/graphql/Mutations';
import User from '../types/graphql/User';
import { CREATE_USER } from '../graphql/mutations/users';

export type UseAuthResult = [
    string,
    ( input?: Partial<User> ) => Promise<User>,
    [ MutationFn<any, any>, MutationResult<UserResult> ]
    ]

export default (): UseAuthResult =>
{
    const token = useSelector( ( store: HomeStore ) => store.user.token );

    const creationMutation = useMutation<UserResult>( CREATE_USER );
    const [ callMutation ] = creationMutation;

    const dispatch = useDispatch();

    const setToken = useCallback( ( newToken: string ) =>
    {
        const action: SetToken = {
            type:    'SetToken',
            payload: newToken
        };

        dispatch( action );
    }, [ dispatch ] );

    const createUser = useCallback( async ( input: Partial<User> = {} ): Promise<User> =>
    {
        const result = await callMutation( {
            variables: {
                input,
            }
        } );

        const { user } = result.data;
        const { token } = user as User;

        if ( token ) {
            setToken( token.value );
        }

        return user;
    }, [] );

    return [ token, createUser, creationMutation ];
}
