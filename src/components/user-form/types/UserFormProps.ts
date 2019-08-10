import User from '../../../types/graphql/User';
import { UserInputVariable } from '../../../types/graphql/inputs/UserInput';
import { MutationTuple } from '@apollo/react-hooks';

export default interface UserFormProps
{
    user: User;
    mutation: MutationTuple<User, UserInputVariable>;
}
