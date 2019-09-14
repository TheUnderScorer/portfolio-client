import { client } from './clients/portfolio-server';
import User from '../types/graphql/User';
import { CREATE_USER } from './mutations/users';

export const TOKEN_KEY = 'token';

export const createUser = async (): Promise<User> =>
{
    const response = await client.mutate( {
        mutation: CREATE_USER
    } );

    await client.resetStore();

    return response.data.createUser;
};

export const logout = async () =>
{
    localStorage.removeItem( TOKEN_KEY );

    await client.resetStore();
};
