import styled from 'styled-components';
import ReactModal from 'react-modal';
import colors from '../styled/colors';
import { RoundButton } from '../styled/buttons';

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
`;
export const ProjectImageFigure = styled.figure`
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin: 0;
    
    &:hover{
       img {
           transform: scale(1.3);
       }
       
       figcaption {
           opacity: 1;
           visibility: visible;
       }
   }
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

export const ProjectModal = styled( ReactModal )`
    width: 80%;
    height: auto;
`;

export const ReadMore = styled( RoundButton )`
    margin-top: 40px;
`;

export const ProjectDetailsContainer = styled.div`
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    padding: 5em;
`;

export const SliderContainer = styled.div``;

export const ProjectDetailsTextContainer = styled.div``;

export const ProjectImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;
