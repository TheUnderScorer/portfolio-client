import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Cta, CtaWrapper, NameHighlight, NameWrapper, TextWrapper } from './styled';
import { H1, Text } from '../styled/typography';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const texts = [
    'Front-end ',
    'Back-end ',
    'Full-stack developer.'
];

const HeroText = () => {
    const [ typed, setTyped ] = useState( false );
    const [ ctaVisible, setCtaVisible ] = useState( false );
    const [ ctaRotated, setCtaRotated ] = useState( true );

    const onTypingDone = useCallback( () => {
        setTyped( true );
    }, [] );

    useEffect( () => {

        if ( !typed ) {
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

    }, [ typed ] );

    return (
        <TextWrapper>
            <NameWrapper>
                <H1>
                    Hello, I'm <NameHighlight>Przemysław Żydek</NameHighlight>.
                </H1>
            </NameWrapper>
            <Typist onTypingDone={ onTypingDone } avgTypingDelay={ 55 } startDelay={ 1350 } cursor={ { blink: true } }>
                <H1>
                    { texts[ 0 ] }
                    <Typist.Backspace delay={ 200 } count={ texts[ 0 ].length }/>
                    { texts[ 1 ] }
                    <Typist.Backspace delay={ 200 } count={ texts[ 1 ].length }/>
                    { texts[ 2 ] }
                </H1>
            </Typist>
            <CtaWrapper>
                <Cta className={ `${ ctaVisible ? '' : 'hidden' } ${ ctaRotated ? 'rotated' : '' } ripple with-icon flat` }>
                    <FontAwesomeIcon icon="arrow-down"/>
                    <Text>
                        About me
                    </Text>
                </Cta>
            </CtaWrapper>
            <H1>
            </H1>
        </TextWrapper>
    )
};

export default HeroText;
