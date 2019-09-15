import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Cta, CtaWrapper, NameWrapper, TextWrapper } from './styled';
import { H1 } from '../styled/typography';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Props from './types/HeroTextProps';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetHeroWrote } from '../../types/actions/HomeActions';
import styled from 'styled-components';
import colors from '../styled/colors';
import texts from '../../pages/data/texts';
import breakpoints from '../styled/breakpoints';

const roleTexts = [
    'Front-end ',
    'Back-end ',
    'Full-stack developer.'
];

const Headline = styled( H1 )`
    color: ${ colors.white };
    
    @media(max-width: ${ breakpoints.phoneBig }){
        font-size: 2.5em;
    }
`;

const HeroText = ( { onCtaClick, ctaRef }: Props ) =>
{

    const dispatch = useDispatch();

    const [ ctaVisible, setCtaVisible ] = useState( false );
    const [ ctaRotated, setCtaRotated ] = useState( true );

    const didWrote = useSelector( ( store: HomeStore ) => store.home.didHeroWrote );

    const onTypingDone = useCallback( () =>
    {
        const action: SetHeroWrote = {
            type:    'SetHeroWrote',
            payload: true
        };

        dispatch( action );
    }, [ dispatch ] );

    useEffect( () =>
    {

        if ( !didWrote ) {
            return;
        }

        const showTimeout = setTimeout( () =>
        {
            setCtaVisible( true );
        }, 700 );

        const rotateTimeout = setTimeout( () =>
        {
            setCtaRotated( false );
        }, 1350 );

        return () =>
        {
            clearTimeout( showTimeout );
            clearTimeout( rotateTimeout );
        }

    }, [ didWrote ] );

    return (
        <TextWrapper>
            <NameWrapper>
                <Headline>
                    { texts.hero.title }
                </Headline>
            </NameWrapper>
            <Typist onTypingDone={ onTypingDone } avgTypingDelay={ 55 } startDelay={ 1350 } cursor={ { blink: true } }>
                <Headline>
                    { roleTexts[ 0 ] }
                    <Typist.Backspace delay={ 200 } count={ roleTexts[ 0 ].length }/>
                    { roleTexts[ 1 ] }
                    <Typist.Backspace delay={ 200 } count={ roleTexts[ 1 ].length }/>
                    { roleTexts[ 2 ] }
                </Headline>
            </Typist>
            <CtaWrapper>
                <Cta isRound size="large" variant="contained" color="primary" ref={ ctaRef } onClick={ onCtaClick } className={ `${ ctaVisible ? '' : 'hidden' } ${ ctaRotated ? 'rotated' : '' }` }>
                    <FontAwesomeIcon icon="arrow-down"/>
                    { texts.aboutMe.sectionTitle }
                </Cta>
            </CtaWrapper>
        </TextWrapper>
    )
};

export default HeroText;
