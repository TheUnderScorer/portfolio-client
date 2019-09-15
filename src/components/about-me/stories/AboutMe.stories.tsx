import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import AboutMe from '../AboutMe';
import React from 'react';

storiesOf( 'AboutMe', module )
    .addDecorator( StoryDecorator )
    .add( 'Regular', () =>
    {
        return <AboutMe/>
    } );
