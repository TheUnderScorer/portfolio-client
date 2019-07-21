import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { useCallback } from 'react';
import { SetToken } from '../types/actions/UserActions';
import { MutationFn, MutationResult, useMutation } from 'react-apollo-hooks';
import { CREATE_USER } from '../graphql/queries/users';
import { CreateUserResult } from '../types/graphql/Mutations';
import User from '../types/graphql/User';
import Exception from '../errors/Exception';

export type UseAuthResult = [
    string,
    ( input?: Partial<User> ) => Promise<User>,
    [ MutationFn<any, any>, MutationResult<CreateUserResult> ]
    ]

export default (): UseAuthResult =>
{
    const token = useSelector( ( store: HomeStore ) => store.user.token );

    const mutation = useMutation<CreateUserResult>( CREATE_USER );
    const [ callMutation ] = mutation;

    const dispatch = useDispatch();

    const setToken = useCallback( ( newToken: string ) =>
    {
        const action: SetToken = {
            type:    'SetToken',
            payload: newToken
        };

        dispatch( action );
    }, [ dispatch ] );

    const createUser = async ( input: Partial<User> = {} ): Promise<User> =>
    {
        const result = await callMutation( {
            variables: {
                input,
            }
        } );

        if ( !result ) {
            throw new Exception( 'Unable to create new user.' )
        }

        const { createUser: user } = result.data;
        const { token = '' } = user as User;

        if ( token ) {
            setToken( token.value );
        }

        return user;
    };

    return [ token, createUser, mutation ];
}
