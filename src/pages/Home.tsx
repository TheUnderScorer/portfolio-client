import * as React from 'react';
import { lazy, MutableRefObject, Suspense, useCallback, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import styled, { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Forest from '../assets/forest.png';
import LandscapeNight from '../assets/landscape-night.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';
import OpenableSection from '../components/openable-section/OpenableSection';
import Header from '../components/header/Header';
import { SetDidInnerOpen, SetInnerActive } from '../types/actions/HomeActions';
import HomeWrapperProps from './types/HomeWrapperProps';
import GlobalStyle from '../components/styled/GlobalStyle';
import Projects from '../components/projects/Projects';
import projects from './data/projects';

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
        
        .content{
            margin-top: 80px;
        }
    ` }
`;

const InnerSection = styled( OpenableSection )`
`;

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );
    const heroCtaRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );
    const didOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );

    const dispatch = useDispatch();

    const toggleSection = useCallback( () => {

        const action: SetInnerActive = {
            type:    'SetInnerActive',
            payload: !innerActive
        };
        dispatch( action );

    }, [ innerActive, dispatch ] );

    const onOpen = useCallback( () => {

        const action: SetDidInnerOpen = {
            type:    'SetDidInnerOpen',
            payload: true
        };
        dispatch( action );

    }, [ dispatch ] );

    return (
        <ThemeProvider theme={ { mode: theme.mode } }>
            <HomeWrapper innerActive={ didOpen } className="home">
                <GlobalStyle/>
                <Header/>
                <HeroImage srcs={ [ Forest, LandscapeNight ] } activeSrc={ theme.mode === 'black' ? 1 : 0 }>
                    <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                </HeroImage>
                <InnerSection zIndex={ 2 } onOpen={ onOpen } className="inner-section" relativeTo={ heroCtaRef.current } isOpen={ innerActive }>
                    <Suspense fallback={ <div/> }>
                        { innerActive &&
                          <>
                              <AboutMe/>
                              <HowCanIHelp/>
                              <Projects projects={ projects }/>
                          </>
                        }
                    </Suspense>
                </InnerSection>
            </HomeWrapper>
        </ThemeProvider>
    )

};

export default connect()( Home );
