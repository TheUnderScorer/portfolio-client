import * as React from 'react';
import { useCallback, useState } from 'react';
import {
    ProjectContainer,
    ProjectImageCaption,
    ProjectImageFigure,
    ProjectModal,
    ProjectThumbnail,
    ReadMore
} from './styled';
import ProjectInterface from './types/ProjectInterface';
import { Text } from '../styled/typography';

const Project = ( { images, thumbnailUrl, shortDetails }: ProjectInterface ) => {

    const [ isActive, setActive ] = useState( false );

    const toggleActive = useCallback( () => {
        setActive( !isActive );
    }, [ isActive ] );

    return (
        <ProjectContainer className="project">
            <ProjectImageFigure>
                <ProjectThumbnail src={ thumbnailUrl ? thumbnailUrl : ( images ? images[ 0 ] : '' ) } alt=""/>
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
            { isActive &&
              <ProjectModal onRequestClose={ toggleActive } isOpen={ isActive }>
                  <div>
                      Project modal
                  </div>
              </ProjectModal>
            }
        </ProjectContainer>
    )
};

export default Project;
