import User from '../User';

export default interface UserInput extends Partial<User>
{
    name: string;
    email?: string;
    captcha?: string;
}

export interface UserInputVariable
{
    input: UserInput;
}
