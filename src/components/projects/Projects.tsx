import * as React from 'react';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import ProjectsProps from './types/ProjectsProps';
import Project from './Project';
import { GithubContainer } from './styled';
import texts from '../../pages/data/texts';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetActiveProject } from '../../types/actions/HomeActions';
import { getState, getStateFromEvent, pushState } from '../../utils/history';
import usePopState from '../../hooks/usePopState';
import { about } from '../../pages/data/links';
import { Button } from '../styled/buttons';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../../graphql/clients/github';
import Loader from '../loader/Loader';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const GithubRepos = lazy( () => import('../github-repos/GithubRepos') );

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    root:     {
        paddingTop: '1.2em'
    },
    button:   {
        boxShadow: 'none'
    },
    grid:     {
        position: 'relative'
    },
    gridItem: {
        padding: theme.spacing( 0.5 ),
    }
} ) );

const Projects = ( { projects }: ProjectsProps ) =>
{
    const classes = useStyles();

    const dispatch = useDispatch();

    const activeProject = useSelector( ( store: HomeStore ) => store.home.activeProject );
    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );

    const [ isExpanded, setExpanded ] = useState( false );
    const toggleExpand = useCallback( () => setExpanded( !isExpanded ), [ isExpanded ] );

    const handleProjectClose = useCallback( () =>
    {
        // Remove project data from history
        pushState( {
            state: null,
            url:   about,
        } );

        dispatch<SetActiveProject>( {
            type:    'SetActiveProject',
            payload: null,
        } );
    }, [ dispatch ] );

    const handleProjectOpen = useCallback( ( index: number ) => () =>
    {
        dispatch<SetActiveProject>( {
            type:    'SetActiveProject',
            payload: index
        } );
    }, [ dispatch ] );

    usePopState( event =>
    {
        const projectIndex: number | null = getStateFromEvent( event, 'activeProject' );

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
        <HomeSection className={ classes.root } hasSeparator id={ texts.projects.id } isCentered>
            <div className="title-container">
                <SectionTitle uplined className="section-title">
                    { texts.projects.sectionTitle }
                </SectionTitle>
            </div>
            <Grid container className={ `section-inner ${ classes.grid }` }>
                { projects.map( ( project, index ) =>
                    <Grid className={ classes.gridItem } key={ index } item xs={ 12 } sm={ 6 } md={ 6 } lg={ 3 }>
                        <Project
                            onClose={ handleProjectClose }
                            onOpen={ handleProjectOpen( index ) }
                            index={ index }
                            active={ index === activeProject }
                            key={ index }
                            project={ project }/>
                    </Grid>
                ) }
            </Grid>
            { isExpanded && (
                <ApolloProvider client={ client }>
                    <GithubContainer>
                        <Suspense fallback={ <Loader svgProps={ { width: '50px', height: '50px' } }/> }>
                            <GithubRepos queryVariables={ { first: 5 } }/>
                        </Suspense>
                    </GithubContainer>
                </ApolloProvider>
            ) }
            <Button variant="contained" color="primary" onClick={ toggleExpand } className={ `overflow-item ${ classes.button }` } isRound>
                { isExpanded ? 'View less' : 'View more' }
            </Button>
        </HomeSection>
    )
};

export default Projects;
