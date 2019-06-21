import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Cta, CtaWrapper, NameHighlight, NameWrapper, TextWrapper } from './styled';
import { H1 } from '../styled/typography';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Props from './types/HeroTextProps';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetHeroWrote } from '../../types/actions/HomeActions';
import styled from 'styled-components';
import colors from '../styled/colors';

const texts = [
    'Front-end ',
    'Back-end ',
    'Full-stack developer.'
];

const Headline = styled( H1 )`
    color: ${ colors.white }
`;

const HeroText = ( { onCtaClick, ctaRef }: Props ) => {

    const dispatch = useDispatch();

    const [ ctaVisible, setCtaVisible ] = useState( false );
    const [ ctaRotated, setCtaRotated ] = useState( true );

    const didWrote = useSelector( ( store: HomeStore ) => store.home.didHeroWrote );

    const onTypingDone = useCallback( () => {
        const action: SetHeroWrote = {
            type:    'SetHeroWrote',
            payload: true
        };

        dispatch( action );
    }, [] );

    useEffect( () => {

        if ( !didWrote ) {
            return;
        }

        const showTimeout = setTimeout( () => {
            setCtaVisible( true );
        }, 700 );

        const rotateTimeout = setTimeout( () => {
            setCtaRotated( false );
        }, 1350 );

        return () => {
            clearTimeout( showTimeout );
            clearTimeout( rotateTimeout );
        }

    }, [ didWrote ] );

    return (
        <TextWrapper>
            <NameWrapper>
                <Headline>
                    Hello, I'm <NameHighlight>Przemysław Żydek</NameHighlight>.
                </Headline>
            </NameWrapper>
            <Typist onTypingDone={ onTypingDone } avgTypingDelay={ 55 } startDelay={ 1350 } cursor={ { blink: true } }>
                <Headline>
                    { texts[ 0 ] }
                    <Typist.Backspace delay={ 200 } count={ texts[ 0 ].length }/>
                    { texts[ 1 ] }
                    <Typist.Backspace delay={ 200 } count={ texts[ 1 ].length }/>
                    { texts[ 2 ] }
                </Headline>
            </Typist>
            <CtaWrapper>
                <Cta ref={ ctaRef } onClick={ onCtaClick } className={ `${ ctaVisible ? '' : 'hidden' } ${ ctaRotated ? 'rotated' : '' } ripple with-icon flat` }>
                    <FontAwesomeIcon icon="arrow-down"/>
                    About me
                </Cta>
            </CtaWrapper>
        </TextWrapper>
    )
};

export default connect()( HeroText );
