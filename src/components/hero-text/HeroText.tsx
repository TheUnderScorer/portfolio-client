import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Cta, CtaWrapper, NameWrapper, TextWrapper } from './styled';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Props from './types/HeroTextProps';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetHeroWrote } from '../../types/actions/HomeActions';
import styled from 'styled-components';
import texts from '../../pages/data/texts';
import { Typography } from '@material-ui/core';

const roleTexts = [
    'Front-end ',
    'Back-end ',
    'Full-stack developer.'
];

const Headline = styled( Typography ).attrs( {
    variant: 'h1',
    display: 'inline'
} )`
    &.MuiTypography-root{
        font-size: 4rem;
        color: ${ props => props.theme.palette.common.white };
        
        ${ props => props.theme.breakpoints.down( 'sm' ) }{
            font-size: 2.5rem;
        }
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
