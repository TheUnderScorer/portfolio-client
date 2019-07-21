import User from '../../../types/graphql/User';
import { MutationFn, MutationResult } from 'react-apollo-hooks';

export default interface UserFormProps
{
    user?: User;
    mutation: [ MutationFn<User, any>, MutationResult<User> ];
}
