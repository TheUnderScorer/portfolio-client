import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import ContactBox from '../ContactBox';
import React from 'react';

storiesOf( 'ContactBox', module )
    .addDecorator( StoryDecorator )
    .add( 'With all stuff', () =>
    {
        return <ContactBox/>
    } );
