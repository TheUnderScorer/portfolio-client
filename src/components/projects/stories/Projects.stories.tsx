import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import Projects from '../Projects';
import projects from '../../../pages/data/projects';
import React from 'react';

storiesOf( 'Projects', module )
    .addDecorator( StoryDecorator )
    .add( 'With projects', () => <Projects projects={ projects }/> );
