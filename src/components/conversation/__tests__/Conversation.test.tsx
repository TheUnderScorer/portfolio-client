import { MockedResponse } from '@apollo/react-testing';
import { MY_CONVERSATION } from '../../../graphql/queries/conversations';
import ConversationInterface, { ConversationStatuses } from '../../../types/graphql/Conversation';
import moment from 'moment';
import { DateFormats } from '../../../types/common/DateFormats';
import Conversation from '../Conversation';
import * as React from 'react';
import ConversationMessages from '../../conversation-messages/ConversationMessages';
import ConversationEditor from '../../conversation-editor/ConversationEditor';
import { mountWithStore } from '../../../tests/utils/renderer';
import useChat from '../../../hooks/useChat';

describe( 'Conversation component', () =>
{

    const mockConversation: ConversationInterface = {
        id:        1,
        createdAt: 0,
        status:    ConversationStatuses.open,
        messages:  [
            {
                id:        1,
                content:   'Test',
                author:    {
                    id:        1,
                    name:      'Greg',
                    email:     '',
                    lastLogin: 0
                },
                createdAt: moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
                updatedAt: moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
            }
        ],
    };

    let mocks: MockedResponse[] = [
        {
            request: {
                query: MY_CONVERSATION,
            },
            result:  {
                data: {
                    conversation: mockConversation
                }
            }
        }
    ];

    const MockComponent = () =>
    {
        const {
                  conversationsQuery,
                  createConversationMutation,
                  changeStatusMutation,
                  createMessageMutation,
              } = useChat();

        return (
            <Conversation query={ conversationsQuery } changeStatusMutation={ changeStatusMutation } messageCreationMutation={ createMessageMutation } creationMutation={ createConversationMutation }/>
        )
    };

    const mountComponent = () => mountWithStore(
        <MockComponent/>,
        {},
        {
            mocks,
            addTypename: false,
        }
    );

    it( 'Renders without crashing', () =>
    {
        mountComponent();
    } );

    it( 'Should render conversation messages and editor if conversation is not closing', () =>
    {
        const { component } = mountComponent();

        const messages = component.find( ConversationMessages );
        const editor = component.find( ConversationEditor );

        expect( messages ).toHaveLength( 1 );
        expect( editor ).toHaveLength( 1 );
    } );

    it( 'Should render closing form if isClosing is set to true', () =>
    {
        const component = mountComponent();

        console.log( component );
    } );

} );
