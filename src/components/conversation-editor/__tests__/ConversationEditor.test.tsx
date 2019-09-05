import { mountWithStoreAndApollo } from '../../../tests/renderer';
import ConversationEditor from '../ConversationEditor';
import * as React from 'react';
import mockConversation from '../../../tests/data/mockConversation';
import useChat from '../../../hooks/useChat';
import { MockedResponse, wait } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import { CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';
import '../../../fontAwesome';
import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';

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
    const mountComponent = () => mountWithStoreAndApollo(
        <MockComponent/>,
        {},
        {
            mocks,
            addTypename: true
        }
    );

    it( 'Renders without crashing', async () =>
    {
        await act( async () =>
        {
            mountComponent();
        } );
    } );

    it( 'Should restore focus to message input after sending message', async () =>
    {
        let component: ReactWrapper<any> | any = null;

        await act( async () =>
        {
            component = mountComponent().component;
        } );

        const form = component.find( 'form' );

        await act( async () =>
        {
            form.simulate( 'submit' );

            await wait( 1000 );
        } );

        const focusedElement = document.activeElement as Element;

        expect( focusedElement.id ).toEqual( 'content' );
    } );
} );
