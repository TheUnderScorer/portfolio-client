import { MockedResponse, wait } from '@apollo/react-testing';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import ConversationInterface, { ConversationStatuses } from '../../../types/graphql/Conversation';
import moment from 'moment';
import { DateFormats } from '../../../types/common/DateFormats';
import Conversation from '../Conversation';
import * as React from 'react';
import { useEffect } from 'react';
import ConversationEditor from '../../conversation-editor/ConversationEditor';
import { mountWithStore } from '../../../tests/utils/renderer';
import useChat from '../../../hooks/useChat';
import { NEW_MESSAGE } from '../../../graphql/subscriptions/messages';
import { act } from 'react-dom/test-utils';
import { CREATE_CONVERSATION } from '../../../graphql/mutations/conversations';
import '../../../fontAwesome';
import User from '../../../types/graphql/User';
import { GET_ME } from '../../../graphql/queries/users';
import ConversationMessages from '../../conversation-messages/ConversationMessages';
import CloseConversationForm from '../../close-conversation-form/CloseConversationForm';

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

    const mockUser: User & any = {
        id:         1,
        name:       'Greg',
        email:      '',
        role:       'user',
        lastLogin:  0,
        token:      {
            value:      'test',
            __typename: 'Token'
        },
        __typename: 'User'
    };

    const mockConversation: ConversationInterface & any = {
        id:         1,
        title:      '',
        createdAt:  0,
        status:     ConversationStatuses.open,
        messages:   [
            {
                id:         1,
                content:    'Test',
                author:     mockUser,
                createdAt:  moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
                updatedAt:  moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
                __typename: 'Message'
            }
        ],
        __typename: 'Conversation'
    };

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

    const mountComponent = () => mountWithStore(
        <MockComponent/>,
        {
            theme: {
                mode: 'white'
            }
        },
        {
            mocks,
            addTypename: true,
        }
    );

    it( 'Renders without crashing', () =>
    {
        act( () =>
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
        const { component } = mountComponent();

        await wait( 2000 );

        const conversation = component.update().find( Conversation );
        const closeConversation = conversation.find( '#close_conversation' );

        act( () =>
        {
            closeConversation.at( 0 ).simulate( 'click' );
        } );

        const closingForm = conversation.update().find( CloseConversationForm );
        expect( closingForm ).toHaveLength( 1 );

        done();
    } );

} );
