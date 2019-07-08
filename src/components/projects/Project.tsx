import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import {
    ProjectContainer,
    ProjectImageCaption,
    ProjectImageFigure,
    ProjectModal,
    ProjectThumbnail,
    ReadMore,
    ThumbnailLoader
} from './styled';
import { Text } from '../styled/typography';
import LazyLoad from 'react-lazyload';
import ProjectProps from './types/ProjectProps';
import ProjectDetails from './ProjectDetails';

const Project = ( { project }: ProjectProps ) => {

    const { thumbnailUrl, shortDetails, images } = project;

    const [ thumbLoaded, setThumbLoaded ] = useState( false );
    const [ isActive, setActive ] = useState( false );

    const thumbRef = useRef() as MutableRefObject<HTMLImageElement>;

    const toggleActive = useCallback( () => {
        setActive( !isActive );
    }, [ isActive ] );

    const handleLoad = () => {
        setThumbLoaded( true );
    };

    return (
        <ProjectContainer xs={ 12 } md={ 6 } lg={ 4 } className="project">
            <ProjectImageFigure loaded={ thumbLoaded }>
                <ThumbnailLoader active={ !thumbLoaded } asOverlay={ true } svgProps={ {
                    width:  '50%',
                    height: '50%'
                } }/>
                <LazyLoad
                    once={ true }
                    throttle={ 500 }
                    height="100%">
                    <ProjectThumbnail onLoad={ handleLoad } ref={ thumbRef } src={ thumbnailUrl ? thumbnailUrl : ( images ? images[ 0 ] : '' ) } alt=""/>
                </LazyLoad>
                <ProjectImageCaption>
                    <div>
                        <Text>
                            { shortDetails }
                        </Text>
                    </div>
                    <ReadMore transparent={ true } flat={ true } onClick={ toggleActive }>
                        Check Out
                    </ReadMore>
                </ProjectImageCaption>
            </ProjectImageFigure>
            <ProjectModal shouldFocusAfterRender={ false } htmlOpenClassName="has-overlay" className={ `${ isActive ? 'active' : '' }` } overlayClassName="middle center" isOpen={ isActive } onRequestClose={ toggleActive }>
                <ProjectDetails project={ project }/>
            </ProjectModal>
        </ProjectContainer>
    )
};

export default Project;
