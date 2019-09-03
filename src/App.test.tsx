import * as React from 'react';
import App from './App';
import { mount } from 'enzyme';
import './fontAwesome';

describe( 'App component', () =>
{

    it( 'renders without crashing', () =>
    {
        mount( <App/> );
    } );

} );
