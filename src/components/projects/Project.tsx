import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { ProjectContainer, ProjectImageCaption, ProjectImageFigure, ProjectThumbnail, ReadMore } from './styled';
import { Text } from '../styled/typography';
import LazyLoad from 'react-lazyload';
import Loader from '../loader/Loader';
import ProjectProps from './types/ProjectProps';
import Modal from 'react-modal';

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
                    debounce={ 200 }
                    throttle={ 500 }
                    placeholder={
                        <div><Loader active={ true } width="50%" height="50%"/></div> }
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
            <Modal isOpen={ isActive } onRequestClose={ toggleActive }>
                Project modal!
            </Modal>
        </ProjectContainer>
    )
};

export default Project;
