import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const apiUrl = 'https://api.github.com/graphql';

export const httpLink = new HttpLink( {
    uri: apiUrl
} );

const authLink = setContext( async ( _, { headers } ) =>
{
    const token = process.env.REACT_APP_GITHUB_API_KEY;

    return {
        headers: {
            ...headers,
            Authorization: `bearer ${ token }`
        },
    }
} );

export const client = new ApolloClient( {
    cache:             new InMemoryCache(),
    link:              authLink.concat( httpLink ),
    connectToDevTools: true,
} );
