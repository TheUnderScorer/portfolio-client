import { QueryHookResult, useQuery } from 'react-apollo-hooks';
import { UserResult } from '../types/graphql/Mutations';
import { GET_ME } from '../graphql/queries/users';

export default (): QueryHookResult<UserResult, any> =>
{
    return useQuery<UserResult>( GET_ME );
}
