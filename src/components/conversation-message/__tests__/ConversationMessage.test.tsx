import * as React from 'react';
import { ReactElement } from 'react';
import Message from '../../../types/graphql/Message';
import * as faker from 'faker';
import moment from 'moment';
import { DateFormats } from '../../../types/common/DateFormats';
import ConversationMessage from '../ConversationMessage';
import { DateHeadline, MessageDate } from '../styled';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import { Typography } from '@material-ui/core';

describe( 'ConversationMessage component', () =>
{

    let message: Message = {
        id:        1,
        content:   faker.random.words(),
        createdAt: moment().subtract( 15, 'seconds' ).format( DateFormats.DateTime ),
        updatedAt: moment().subtract( 15, 'seconds' ).format( DateFormats.DateTime ),
        author:    {
            id:        1,
            name:      faker.name.firstName(),
            lastLogin: 0,
        }
    };

    const mountComponent = ( component: ReactElement ) => mountWithStoreAndApollo(
        component,
        {}
    );

    it( 'Renders without crashing', () =>
    {
        mountComponent( <ConversationMessage message={ message }/> );
    } );

    it( 'Should display date headline if message is from next day', () =>
    {
        const prevMessage: Message = {
            ...message,
            createdAt: moment().subtract( 1, 'day' ).format( DateFormats.DateTime )
        };

        const { component } = mountComponent( <ConversationMessage message={ message } prevMessage={ prevMessage }/> );
        const headline = component.find( DateHeadline ).first();
        const headlineText = headline.find( Typography ).first();

        expect( headlineText.text() ).toEqual( 'Today' );
    } );

    it( 'Should not display date headline if message is from same day', () =>
    {
        const prevMessage = { ...message };

        const { component } = mountComponent( <ConversationMessage message={ message } prevMessage={ prevMessage }/> );
        const headline = component.find( DateHeadline );

        expect( headline ).toHaveLength( 0 );
    } );

    it( 'Should display message time if next message was sent at different time', () =>
    {
        const nextMessage: Message = {
            ...message,
            createdAt: moment().add( 1, 'minute' ).format( DateFormats.DateTime )
        };

        const { component } = mountComponent( <ConversationMessage message={ message } nextMessage={ nextMessage }/> );
        const date = component.find( MessageDate ).first();

        expect( date.text() ).toEqual( moment( message.createdAt ).format( 'H:mm' ) );
    } );

    it( 'Should not display message time if next message was sent at same time', () =>
    {
        const nextMessage = { ...message };

        const { component } = mountComponent( <ConversationMessage message={ message } nextMessage={ nextMessage }/> );
        const date = component.find( MessageDate ).first();

        expect( date ).toHaveLength( 0 );
    } )

} );
