import { UserResult } from '../types/graphql/Mutations';
import useCurrentUser from './useCurrentUser';
import { useEffect } from 'react';
import usePrevious from './usePrevious';
import { UPDATE_LOGIN_DATE } from '../graphql/mutations/users';
import { useMutation } from '@apollo/react-hooks';

export default () =>
{
    const [ mutationFn, mutationResult ] = useMutation<UserResult>( UPDATE_LOGIN_DATE );
    const { data } = useCurrentUser();
    const prevUserID = usePrevious( data && data.user ? data.user.id : null );

    useEffect( () =>
    {
        if ( !data || !data.user || data.user.id === prevUserID ) {
            return;
        }

        mutationFn();
    }, [ data ] );

    return [ mutationFn, mutationResult ];
}
