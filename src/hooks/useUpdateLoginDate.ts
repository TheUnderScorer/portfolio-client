import { QueryHookResult, useMutation } from 'react-apollo-hooks';
import { UserResult } from '../types/graphql/Mutations';
import { UPDATE_LOGIN_DATE } from '../graphql/queries/users';
import { useEffect } from 'react';

export default ( userQuery: QueryHookResult<UserResult, any> ) =>
{
    const [ mutation, result ] = useMutation<UserResult>( UPDATE_LOGIN_DATE );

    useEffect( () =>
    {
        if ( !result.data ) {
            return;
        }

        const { lastLogin } = result.data.user;

        userQuery.updateQuery( oldUser => ( {
            user: {
                ...oldUser.user,
                lastLogin
            }
        } ) );

    }, [ result.data ] );

    return mutation;
}
