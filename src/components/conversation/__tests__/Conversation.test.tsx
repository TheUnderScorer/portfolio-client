import { MockedResponse, wait } from '@apollo/react-testing';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import Conversation from '../Conversation';
import * as React from 'react';
import { useEffect } from 'react';
import ConversationEditor from '../../conversation-editor/ConversationEditor';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import useChat from '../../../hooks/useChat';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';
import { act } from 'react-dom/test-utils';
import { CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import '../../../fontAwesome';
import { GET_ME } from '../../../graphql/queries/users';
import ConversationMessages from '../../conversation-messages/ConversationMessages';
import CloseConversationForm from '../../close-conversation-form/CloseConversationForm';
import mockUser from '../../../tests/data/mockUser';
import mockConversation from '../../../tests/data/mockConversation';

// @ts-ignore
global.scrollTo = jest.fn();

const MockComponent = () =>
{
    const {
              conversationsQuery,
              createConversationMutation,
              changeStatusMutation,
              createMessageMutation,
          } = useChat();

    const [ fetchConversation, queryResult ] = conversationsQuery;

    useEffect( () =>
    {
        if ( !queryResult.data && !queryResult.called ) {
            fetchConversation();
        }
    }, [ queryResult, fetchConversation ] );

    return (
        <Conversation conversationQuery={ conversationsQuery } changeStatusMutation={ changeStatusMutation } messageCreationMutation={ createMessageMutation } createConversationMutation={ createConversationMutation }/>
    )
};

describe( 'Conversation component', () =>
{
    jest.setTimeout( 10000 );

    let mocks: MockedResponse[] = [
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

    const mountComponent = ( initialState: any = {
        theme:   {
            mode: 'white'
        },
        contact: {
            isClosing: false,
        }
    } ) => mountWithStoreAndApollo(
        <MockComponent/>,
        initialState,
        {
            mocks,
            addTypename: true,
        }
    );

    it( 'Renders without crashing', async () =>
    {
        await act( async () =>
        {
            mountComponent();
        } );
    } );

    it( 'Should render conversation messages and editor if conversation is not closing', async ( done ) =>
    {
        const { component } = mountComponent();

        await wait( 2000 );

        const conversation = component.update().find( Conversation );

        const messages = conversation.find( ConversationMessages );
        const editor = conversation.find( ConversationEditor );

        expect( messages ).toHaveLength( 1 );
        expect( editor ).toHaveLength( 1 );

        done();
    } );

    it( 'Should render closing form if isClosing is set to true', async ( done ) =>
    {
        const { component } = mountComponent( {
            theme:   {
                mode: 'white'
            },
            contact: {
                isClosing: true,
            }
        } );

        await wait( 500 );

        const conversation = component.update().find( Conversation );

        const closingForm = conversation.find( CloseConversationForm );
        expect( closingForm ).toHaveLength( 1 );

        done();
    } );

} );
