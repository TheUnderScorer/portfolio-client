import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import ProjectsProps from './types/ProjectsProps';
import Project from './Project';
import { ProjectsContainer } from './styled';

const Projects = ( { projects }: ProjectsProps ) => {
    return (
        <HomeSection centered={ true } odd={ true }>
            <div className="title-container">
                <SectionTitle>
                    My projects
                </SectionTitle>
                <ProjectsContainer>
                    { projects.map( ( project, index ) =>
                        <Project key={ index } project={ project }/>
                    ) }
                </ProjectsContainer>
            </div>
        </HomeSection>
    )
};

export default Projects;
