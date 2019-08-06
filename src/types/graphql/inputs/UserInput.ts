import User from '../User';

export default interface UserInput extends Partial<User>
{
    name: string;
    email?: string;
}

export interface UserInputVariable
{
    input: UserInput;
}
