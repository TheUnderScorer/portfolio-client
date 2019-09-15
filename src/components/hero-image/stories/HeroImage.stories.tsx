import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import HeroImage from '../HeroImage';
import Mountains from '../../../assets/landscape.jpg';
import LandscapeNight from '../../../assets/landscape-night.jpg';
import HeroText from '../../hero-text/HeroText';
import * as React from 'react';
import { useRef } from 'react';
import { action } from '@storybook/addon-actions';

storiesOf( 'HeroImage', module )
    .addDecorator( StoryDecorator )
    .add( 'With text and light background', () =>
    {
        return (
            <HeroImage srcs={ [ Mountains, LandscapeNight ] } activeSrc={ 0 }>
                <HeroText ctaRef={ useRef() } onCtaClick={ action( 'CTA Click' ) }/>
            </HeroImage>
        )
    } )
    .add( 'With text and dark background', () =>
    {
        return (
            <HeroImage srcs={ [ Mountains, LandscapeNight ] } activeSrc={ 1 }>
                <HeroText ctaRef={ useRef() } onCtaClick={ action( 'CTA Click' ) }/>
            </HeroImage>
        )
    } )
;
