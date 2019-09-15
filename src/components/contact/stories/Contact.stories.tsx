import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import Contact from '../Contact';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import mockConversation from '../../../tests/data/mockConversation';
import { CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';

const mocks: MockedResponse[] = [
    {
        request: {
            query: GET_ME
        },
        result:  {
            data: {
                user: mockUser
            }
        }
    },
    {
        request: {
            query: MY_CONVERSATION,
        },
        result:  {
            data: {
                conversation: mockConversation,
            }
        }
    },
    {
        request: {
            query:     CREATE_CONVERSATION,
            variables: {},
        },
        result:  {
            data: {
                conversation: mockConversation
            }
        }
    },
    {
        request: {
            query: NEW_MESSAGE
        },
        result:  {
            data: null,
        }
    }
];

storiesOf( 'Contact', module )
    .addDecorator( StoryDecorator )
    .add( 'Regular', () =>
    {
        return (
            <MockedProvider mocks={ mocks } addTypename={ false }>
                <div style={ { height: 600 } }>
                    <Contact/>
                </div>
            </MockedProvider>
        )
    } );
