import styled from 'styled-components';
import colors from '../styled/colors';
import { Button } from '../styled/buttons';
import { IconButton } from '@material-ui/core';
import {
    ProjectContainerProps,
    ProjectDetailsContainerProps,
    ProjectImageFigProps,
    SliderArrowsProps
} from './types/styled';
import Loader from '../loader/Loader';
import breakpoints from '../styled/breakpoints';
import { Modal } from '../styled/modal';
import { ButtonProps } from '../styled/types';

const borderRadius = '6px';

export const ProjectsContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto !important;
    display: grid;
    grid-template-rows: 1fr;
    grid-row-gap: 1em;
    grid-column-gap: 2em;
    grid-template-columns: repeat(3, 1fr);
    
    @media(max-width: ${ breakpoints.tabletBig }){
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media(max-width: ${ breakpoints.phoneBig }){
        grid-template-columns: 1fr;
    }
    
    .project {
        margin-bottom: 1em; 
        max-height: 300px;
        min-height: 100px;
        
        @media(max-width: ${ breakpoints.tabletBig }){
            height: 15rem;
        }
    }
`;

export const GithubContainer = styled.div`
    max-width: 1400px;
    margin: 1em auto 0;
`;

export const ProjectContainer = styled.div<ProjectContainerProps>`
    width: 100%;
    border-radius: ${ borderRadius };
    
    ${ props => props.loading && `
        height: 300px;
    ` }
`;

export const ProjectImageFigure = styled.figure<ProjectImageFigProps>`
    height: 100%;
    max-height: 300px;
    border-radius: ${ borderRadius };
    overflow: hidden;
    position: relative;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.theme.palette.background.paper };
    
    ${ props => props.loaded && `
        &:hover{
           img {
               transform: scale(1.3);
           }
           
           figcaption {
               opacity: 1;
               visibility: visible;
           }
        }
    ` }
`;

export const ProjectImageCaption = styled.figcaption`
   transition: all .3s;
   opacity: 0;
   visibility: hidden;
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   background: ${ colors.buttons.mainBg };
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: 0 5px 5px 0 rgba(233,240,243,0.5), 0 0 0 1px #E6ECF8;
   
   span, h3{
        color: ${ colors.white };
   }
`;

export const ProjectThumbnail = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    transition: all .3s;
`;

export const ThumbnailLoader = styled( Loader )`
    background: transparent;
`;

export const ProjectModal = styled( Modal )`
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    
    &.active {
        opacity: 1;
        visibility: visible;
    }
    
    @media(max-width: ${ breakpoints.tabletSmall })     {
        width: 85%;
        height: 85%;
    }
    
    @media(max-width: ${ breakpoints.phoneSmall }) {
        width: 80%;
        height: 80%;
    }
`;

export const ReadMore = styled( Button ).attrs<ButtonProps>( {
    isRound:     true,
    iconOnHover: true,
    variant:     'outlined',
} )`
    margin-top: ${ props => props.theme.spacing( 2 ) };
`;

export const DetailsContainer = styled.div<ProjectDetailsContainerProps>`
    background-color: ${ props => props.theme.palette.background.paper };
    height: 100%;
    width: 100%;
    display: flex;
    overflow: visible;
    
    ${ props => props.theme.breakpoints.down( 'sm' ) } {
        flex-direction: column;
        
        > div {
            width: 100%;
        }
        
        .slider-container {
            min-height: 200px;
            max-height: 300px;
        }
    }
    
    ${ props => props.isClosing && `
        .slick-track {
            width: 100% !important;
            transform: none !important;
        }
        
        .slick-slide:not(.slick-current) {
            display: none !important;
        }
        
        .slick-slide.slick-current {
            width: 100% !important;
        }
    ` }
`;

export const SliderContainer = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    
    .slick-slider, .slick-track, .slick-list, .slick-slide > div {
        height: 100%;
    }
    
    .slick-dots{
        bottom: 10px;
    
        li{
            button::before{
                color: ${ props => props.theme.palette.type === 'dark' ? colors.white : colors.dark };
                font-size: 12px;
                opacity: 1;
            }
            
            &.slick-active, &:hover{
                button::before{
                    color: ${ props => props.theme.palette.primary.main };
                }
            }
        }
    }
`;

export const TextContainer = styled.div`
    width: 50%;
    padding: 2em 2em 0.5em;
    overflow: auto;
    transition: all .3s;
    background: inherit;
    display: flex;
    flex-direction: column;
    
    .title {
        text-align: center;
    }
    
    .details {
       flex: 1;
       height: 100%;
     }
    
    @media(max-width: ${ breakpoints.tabletSmall }) {
        display: flex;
        flex-direction: column;   
        
        .title h4{
            margin-bottom: 1em;
        }
    }
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        .details p {
            padding-bottom: 4rem;
        }
    }
`;

export const Actions = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2em;
    border-top: 1px solid ${ colors.lightBorder };
    padding: 1em 0;
    
    > * {
        margin: 0 1em;
    }
    
    @media(max-width: ${ parseInt( breakpoints.tabletBig ) + 1 }px) and (min-width: ${ breakpoints.tabletSmall }){
        flex-wrap: wrap;
        
        a {
            width: 100%;
            margin-bottom: 1em;
            text-align: center;
        }
    } 
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        position: absolute;
        border: none;
        bottom: 0;
        left: 0;
        justify-content: space-between;
        width: 100%;
        padding: 0;
        height: 40px;
        
        > * {
            margin: 0;
            box-shadow: none;
            flex: 1;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const SliderArrow = styled( IconButton )<SliderArrowsProps>`
    opacity: ${ props => props.visible ? '1' : '0' };
    position: absolute;
    z-index: 4;
    transition: all .3s;
    width: 40px;
    height: 40px;
`;
