import Token from './Token';
import Model from './Model';

export default interface User extends Model
{
    token?: Token;
    name?: string;
    email?: string;
    lastLogin: number;
}
