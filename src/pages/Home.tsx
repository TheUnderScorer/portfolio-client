import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Landscape from '../assets/landscape.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';
import OpenableSection from '../components/openable-section/OpenableSection';
import AboutMe from '../components/about-me/AboutMe';

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );
    const heroCtaRef: MutableRefObject<HTMLButtonElement | undefined> = useRef();

    const [ isOpenSection, setOpenSection ] = useState( false );

    const toggleSection = useCallback( () => {
        setOpenSection( !isOpenSection );
    }, [ isOpenSection ] );

    return (
        <ThemeProvider theme={ theme }>
            <div className="home">
                <HeroImage src={ Landscape }>
                    <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                    <OpenableSection relativeTo={ heroCtaRef.current } isOpen={ isOpenSection }>
                        <AboutMe/>
                    </OpenableSection>
                </HeroImage>
            </div>
        </ThemeProvider>
    )

};

export default connect()( Home );
