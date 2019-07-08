import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';

ReactDOM.render( <App/>, document.getElementById( 'root' ) );

// TODO Change to register() in prod
serviceWorker.unregister();
