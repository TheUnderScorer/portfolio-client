import styled from 'styled-components';
import ReactModal from 'react-modal';
import colors, { getPrimary } from '../styled/colors';
import { IconButton, RoundButton } from '../styled/buttons';
import { ProjectDetailsContainerProps, ProjectImageFigProps, SliderArrowsProps } from './types/styled';
import Loader from '../loader/Loader';

const borderRadius = '10px';

export const ProjectsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1500px;
    margin: 0 auto;
    
    .project {
        width: 33%;
        height: 300px;   
    }
`;

export const ProjectContainer = styled.article`
    width: 100%;
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    border-radius: ${ borderRadius };
`;

export const ProjectImageFigure = styled.figure<ProjectImageFigProps>`
    height: 100%;
    border-radius: ${ borderRadius };
    overflow: hidden;
    position: relative;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
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
   
   span, h3{
        color: ${ colors.white };
   }
`;

export const ProjectThumbnail = styled.img`
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
    display: block;
    transition: all .3s;
`;

export const ThumbnailLoader = styled( Loader )`
    background: transparent;
`;

export const ProjectModal = styled( ReactModal )`
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
    
    &.active {
        opacity: 1;
        visibility: visible;
    }
`;

export const ReadMore = styled( RoundButton )`
    margin-top: 40px;
`;

export const DetailsContainer = styled.div<ProjectDetailsContainerProps>`
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    padding: 2em;
    height: 100%;
    width: 100%;
    display: flex;
`;

export const SliderContainer = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    
    .slick-slider, .slick-track, .slick-list, .slick-slide > div {
        height: 100%;
    }
    
    .slick-dots{
    
        li{
            button::before{
                color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
                font-size: 12px;
                opacity: 1;
            }
            
            &.slick-active, &:hover{
                button::before{
                    color: ${ props => getPrimary( props.theme.mode ) };
                }
            }
        }
    }
`;

export const TextContainer = styled.div`
    width: 50%;
    padding: 0 2em;
    
    .title{
        text-align: center;
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
    display: flex;
    align-items: center;
    justify-content: center;
    
    &, &:hover, &:focus{
        background: ${ props => getPrimary( props.theme.mode ) };
    }
`;
