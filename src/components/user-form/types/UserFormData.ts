import User from '../../../types/graphql/User';

export default interface UserFormData extends Partial<User>
{
    name?: string;
    email?: string;
}
