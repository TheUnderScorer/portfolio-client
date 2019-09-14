import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './buttons';
import { action } from '@storybook/addon-actions';
import { StoryDecorator } from '../../storybook/decorators';

storiesOf( 'Button', module )
    .addDecorator( StoryDecorator )
    .add( 'with text', () => (
        <Button onClick={ action( 'clicked' ) }>Hello Button</Button>
    ) )
    .add( 'as CTA', () => (
        <Button cta onClick={ action( 'clicked' ) }>Click me!</Button>
    ) )
    .add( 'flat', () => (
        <Button flat>I'm flat!</Button>
    ) )
    .add( 'with emoji', () => (
        <Button onClick={ action( 'clicked' ) }><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ) );
