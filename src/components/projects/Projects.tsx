import * as React from 'react';
import { useEffect } from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import ProjectsProps from './types/ProjectsProps';
import Project from './Project';
import { ProjectsContainer } from './styled';
import texts from '../../pages/data/texts';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetActiveProject } from '../../types/actions/HomeActions';
import { getState, getStateFromEvent } from '../../utils/history';
import usePopState from '../../hooks/usePopState';

const Projects = ( { projects }: ProjectsProps ) =>
{
    const dispatch = useDispatch();

    const activeProject = useSelector( ( store: HomeStore ) => store.home.activeProject );
    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );

    usePopState( event =>
    {
        let projectIndex: number | null = getStateFromEvent( event, 'activeProject' );

        const action: SetActiveProject = {
            type:    'SetActiveProject',
            payload: projectIndex
        };

        dispatch( action );
    }, [ activeProject ] );

    // Get default active project from history
    useEffect( () =>
    {
        if ( !didInnerOpen ) {
            return;
        }

        const timeout = setTimeout( () =>
        {
            const activeProject = getState( 'activeProject', null );

            const action: SetActiveProject = {
                type:    'SetActiveProject',
                payload: activeProject
            };

            dispatch( action );
        }, 100 );

        return () => clearTimeout( timeout );
    }, [ didInnerOpen ] );

    return (
        <HomeSection id={ texts.projects.id } colorBackground={ true } centered={ true }>
            <div className="title-container">
                <SectionTitle className="section-title">
                    { texts.projects.sectionTitle }
                </SectionTitle>
            </div>
            <ProjectsContainer className="section-inner">
                { projects.map( ( project, index ) =>
                    <Project index={ index } active={ index === activeProject } key={ index } project={ project }/>
                ) }
            </ProjectsContainer>
        </HomeSection>
    )
};

export default connect()( Projects );
