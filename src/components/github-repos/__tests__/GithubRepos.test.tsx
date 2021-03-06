import { MockedResponse, wait } from '@apollo/react-testing';
import { GET_REPOSITORIES } from '../../../graphql/queries/repositories';
import Repository from '../../../types/graphql/Repository';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import GithubRepos from '../GithubRepos';
import React from 'react';
import Loader from '../../loader/Loader';
import { act } from 'react-dom/test-utils';
import '../../../fontAwesome';

describe( 'GithubRepos', () =>
{
    const repositories: Repository[] = [
        {
            name:        'Test repo 1',
            description: 'Just a test repo',
            url:         'http://localhost/test-repo',
            createdAt:   '2019-09-14T17:30:04.552Z'
        }
    ];

    const mocks: MockedResponse[] = [
        {
            request: {
                query:     GET_REPOSITORIES,
                variables: {
                    first: 5
                },
            },
            delay:   200,
            result:  {
                data: {
                    viewer: {
                        repositories: {
                            nodes: repositories
                        }
                    }
                }
            }
        }
    ];

    const renderComponent = () =>
        mountWithStoreAndApollo(
            <GithubRepos queryVariables={ { first: 5 } }/>,
            {
                theme: {
                    mode: 'white'
                }
            },
            {
                mocks,
                addTypename: false
            }
        );

    it( 'Renders without crashing', () =>
    {
        const { component } = renderComponent();

        expect( component.html() ).toMatchSnapshot();
    } );

    it( 'Shows loader when query is loading', async () =>
    {
        const { component } = renderComponent();

        await wait( 100 );

        const loader = component.find( Loader );
        const loaderProps = loader.props();

        expect( loader ).toHaveLength( 1 );
        expect( loaderProps.active ).toBeTruthy();
    } );

    it( 'Hides loader when query has loaded', async () =>
    {
        const { component } = renderComponent();

        await act( async () =>
        {
            await wait( 1000 );
        } );

        const loader = component.update().find( Loader );

        expect( loader ).toHaveLength( 0 );
        expect( component.html() ).toMatchSnapshot();
    } )
} );
