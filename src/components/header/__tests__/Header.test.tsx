import * as React from 'react';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import Header from '../Header';
import Switch from '@material/react-switch';
import '../../../fontAwesome';

describe( 'Header component', () => {

    const initialState = {
        theme: {
            mode: 'white'
        },
        home:  {
            currentSection: '',
            didInnerOpen:   false,
            innerActive:    false,
        }
    };

    it( 'Renders without crashing', () => {
        const { component } = mountWithStoreAndApollo( <Header/>, initialState );

        expect( component.html() ).toMatchSnapshot()
    } );

    it( 'Clicking toggle should switch theme mode', () => {
        const { component, store } = mountWithStoreAndApollo( <Header/>, initialState );
        component.find( Switch ).at( 0 ).simulate( 'change', {
            target: {
                checked: true
            }
        } );

        const actions = store.getActions();

        expect( actions[ 0 ].payload ).toEqual( 'dark' );
    } );

    it( 'Clicking menu item should change active section', () => {
        const { component, store } = mountWithStoreAndApollo( <Header/>, initialState );
        const link = component.find( 'nav a' ).at( 0 );

        link.simulate( 'click' );

        const actions = store.getActions();

        expect( actions[ 2 ].payload ).toEqual( 'about_me' );
    } );

} );
