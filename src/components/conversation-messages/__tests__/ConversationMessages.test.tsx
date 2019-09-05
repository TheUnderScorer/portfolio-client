import { mountWithStoreAndApollo } from '../../../tests/renderer';
import ConversationMessages from '../ConversationMessages';
import * as React from 'react';
import mockConversation from '../../../tests/data/mockConversation';
import ConversationMessagesProps from '../types/ConversationMessagesProps';
import { HelperText } from '../styled';
import { MockedResponse, wait } from '@apollo/react-testing';
import { GET_ME } from '../../../graphql/queries/users';
import mockUser from '../../../tests/data/mockUser';
import { act } from 'react-dom/test-utils';

jest.mock( '../../../utils/scroll', () => ( {
    smoothScroll: () =>
                  {
                      didSmoothScroll = true;

                      return Promise.resolve();
                  }
} ) );

let didClose: boolean = false;
let didSmoothScroll: boolean = false;

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
    const handleLoadMore = () => null;
    const handleClose = () => didClose = true;

    const defaultProps: ConversationMessagesProps = {
        conversation: mockConversation,
        onCloseClick: handleClose,
        onLoadMore:   handleLoadMore,
        hasMore:      false,
        loading:      false
    };

    const mountComponent = ( props: ConversationMessagesProps = defaultProps ) => mountWithStoreAndApollo(
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
        didSmoothScroll = false;
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

        await wait( 1 );

        component.update();

        const helperText = component.find( HelperText );
        expect( helperText ).toHaveLength( 1 );
        expect( helperText.html() ).toContain( 'Hello there!' );
        expect( helperText.html() ).toContain( 'Write your message below in order to start conversation with me!' );

        done();
    } );

    it( 'Should perform smooth scroll on initialization', async ( done ) =>
    {
        let { component } = mountComponent();

        await wait( 1 );

        component.update();
        const messages = component.find( '.messages' ).at( 0 );

        expect( didSmoothScroll ).toBeTruthy();
        expect( messages.hasClass( 'did-initial-scroll' ) ).toBeTruthy();

        done();
    } );

    // TODO Check why it passes only when triggered separately
    /*it( 'Should perform smooth scroll when new message is sent', async ( done ) =>
    {
        let { component } = mountComponent();

        await wait( 1 );

        didSmoothScroll = false;

        const newConversation: Conversation = { ...mockConversation };
        const message: Message = {
            ...mockConversation.messages[ 0 ],
        };
        newConversation.messages.push( message );

        act( () =>
        {
            component.setProps( {
                conversation: newConversation
            } );
        } );

        component.update();

        await wait( 500 );

        expect( didSmoothScroll ).toBeTruthy();

        done();
    } );*/

    it( 'Should trigger close callback after clicking closing link', async ( done ) =>
    {
        let { component } = mountComponent();

        await wait( 1 );

        component.update();

        const closeLink = component.find( '#close_conversation' ).at( 0 );

        act( () =>
        {
            closeLink.simulate( 'click' );
        } );

        expect( didClose ).toBeTruthy();

        done();
    } );

} );
