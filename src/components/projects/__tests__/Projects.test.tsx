import * as React from 'react';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import Projects from '../Projects';
import projects from '../../../pages/data/projects';
import '../../../fontAwesome';
import { ReadMore } from '../styled';
import { act } from 'react-dom/test-utils';
import { SetActiveProject } from '../../../types/actions/HomeActions';
import { wait } from '@apollo/react-testing';

const initialStore: any = {
    home:  {
        activeProject: null
    },
    theme: {
        mode: 'white'
    }
};

describe( 'Projects component', () =>
{

    it( 'Renders without crashing', () =>
    {
        mountWithStoreAndApollo(
            <Projects projects={ projects }/>,
            initialStore
        );
    } );

    it( 'Dispatches `SetActiveProject` with project index on read more click', () =>
    {
        const { component, store } = mountWithStoreAndApollo(
            <Projects projects={ projects }/>,
            initialStore
        );

        const readMoreBtn = component.find( ReadMore ).at( 1 );

        act( () =>
        {
            readMoreBtn.simulate( 'click' );
        } );

        const action = store.getActions()[ 0 ] as SetActiveProject;

        expect( action.payload ).toEqual( 1 );
        expect( action.type ).toEqual( 'SetActiveProject' );
    } );

    it( 'Dispatches `SetActiveProject` action with null on project close', async () =>
    {
        const state = { ...initialStore };
        state.home.activeProject = 1;

        const { component, store } = mountWithStoreAndApollo(
            <Projects projects={ projects }/>,
            state
        );

        const closeBtn = component.find( '.close' ).at( 0 );

        act( () =>
        {
            closeBtn.simulate( 'click' );
        } );

        await wait( 700 );

        const action = store.getActions()[ 0 ] as SetActiveProject;

        expect( action.payload ).toBeNull();
        expect( action.type ).toEqual( 'SetActiveProject' );
    } );

} );
