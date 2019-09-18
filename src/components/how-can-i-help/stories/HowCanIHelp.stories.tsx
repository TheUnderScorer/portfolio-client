import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import HowCanIHelp from '../HowCanIHelp';
import React from 'react';
import { createHomeStore } from '../../../stores/homeStore';
import { SetDidInnerOpen } from '../../../types/actions/HomeActions';
import { Provider } from 'react-redux';

storiesOf( 'HowCanIHelp', module )
    .addDecorator( StoryDecorator )
    .add( 'Regular', () =>
    {
        const store = createHomeStore();
        store.dispatch<SetDidInnerOpen>( {
            type:    'SetDidInnerOpen',
            payload: true
        } );

        return (
            <Provider store={ store }>
                <HowCanIHelp/>
            </Provider>
        )
    } );
