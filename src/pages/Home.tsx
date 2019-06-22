import * as React from 'react';
import { lazy, MutableRefObject, Suspense, useCallback, useRef } from 'react';
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

const AboutMe = lazy( () => import('../components/about-me/AboutMe') );

const HomeWrapper = styled.div`
`;

const InnerSection = styled( OpenableSection )`
    &.active{
        padding-top: 180px;
    }
`;

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );
    const heroCtaRef: MutableRefObject<HTMLButtonElement | undefined> = useRef();

    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );

    const dispatch = useDispatch();

    const toggleSection = useCallback( () => {

        const action: SetInnerActive = {
            type:    'SetInnerActive',
            payload: !innerActive
        };
        dispatch( action );

    }, [ innerActive ] );

    return (
        <ThemeProvider theme={ { mode: theme.mode } }>
            <HomeWrapper className="home">
                <Header/>
                <HeroImage src={ theme.mode === 'white' ? Landscape : LandscapeNight }>
                    <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                </HeroImage>
                <InnerSection relativeTo={ heroCtaRef.current } isOpen={ innerActive }>
                    <Suspense fallback={ <div/> }>
                        { innerActive &&
                          <AboutMe/>
                        }
                    </Suspense>
                </InnerSection>
            </HomeWrapper>
        </ThemeProvider>
    )

};

export default connect()( Home );
