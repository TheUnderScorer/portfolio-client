import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import Modal from 'react-modal';
import './fontAwesome';

const root = document.getElementById( 'root' ) as HTMLElement;

Modal.setAppElement( root );

ReactDOM.render( <App/>, root );

if ( process.env.NODE_ENV === 'production' ) {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
