import ProjectInterface from '../types/ProjectInterface';
import TestThumbnail from '../../../assets/projects/test.jpg';
import { ProjectTypes } from '../../../types/ProjectTypes';
import { mountWithStore } from '../../../tests/utils/enzyme/renderer';
import Project from '../Project';
import * as React from 'react';
import '../../../fontAwesome';
import { ProjectThumbnail, ReadMore, ThumbnailLoader } from '../styled';
import { act } from 'react-dom/test-utils';
import ReactProps from '../../../types/ReactProps';

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
        mountWithStore(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        )
    } );

    it( 'Shows loading animation when image is not loaded', () =>
    {
        const { component } = mountWithStore(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        const loader = component.find( ThumbnailLoader );

        expect( loader ).toHaveLength( 1 );
    } );

    it( 'Hides loading animation on thumbnail load', () =>
    {
        const { component } = mountWithStore(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        const thumbnail = component.find( ProjectThumbnail );

        act( () =>
        {
            thumbnail.simulate( 'load' );
        } );

        component.update();

        const loader = component.find( ThumbnailLoader );
        const loaderProps = loader.props();

        expect( loaderProps.active ).toBeFalsy();
    } );

    it( 'Triggers `onOpen` callback after clicking read more button', () =>
    {
        const { component } = mountWithStore(
            <Project project={ project } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        const readMore = component.find( ReadMore );

        act( () =>
        {
            readMore.simulate( 'click' );
        } );

        expect( onOpen ).toBeCalledTimes( 1 );
    } );

    it( 'Triggers `onClose` callback when clicking X icon', () =>
    {
        const { component } = mountWithStore(
            <Project project={ project } active={ true } onOpen={ onOpen } onClose={ onClose } index={ 0 }/>,
            initialStore
        );

        const close = component.find( '.close' );

        act( () =>
        {
            close.at( 0 ).simulate( 'click' );
        } );

        expect( onClose ).toBeCalledTimes( 1 );
    } )
} );