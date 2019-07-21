import { useMutation } from 'react-apollo-hooks';
import User from '../types/graphql/User';
import { UPDATE_ME } from '../graphql/queries/users';
import { useEffect } from 'react';

export default ( onUpdate: () => any ) =>
{
    const userMutation = useMutation<User>( UPDATE_ME );
    const [ , userMutationResult ] = userMutation;
    const { data: userMutationData } = userMutationResult;

    useEffect( () =>
    {
        if ( !userMutationData ) {
            return;
        }

        onUpdate();
    }, [ userMutationData ] );

    return userMutation;

}
