import * as React from 'react';
import { useEffect, useState } from 'react';
import Props from './types/HeroImageProps';
import styled from 'styled-components';
import breakpoints from '../styled/breakpoints';
import { connect } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import colors from '../styled/colors';

const HeroContainer = styled.section`
    width: 100%;
    height: 100vh;
    position: relative;
    border: 20px solid #28283E;
    background-color ${ colors.black };
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        border: none;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.7);
        transition: opacity .3s linear;
        
        &.faded {
            opacity: 0;
        }
    }
`;

const HeroChildren = styled.div`
    position: absolute;
    top: 30%;
    left: 20%;
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        left: 10%;
    }
`;

const HeroImage = ( { src, children }: Props ) => {

    const [ faded, setFaded ] = useState( false );

    const prevSrc = usePrevious( src );

    const [ actualSrc, setActualSrc ] = useState( src );

    useEffect( () => {

        if ( !prevSrc || prevSrc === src ) {
            return;
        }

        setFaded( true );
    }, [ src, prevSrc ] );

    useEffect( () => {

        if ( !faded ) {
            return;
        }

        const srcTimeout = setTimeout( () => {
            setActualSrc( src );
        }, 200 );

        const fadeTimeout = setTimeout( () => {
            setFaded( false );
        }, 400 );

        return () => {
            clearTimeout( srcTimeout );
            clearTimeout( fadeTimeout );
        }

    }, [ faded ] );

    return (
        <HeroContainer className="hero">
            <img className={ faded ? 'faded' : '' } src={ actualSrc } alt=""/>
            <HeroChildren>
                { children }
            </HeroChildren>
        </HeroContainer>
    )
};

export default connect()( HeroImage );
