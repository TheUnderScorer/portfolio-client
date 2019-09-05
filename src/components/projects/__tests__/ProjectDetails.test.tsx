import * as React from 'react';
import projects from '../../../pages/data/projects';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import ProjectDetails from '../ProjectDetails';
import '../../../fontAwesome';
import { ProjectImage } from '../styled';
import { act } from 'react-dom/test-utils';
import Loader from '../../loader/Loader';
import { wait } from '@apollo/react-testing';

const project = projects[ 0 ];

const initialState = {
    theme: {
        mode: 'white'
    }
};

describe( 'ProjectDetails component', () =>
{
    let onImageLoad: jest.Mock;

    beforeEach( () =>
    {
        onImageLoad = jest.fn();
    } );

    it( 'Renders without crashing', () =>
    {
        mountWithStoreAndApollo(
            <ProjectDetails project={ project }/>,
            initialState
        );
    } );

    it( 'Triggers onImageLoad whenever image loads and hides loader', async () =>
    {
        const { component } = mountWithStoreAndApollo(
            <ProjectDetails onImageLoad={ onImageLoad } project={ project }/>,
            initialState
        );

        const image = component.find( ProjectImage ).at( 0 );

        act( () =>
        {
            image.simulate( 'load' );
        } );

        expect( onImageLoad ).toBeCalledTimes( 1 );
        expect( onImageLoad ).toBeCalledWith( 0 );

        await wait( 1500 );

        const loader = component.update().find( Loader );
        const loaderProps = loader.props();

        expect( loaderProps.active ).toBeFalsy();
    } );

    it( 'Displays loader when images have not loaded yet', () =>
    {
        const { component } = mountWithStoreAndApollo(
            <ProjectDetails project={ project }/>,
            initialState
        );

        const loader = component.find( Loader );
        const loaderProps = loader.props();

        expect( loader ).toHaveLength( 1 );
        expect( loaderProps.active ).toBeTruthy();
    } );
} );
