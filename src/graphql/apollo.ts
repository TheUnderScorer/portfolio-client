import { TOKEN_KEY } from './auth';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const authLink = setContext( async ( _, { headers } ) =>
{
    const token = localStorage.getItem( TOKEN_KEY );

    return {
        headers: {
            ...headers,
            'USER-KEY': token,
        },
    }
} );

export const httpLink = new HttpLink( {
    uri: 'http://localhost:5000'
} );

const wsLink = new WebSocketLink( {
    uri:     `ws://localhost:5000/graphql`,
    options: {
        reconnect:        true,
        connectionParams: {
            authToken: localStorage.getItem( 'token' ),
        }
    }
} );

const link = split(
    ( { query } ) =>
    {
        const { kind, operation } = getMainDefinition( query );
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat( httpLink )
);

export const client = new ApolloClient( {
    cache:             new InMemoryCache(),
    link,
    connectToDevTools: true,
} );
