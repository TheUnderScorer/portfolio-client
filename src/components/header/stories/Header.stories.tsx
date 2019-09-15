import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import Header from '../Header';
import React from 'react';
import colors from '../../styled/colors';
import { createHomeStore } from '../../../stores/homeStore';
import { Provider } from 'react-redux';
import { SetDidInnerOpen, SetInnerActive } from '../../../types/actions/HomeActions';

storiesOf( 'Header', module )
    .addDecorator( StoryDecorator )
    .add( 'With background', () =>
    {
        const homeStore = createHomeStore();

        homeStore.dispatch<SetInnerActive>( {
            type:    'SetInnerActive',
            payload: true
        } );
        homeStore.dispatch<SetDidInnerOpen>( {
            type:    'SetDidInnerOpen',
            payload: true
        } );

        return (
            <Provider store={ homeStore }>
                <div style={ { background: colors.grey, height: 200, position: 'relative' } }>
                    <Header/>
                </div>
            </Provider>
        )

    } )
    .add( 'With background fixed', () =>
    {
        const homeStore = createHomeStore();

        homeStore.dispatch<SetInnerActive>( {
            type:    'SetInnerActive',
            payload: true
        } );
        homeStore.dispatch<SetDidInnerOpen>( {
            type:    'SetDidInnerOpen',
            payload: true
        } );

        return (
            <Provider store={ homeStore }>
                <div style={ { background: colors.grey, height: 1000, position: 'relative' } }>
                    <Header/>
                </div>
            </Provider>
        )

    } )
    .add( 'Transparent', () =>
    {

        return (
            <div style={ { background: colors.grey, height: 300, position: 'relative' } }>
                <Header/>
            </div>
        )

    } )
;

