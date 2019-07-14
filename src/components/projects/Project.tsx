import * as React from 'react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
    ProjectContainer,
    ProjectImageCaption,
    ProjectImageFigure,
    ProjectModal,
    ProjectThumbnail,
    ReadMore,
    ThumbnailLoader
} from './styled';
import { Text } from '../styled/typography';
import LazyLoad from 'react-lazyload';
import ProjectProps from './types/ProjectProps';
import ProjectDetails from './ProjectDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoundButton } from '../styled/buttons';
import { SetActiveProject } from '../../types/actions/HomeActions';
import { useDispatch } from 'react-redux';
import { pushState } from '../../utils/history';
import { about, project as projectUrl } from '../../pages/data/links';

const Project = ( { project, active = false, index }: ProjectProps ) =>
{
    const dispatch = useDispatch();

    const { thumbnailUrl, shortDetails, images, name } = project;

    const [ thumbLoaded, setThumbLoaded ] = useState( false );

    const thumbRef = useRef() as MutableRefObject<HTMLImageElement>;

    const handleOpen = useCallback( () =>
    {
        const action: SetActiveProject = {
            type:    'SetActiveProject',
            payload: index
        };

        dispatch( action );
    }, [ index ] );

    const handleClose = () =>
    {
        const action: SetActiveProject = {
            type:    'SetActiveProject',
            payload: null
        };

        // Remove project data from history
        pushState( {
            state: null,
            url:   about,
        } );

        dispatch( action );
    };

    const handleLoad = () =>
    {
        setThumbLoaded( true );
    };

    useEffect( () =>
    {
        if ( !active ) {
            return;
        }

        // Push history state with fake project permalink
        pushState( {
            state:              {
                activeProject: index,
                innerActive:   true
            },
            url:                projectUrl( name ),
            validationCallback: ( state ) =>
                                {
                                    return !state || !state.hasOwnProperty( 'activeProject' );
                                }
        } );
    }, [ active, index, name ] );

    return (
        <ProjectContainer className="project">
            <ProjectImageFigure loaded={ thumbLoaded }>
                <ThumbnailLoader active={ !thumbLoaded } asOverlay={ true } svgProps={ {
                    width:  '50%',
                    height: '50%'
                } }/>
                <LazyLoad
                    once={ true }
                    throttle={ 500 }
                    height="100%">
                    <ProjectThumbnail onLoad={ handleLoad } ref={ thumbRef } src={ thumbnailUrl ? thumbnailUrl : ( images ? images[ 0 ] : '' ) } alt=""/>
                </LazyLoad>
                <ProjectImageCaption>
                    <div>
                        <Text>
                            { shortDetails }
                        </Text>
                    </div>
                    <ReadMore iconOnHover={ true } withIcon={ true } transparent={ true } flat={ true } onClick={ handleOpen }>
                        <Text>
                            Check Out
                        </Text>
                        <FontAwesomeIcon icon="arrow-right"/>
                    </ReadMore>
                </ProjectImageCaption>
            </ProjectImageFigure>
            <ProjectModal shouldFocusAfterRender={ false } htmlOpenClassName="has-overlay" className={ `${ active ? 'active' : '' }` } overlayClassName="middle center" isOpen={ active } onRequestClose={ handleClose }>
                <ProjectDetails project={ project }/>
                <RoundButton ripple={ true } flat={ true } onClick={ handleClose } className="close">
                    <FontAwesomeIcon icon="times"/>
                </RoundButton>
            </ProjectModal>
        </ProjectContainer>
    )
};

export default Project;
