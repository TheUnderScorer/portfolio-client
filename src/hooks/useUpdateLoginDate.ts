import { useMutation } from 'react-apollo-hooks';
import { UserResult } from '../types/graphql/Mutations';
import { UPDATE_LOGIN_DATE } from '../graphql/queries/users';
import useCurrentUser from './useCurrentUser';
import { useEffect } from 'react';
import usePrevious from './usePrevious';

export default () =>
{
    const [ mutationFn, mutationResult ] = useMutation<UserResult>( UPDATE_LOGIN_DATE );
    const { data } = useCurrentUser();
    const prevUserID = usePrevious( data && data.user ? data.user.id : null );

    useEffect( () =>
    {
        if ( prevUserID && data && data.user.id === prevUserID ) {
            return;
        }

        mutationFn();
    }, [ data ] );

    return [ mutationFn, mutationResult ];
}
