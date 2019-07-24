import { useMutation } from 'react-apollo-hooks';
import User from '../types/graphql/User';
import { UPDATE_ME } from '../graphql/queries/users';
import { useEffect } from 'react';
import { UserInputVariable } from '../types/graphql/inputs/UserInput';

export default ( onUpdate: () => any ) =>
{
    const userMutation = useMutation<User, UserInputVariable>( UPDATE_ME );
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
