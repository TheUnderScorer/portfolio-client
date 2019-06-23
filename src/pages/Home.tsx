import * as React from 'react';
import { lazy, MutableRefObject, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import styled, { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Landscape from '../assets/landscape.jpg';
import LandscapeNight from '../assets/landscape-night.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';
import OpenableSection from '../components/openable-section/OpenableSection';
import Header from '../components/header/Header';
import { SetInnerActive } from '../types/actions/HomeActions';
import HomeWrapperProps from './types/HomeWrapperProps';

const AboutMe = lazy( () => import('../components/about-me/AboutMe') );
const HowCanIHelp = lazy( () => import('../components/how-can-i-help/HowCanIHelp') );

const HomeWrapper = styled.div<HomeWrapperProps>`
    ${ props => props.innerActive && `
        header, .inner-section {
            position: relative;
        }
        
        .hero{
            display: none;
        }
    ` }
`;

const InnerSection = styled( OpenableSection )`
    
`;

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );
    const heroCtaRef: MutableRefObject<HTMLButtonElement | undefined> = useRef();

    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );

    const dispatch = useDispatch();

    const [ didOpen, setDidOpen ] = useState( false );

    const toggleSection = useCallback( () => {

        const action: SetInnerActive = {
            type:    'SetInnerActive',
            payload: !innerActive
        };
        dispatch( action );

    }, [ innerActive, dispatch ] );

    useEffect( () => {

        const html = document.querySelector( 'html' ) as HTMLElement;

        innerActive ?
            html.style.overflow = 'auto' :
            html.style.overflow = 'hidden'

    }, [ innerActive ] );

    const onOpen = useCallback( () => {
        console.log( 'open' );
        setDidOpen( true );
    }, [] );

    return (
        <ThemeProvider theme={ { mode: theme.mode } }>
            <HomeWrapper innerActive={ didOpen } className="home">
                <Header/>
                <HeroImage srcs={ [ Landscape, LandscapeNight ] } activeSrc={ theme.mode === 'black' ? 1 : 0 }>
                    <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                </HeroImage>
                <InnerSection onOpen={ onOpen } className="inner-section" relativeTo={ heroCtaRef.current } isOpen={ innerActive }>
                    <Suspense fallback={ <div/> }>
                        { innerActive &&
                          <>
                              <AboutMe/>
                              <HowCanIHelp/>
                          </>
                        }
                    </Suspense>
                </InnerSection>
            </HomeWrapper>
        </ThemeProvider>
    )

};

export default connect()( Home );
