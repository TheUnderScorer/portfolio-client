import { mountWithStore } from '../../../tests/utils/renderer';
import ConversationMessages from '../ConversationMessages';
import * as React from 'react';
import mockConversation from '../../../tests/data/mockConversation';
import ConversationMessagesProps from '../types/ConversationMessagesProps';
import { HelperText } from '../styled';
import { MockedResponse, wait } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';

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
    }
];

describe( 'ConversationMessages component', () =>
{
    let didLoadMore = false;
    let didClose = false;

    const handleLoadMore = () => didLoadMore = true;
    const handleClose = () => didClose = true;

    const defaultProps: ConversationMessagesProps = {
        conversation: mockConversation,
        onCloseClick: handleClose,
        onLoadMore:   handleLoadMore,
        hasMore:      false,
        loading:      false
    };

    const mountComponent = ( props: ConversationMessagesProps = defaultProps ) => mountWithStore(
        <ConversationMessages { ...props } />,
        {},
        {
            mocks,
            addTypename: true,
        }
    );

    afterEach( () =>
    {
        didClose = false;
        didLoadMore = false;
    } );

    it( 'Renders without crashing', () =>
    {
        mountComponent();
    } );

    it( 'Should render helper text if conversation has no messages', async ( done ) =>
    {
        const props: ConversationMessagesProps = {
            ...defaultProps,
            conversation: {
                ...mockConversation,
                messages: []
            }
        };

        const { component } = mountComponent( props );

        await wait( 2000 );

        const helperText = component.update().find( HelperText );
        expect( helperText ).toHaveLength( 1 );
        expect( helperText.html() ).toContain( 'Hello there!' );
        expect( helperText.html() ).toContain( 'Write your message below in order to start conversation with me!' );

        done();
    } );

} );
