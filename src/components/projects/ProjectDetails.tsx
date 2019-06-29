import * as React from 'react';
import ProjectInterface from './types/ProjectInterface';
import { ProjectDetailsContainer, ProjectImage, SliderContainer } from './styled';
import Slider from 'react-slick';

const ProjectDetails = ( { images }: ProjectInterface ) => {
    return (
        <ProjectDetailsContainer>
            <SliderContainer>
                <Slider>
                    { images && images.map( ( imageSrc, index ) =>
                        <ProjectImage src={ imageSrc } alt="" key={ index }/>
                    ) }
                </Slider>
            </SliderContainer>
            <ProjectDetailsContainer>

            </ProjectDetailsContainer>
        </ProjectDetailsContainer>
    )
};

export default ProjectDetails;
