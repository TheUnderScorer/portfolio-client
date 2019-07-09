import React from 'react';
import { Provider } from 'react-redux';
import homeStore from './stores/homeStore';
import Home from './pages/Home';

const App = () => {
    return (
        <Provider store={ homeStore }>
            <Home/>
        </Provider>
    );
};

export default App;
