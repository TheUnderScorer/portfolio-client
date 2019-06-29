import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';

const Projects = () => {
    return (
        <HomeSection centered={ true } odd={ true }>
            <div className="title-container">
                <SectionTitle>
                    My projects
                </SectionTitle>
            </div>
        </HomeSection>
    )
};

export default Projects;
