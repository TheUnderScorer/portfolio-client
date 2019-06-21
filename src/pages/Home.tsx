import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { Main } from '../components/styled/wrappers';
import { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Landscape from '../assets/landscape.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';
import OpenableSection from '../components/openable-section/OpenableSection';

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );
    const heroCtaRef: MutableRefObject<HTMLButtonElement | undefined> = useRef();

    const [ isOpenSection, setOpenSection ] = useState( false );

    const toggleSection = useCallback( () => {
        setOpenSection( !isOpenSection );
    }, [ isOpenSection ] );

    return (
        <ThemeProvider theme={ theme }>
            <Main>
                <HeroImage src={ Landscape }>
                    <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                    <OpenableSection relativeTo={ heroCtaRef.current } isOpen={ isOpenSection }>
                        Stuff
                    </OpenableSection>
                </HeroImage>
            </Main>
        </ThemeProvider>
    )

};

export default connect()( Home );
