import User from '../../../types/graphql/User';
import { MutationFn, MutationResult } from 'react-apollo-hooks';
import { UserInputVariable } from '../../../types/graphql/inputs/UserInput';

export default interface UserFormProps
{
    user: User;
    mutation: [ MutationFn<User, UserInputVariable>, MutationResult<User> ];
}
