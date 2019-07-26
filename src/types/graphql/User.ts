import Token from './Token';

export default interface User
{
    id: number;
    token?: Token;
    name?: string;
    email?: string;
    lastLogin: number;
}
