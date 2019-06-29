import React from 'react';
import { Provider } from 'react-redux';
import homeStore from './stores/homeStore';
import Home from './pages/Home';
import './fontAwesome';
import Modal from 'react-modal';

Modal.setAppElement( document.getElementById( 'root' ) as HTMLElement );

const App = () => {
    return (
        <Provider store={ homeStore }>
            <Home/>
        </Provider>
    );
};

export default App;
