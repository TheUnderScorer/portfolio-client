import { renderWithStore } from '../../../tests/utils/enzyme/renderer';
import ConversationEditor from '../ConversationEditor';
import * as React from 'react';
import mockConversation from '../../../tests/data/mockConversation';
import useChat from '../../../hooks/useChat';
import { MockedResponse } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import { CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';
import '../../../fontAwesome';

const MockComponent = () =>
{
    const { createMessageMutation } = useChat();

    return (
        <ConversationEditor conversationID={ mockConversation.id } mutation={ createMessageMutation }/>
    );
};

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

describe( 'ConversationEditor component', () =>
{
    const renderComponent = () => renderWithStore(
        <MockComponent/>,
        {},
        {
            mocks,
            addTypename: true
        }
    );

    it( 'Renders without crashing', () =>
    {
        renderComponent();
    } );

    it( 'Should restore focus to message input after sending message', () =>
    {
        const { component } = renderComponent();

        const contentInput = component.find( '#content' );

        console.log( contentInput );
    } );
} );
