import React from 'react';
import { Provider } from 'react-redux';
import homeStore from './stores/homeStore';
import Home from './pages/Home';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql/apollo';

const App = () =>
{
    return (
        <Provider store={ homeStore }>
            <ApolloProvider client={ client }>
                <Home/>
            </ApolloProvider>
        </Provider>
    );
};

export default App;
