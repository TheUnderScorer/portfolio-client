import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import Contact from '../Contact';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import mockConversation from '../../../tests/data/mockConversation';
import { CHANGE_STATUS, CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';
import { cloneDeep } from 'lodash';
import { createHomeStore } from '../../../stores/homeStore';
import { Provider } from 'react-redux';
import { SetContactType } from '../../../types/actions/ContactActions';
import { ContactTypes } from '../../../types/reducers/ContactReducer';
import { ConversationStatuses } from '../../../types/graphql/Conversation';

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
    },
    {
        request: {
            query:     CHANGE_STATUS,
            variables: {
                input: {
                    id:             mockConversation.id,
                    status:         ConversationStatuses.closed,
                    sendTranscript: false,
                    email:          undefined
                }
            }
        },
        result:  {
            data: {
                changeStatus: {
                    ...mockConversation,
                    status: ConversationStatuses.closed
                }
            }
        }
    }
];

storiesOf( 'Contact', module )
    .addDecorator( StoryDecorator )
    .add( 'With chat message', () =>
    {
        return (
            <MockedProvider mocks={ mocks } addTypename={ false }>
                <div style={ { height: 600 } }>
                    <Contact/>
                </div>
            </MockedProvider>
        )
    } )
    .add( 'Without chat message', () =>
    {
        const newMocks = cloneDeep( mocks );
        newMocks[ 1 ].result.data.conversation = {
            ...mockConversation,
            messages: []
        };
        newMocks[ 2 ].result.data.conversation = {
            ...mockConversation,
            messages: []
        };

        return (
            <MockedProvider mocks={ newMocks } addTypename={ false }>
                <div style={ { height: 600 } }>
                    <Contact/>
                </div>
            </MockedProvider>
        )
    } )
    .add( 'With not setup user', () =>
    {
        const store = createHomeStore();
        store.dispatch<SetContactType>( {
            type:    'SetContactType',
            payload: ContactTypes.UserForm
        } );

        const newMocks = cloneDeep( mocks );
        newMocks[ 0 ].result.data.user = {
            id:         1,
            email:      '',
            name:       '',
            role:       'user',
            lastLogin:  0,
            token:      {
                value:      'test',
                __typename: 'Token'
            },
            __typename: 'User'
        };

        return (
            <MockedProvider mocks={ newMocks } addTypename={ false }>
                <Provider store={ store }>
                    <div style={ { height: 600 } }>
                        <Contact/>
                    </div>
                </Provider>
            </MockedProvider>
        )
    } );
