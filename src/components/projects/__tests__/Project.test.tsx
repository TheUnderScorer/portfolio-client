import ProjectInterface from '../types/ProjectInterface';
import TestThumbnail from '../../../assets/projects/test.jpg';
import { ProjectTypes } from '../../../types/ProjectTypes';
import { mountWithStore } from '../../../tests/utils/enzyme/renderer';
import Project from '../Project';
import * as React from 'react';
import '../../../fontAwesome';
import { ProjectThumbnail, ThumbnailLoader } from '../styled';
import { act } from 'react-dom/test-utils';
import ReactProps from '../../../types/ReactProps';

const project: ProjectInterface = {
    name:         'Test project',
    thumbnailUrl: TestThumbnail,
    details:      'This is a test project.',
    shortDetails: 'Just a test',
    category:     ProjectTypes.fronted
};

const onOpen = jest.fn();
const onClose = jest.fn();

jest.mock( 'react-lazyload', () => ( { children }: ReactProps ) =>
{
    return children;
} );

describe( 'Project component', () =>
{
    const initialStore = {
        home:  {
            activeProject: null
        },
        theme: {
            mode: 'white'
        }
    };

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
    } )
} );
