import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import ProjectsProps from './types/ProjectsProps';
import Project from './Project';
import { ProjectsContainer } from './styled';
import texts from '../../pages/data/texts';
import { connect } from 'react-redux';

const Projects = ( { projects }: ProjectsProps ) => {
    return (
        <HomeSection id={ texts.projects.id } colorBackground={ true } centered={ true }>
            <div className="title-container">
                <SectionTitle className="section-title">
                    { texts.projects.sectionTitle }
                </SectionTitle>
            </div>
            <ProjectsContainer className="section-inner">
                { projects.map( ( project, index ) =>
                    <Project key={ index } project={ project }/>
                ) }
            </ProjectsContainer>
        </HomeSection>
    )
};

export default connect()( Projects );
