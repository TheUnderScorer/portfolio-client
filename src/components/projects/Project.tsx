import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import {
    ProjectContainer,
    ProjectImageCaption,
    ProjectImageFigure,
    ProjectModal,
    ProjectThumbnail,
    ReadMore
} from './styled';
import { Text } from '../styled/typography';
import LazyLoad from 'react-lazyload';
import Loader from '../loader/Loader';
import ProjectProps from './types/ProjectProps';
import ProjectDetails from './ProjectDetails';

const Project = ( { project }: ProjectProps ) => {

    const { thumbnailUrl, shortDetails, images } = project;

    const [ isActive, setActive ] = useState( false );

    const thumbRef = useRef() as MutableRefObject<HTMLImageElement>;

    const toggleActive = useCallback( () => {
        setActive( !isActive );
    }, [ isActive ] );

    return (
        <ProjectContainer className="project">
            <ProjectImageFigure>
                <LazyLoad
                    once={ true }
                    throttle={ 250 }
                    placeholder={
                        <Loader active={ true } width="50%" height="50%"/> }
                    height="100%">
                    <ProjectThumbnail ref={ thumbRef } src={ thumbnailUrl ? thumbnailUrl : ( images ? images[ 0 ] : '' ) } alt=""/>
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
            <ProjectModal overlayClassName="middle center" isOpen={ isActive } onRequestClose={ toggleActive }>
                <ProjectDetails project={ project }/>
            </ProjectModal>
        </ProjectContainer>
    )
};

export default Project;
