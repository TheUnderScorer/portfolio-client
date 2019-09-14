import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import GithubRepos from '../GithubRepos';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { GET_REPOSITORIES } from '../../../graphql/queries/repositories';
import Repository from '../../../types/graphql/Repository';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import '../../../fontAwesome';

const repositories: Repository[] = [
    {
        name:        'Test repo 1',
        description: 'Just a test repo',
        url:         'http://localhost/test-repo',
        createdAt:   moment().toISOString()
    },
    {
        name:        'Test repo 2',
        description: 'Another repo',
        url:         'http://localhost/test-repo',
        createdAt:   moment().toISOString()
    }
];

const mocks: MockedResponse[] = [
    {
        request: {
            query:     GET_REPOSITORIES,
            variables: {
                first: 7
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

storiesOf( 'GithubRepos', module )
    .addDecorator( StoryDecorator )
    .add( 'With response', () =>
    {
        return (
            <MockedProvider mocks={ mocks } addTypename={ false }>
                <GithubRepos queryVariables={ { first: 7 } }/>
            </MockedProvider>
        )
    } )
    .add( 'With loader', () =>
    {
        const storyMocks = cloneDeep( mocks );
        storyMocks[ 0 ].delay = 9999999;

        return (
            <MockedProvider mocks={ storyMocks } addTypename={ false }>
                <GithubRepos queryVariables={ { first: 7 } }/>
            </MockedProvider>
        )
    } )
    .add( 'With error', () =>
    {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query:     GET_REPOSITORIES,
                    variables: {
                        first: 7
                    },
                },
                delay:   200,
                error:   new Error( 'Error occured!' ),
            }
        ];

        return (
            <MockedProvider mocks={ mocks } addTypename={ false }>
                <GithubRepos queryVariables={ { first: 7 } }/>
            </MockedProvider>
        )
    } );
