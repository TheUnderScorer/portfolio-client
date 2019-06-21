import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe( 'App component', () => {

    let root: HTMLDivElement;

    beforeEach( () => {
        root = document.createElement( 'div' );
        root.id = 'root';

        document.body.appendChild( root );
    } );

    afterEach( () => {
        root.remove();
    } );

    it( 'renders without crashing', () => {
        ReactDOM.render( <App/>, root );
        ReactDOM.unmountComponentAtNode( root );
    } );


} );
