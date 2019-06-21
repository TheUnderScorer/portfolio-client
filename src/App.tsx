import React from 'react';
import { Provider } from 'react-redux';
import homeStore from './stores/homeStore';
import Home from './pages/Home';
import './fontAwesome';
import GlobalStyle from './components/styled/GlobalStyle';

const App = () => {
    return (
        <Provider store={ homeStore }>
            <GlobalStyle/>
            <Home/>
        </Provider>
    );
};

export default App;
