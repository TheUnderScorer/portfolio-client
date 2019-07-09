import * as React from 'react';
import Props from './types/HeroImageProps';
import styled from 'styled-components';
import breakpoints from '../styled/breakpoints';
import { connect } from 'react-redux';
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
        position: absolute;
        
        &.faded {
            opacity: 0;
            visibility: hidden;
        }
    }
`;

const HeroChildren = styled.div`
    position: absolute;
    top: 30%;
    left: 20%;
    
    @media(max-width: ${ breakpoints.tabletBig }){
        left: 7%;
    }
`;

const HeroImage = ( { srcs, activeSrc, children }: Props ) => {

    return (
        <HeroContainer className="hero">
            { srcs.map( ( src, index ) =>
                <img key={ index } className={ index !== activeSrc ? 'faded' : '' } src={ src } alt=""/>
            ) }
            <HeroChildren>
                { children }
            </HeroChildren>
        </HeroContainer>
    )
};

export default connect()( HeroImage );
