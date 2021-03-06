import ProjectInterface from '../types/ProjectInterface';
import TestThumbnail from '../../../assets/projects/test.jpg';
import { ProjectTypes } from '../../../types/ProjectTypes';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import Project from '../Project';
import * as React from 'react';
import '../../../fontAwesome';
import { act } from 'react-dom/test-utils';
import ReactProps from '../../../types/ReactProps';
import { wait } from '@apollo/react-testing';

const project: ProjectInterface = {
    name:         'Test project',
    thumbnailUrl: TestThumbnail,
    details:      'This is a test project.',
    shortDetails: 'Just a test',
    category:     ProjectTypes.fronted
};

const initialStore = {
    home:  {
        activeProject: null
    },
    theme: {
        mode: 'white'
    }
};

jest.mock( 'react-lazyload', () => ( { children }: ReactProps ) =>
{
    return children;
} );

describe( 'Project component', () =>
{
    let onOpen: jest.Mock;
    let onClose: jest.Mock;

    beforeEach( () =>
    {
        onOpen = jest.fn();
        onClose = jest.fn();
    } );

    it( 'Renders without crashing', () =>
    {
        mountWithStoreAndApollo(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        )
    } );

    it( 'Triggers `onOpen` callback after clicking read more button', () =>
    {
        const { component } = mountWithStoreAndApollo(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        const readMore = component.find( '.expand' ).at( 0 );

        act( () =>
        {
            readMore.simulate( 'click' );
        } );

        expect( onOpen ).toBeCalledTimes( 1 );
    } );

    it( 'Triggers `onClose` callback when clicking X icon', async () =>
    {
        const { component } = mountWithStoreAndApollo(
            <Project project={ project } active={ true } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        await wait( 100 );

        const close = component.find( '.expand' );

        act( () =>
        {
            close.at( 0 ).simulate( 'click' );
        } );

        await wait( 700 );

        expect( onClose ).toBeCalledTimes( 1 );
    } )
} );
