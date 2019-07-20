import { client } from './apollo';
import { CREATE_USER } from './queries/users';
import User from '../types/graphql/User';

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
