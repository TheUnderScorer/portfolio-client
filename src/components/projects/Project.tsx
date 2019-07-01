import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { ProjectContainer, ProjectImageCaption, ProjectImageFigure, ProjectThumbnail, ReadMore } from './styled';
import ProjectInterface from './types/ProjectInterface';
import { Text } from '../styled/typography';
import OpenableSection from '../openable-section/OpenableSection';

const Project = ( { images, thumbnailUrl, shortDetails }: ProjectInterface ) => {

    const [ isActive, setActive ] = useState( false );

    const thumbRef = useRef() as MutableRefObject<HTMLImageElement>;

    const toggleActive = useCallback( () => {
        setActive( !isActive );
    }, [ isActive ] );

    return (
        <ProjectContainer className="project">
            <ProjectImageFigure>
                <ProjectThumbnail ref={ thumbRef } src={ thumbnailUrl ? thumbnailUrl : ( images ? images[ 0 ] : '' ) } alt=""/>
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
            <OpenableSection isOpen={ isActive } relativeTo={ thumbRef.current }>
                <div>
                    Project modal!
                </div>
            </OpenableSection>
        </ProjectContainer>
    )
};

export default Project;
