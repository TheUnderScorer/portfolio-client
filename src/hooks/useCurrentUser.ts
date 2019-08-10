import { UserResult } from '../types/graphql/Mutations';
import { GET_ME } from '../graphql/queries/users';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

export default (): QueryResult<UserResult, any> =>
{
    return useQuery<UserResult>( GET_ME );
}
