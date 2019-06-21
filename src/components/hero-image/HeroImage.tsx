import * as React from 'react';
import Props from './types/HeroImageProps';
import styled from 'styled-components';
import breakpoints from '../styled/breakpoints';
import { connect } from 'react-redux';

const HeroContainer = styled.section`
    width: 100%;
    height: 100vh;
    position: relative;
    border: 20px solid #28283E;
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        border: none;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.7);
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
    return (
        <HeroContainer className="hero">
            <img src={ src } alt=""/>
            <HeroChildren>
                { children }
            </HeroChildren>
        </HeroContainer>
    )
};

export default connect()( HeroImage );
