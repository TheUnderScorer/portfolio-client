import * as React from 'react';
import { lazy, MutableRefObject, Suspense, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import styled, { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Mountains from '../assets/landscape.jpg';
import LandscapeNight from '../assets/landscape-night.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';
import OpenableSection from '../components/openable-section/OpenableSection';
import Header from '../components/header/Header';
import { SetDidInnerOpen, SetInnerActive, SetInnerSectionRelativeItem } from '../types/actions/HomeActions';
import HomeWrapperProps from './types/HomeWrapperProps';
import GlobalStyle from '../components/styled/GlobalStyle';
import Projects from '../components/projects/Projects';
import projects from './data/projects';
import { getState, getStateFromEvent, pushState } from '../utils/history';
import { about } from './data/links';
import usePopState from '../hooks/usePopState';
import useAuth from '../hooks/useAuth';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import colors, { getBaseTextColor, getPrimary } from '../components/styled/colors';
import { UserResult } from '../types/graphql/Mutations';
import { UPDATE_LOGIN_DATE } from '../graphql/mutations/users';
import { useMutation } from '@apollo/react-hooks';

const AboutMe = lazy( () => import('../components/about-me/AboutMe') );
const HowCanIHelp = lazy( () => import('../components/how-can-i-help/HowCanIHelp') );
const Contact = lazy( () => import('../components/contact/Contact') );
const ContactSection = lazy( () => import('../components/contact-section/ContactSection') );

const HomeWrapper = styled.div<HomeWrapperProps>`
    ${ props => props.innerActive && `
        .inner-section {
            position: relative;
        }
        
        .hero{
            display: none;
        }
        
        .content{
            margin-top: ${ props.theme.spacing( 2 ) };
            
            @media(max-width: ${ props.theme.breakpoints.only( 'md' ) }) {
                margin-top: 2rem;
            }
        }
    ` }
`;

const Home = () =>
{
    const theme = useSelector( ( store: HomeStore ) => store.theme );

    const materialTheme = createMuiTheme( {
        palette: {
            primary: {
                main: getPrimary( theme.mode ),
            },
            error:   {
                main: colors.red
            },
            text:    {
                primary: getBaseTextColor( theme.mode )
            },
            common:  {
                white: colors.white,
                black: colors.dark,
            },
            type:    theme.mode
        },
        spacing: ( ( factor: number ) => `${ factor }rem` ) as any,
    } );

    const [ updateLoginDate ] = useMutation<UserResult>( UPDATE_LOGIN_DATE );

    const heroCtaRef = useRef() as MutableRefObject<HTMLButtonElement>;

    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );
    const didOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );
    const innerRelative = useSelector( ( store: HomeStore ) => store.home.innerSectionRelativeItem ) as HTMLElement;

    const [ token, createUser ] = useAuth();

    const dispatch = useDispatch();

    const toggleSection = useCallback( () =>
    {
        const relativeItemAction: SetInnerSectionRelativeItem = {
            type:    'SetInnerSectionRelativeItem',
            payload: heroCtaRef.current
        };

        const setInnerActive: SetInnerActive = {
            type:    'SetInnerActive',
            payload: !innerActive
        };

        dispatch( relativeItemAction );
        dispatch( setInnerActive );

    }, [ innerActive, dispatch ] );

    const onOpen = useCallback( () =>
    {
        const action: SetDidInnerOpen = {
            type:    'SetDidInnerOpen',
            payload: true
        };
        dispatch( action );

    }, [ dispatch ] );

    // Restores default relative item
    useEffect( () =>
    {
        if ( !innerRelative ) {
            const action: SetInnerSectionRelativeItem = {
                type:    'SetInnerSectionRelativeItem',
                payload: heroCtaRef.current
            };

            dispatch( action );
        }

    }, [ innerRelative ] );

    // History state handler
    useEffect( () =>
    {
        if ( getState( 'innerActive', false ) ) {
            return;
        }

        if ( innerActive ) {
            pushState( {
                state: {
                    innerActive: true,
                },
                url:   about
            } );
        }
    }, [ innerActive ] );

    usePopState( event =>
    {
        const innerActiveHistoryState = getStateFromEvent<boolean>( event, 'innerActive' );

        if ( innerActiveHistoryState === null && !innerActive ) {
            return;
        }

        dispatch<SetInnerActive>( {
            type:    'SetInnerActive',
            payload: innerActiveHistoryState
        } as SetInnerActive );
    }, [ innerActive ] );

    // Sets "DidInnerOpen" to false whenever innerActive gets set to false
    useEffect( () =>
    {
        if ( innerActive ) {
            return;
        }

        const didOpenAction: SetDidInnerOpen = {
            type:    'SetDidInnerOpen',
            payload: false
        };

        dispatch( didOpenAction );

    }, [ innerActive ] );

    // Get default inner state from history (this needs to be called here, since the relative button must render before we can use OpenableSection component)
    useEffect( () =>
    {
        setTimeout( () =>
        {
            const action: SetInnerActive = {
                type:    'SetInnerActive',
                payload: getState( 'innerActive', false )
            };

            dispatch( action );
        }, 500 );
    }, [ dispatch ] );

    useMemo( async () =>
    {
        if ( !token ) {
            await createUser();
        }
    }, [ token ] );

    useEffect( () =>
    {
        if ( !token ) {
            return;
        }

        updateLoginDate();
    }, [ token ] );

    return (
        <ThemeProvider theme={ materialTheme }>
            <MaterialThemeProvider theme={ materialTheme }>
                <HomeWrapper innerActive={ didOpen } className="home">
                    <GlobalStyle/>
                    <Header/>
                    <HeroImage srcs={ [ Mountains, LandscapeNight ] } activeSrc={ theme.mode === 'dark' ? 1 : 0 }>
                        <HeroText ctaRef={ heroCtaRef } onCtaClick={ toggleSection }/>
                    </HeroImage>
                    <OpenableSection zIndex={ 2 } onOpen={ onOpen } className="inner-section" relativeTo={ innerRelative } isOpen={ innerActive }>
                        <Suspense fallback={ <div/> }>
                            { innerActive &&
                              <>
                                  <AboutMe/>
                                  <HowCanIHelp/>
                                  <Projects projects={ projects }/>
                                  <ContactSection/>
                              </>
                            }
                        </Suspense>
                    </OpenableSection>
                    <Suspense fallback={ < div/> }>
                        { token && <Contact/> }
                    </Suspense>
                </HomeWrapper>
            </MaterialThemeProvider>
        </ThemeProvider>
    )
};

export default Home;
