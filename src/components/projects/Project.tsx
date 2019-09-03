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
import { Button } from '../styled/buttons';
import { SetActiveProject } from '../../types/actions/HomeActions';
import { useDispatch } from 'react-redux';
import { pushState } from '../../utils/history';
import { about, project as projectUrl } from '../../pages/data/links';
import useOpenableModal from '../../hooks/useOpenableModal';

const Project = ( { project, active = false, index }: ProjectProps ) =>
{
    const dispatch = useDispatch();

    const { thumbnailUrl, shortDetails, images, name } = project;

    const [ thumbLoaded, setThumbLoaded ] = useState( false );

    const thumbRef = useRef() as MutableRefObject<HTMLImageElement>;

    const relativeItemRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { setModalRef, modalStyles, modalClassList, overlayStyles, setModalLoaded } = useOpenableModal( {
        relativeElement: relativeItemRef.current,
        open:            active
    } );

    const handleImageLoad = useCallback( ( index: number ) =>
    {
        if ( index === 0 ) {
            setModalLoaded( true );
        }
    }, [ setModalLoaded ] );

    const handleOpen = useCallback( () =>
    {
        const action: SetActiveProject = {
            type:    'SetActiveProject',
            payload: index
        };

        dispatch( action );
    }, [ index ] );

    const handleClose = useCallback( () =>
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
    }, [] );

    const handleLoad = useCallback( () =>
    {
        setThumbLoaded( true );
    }, [] );

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
        <ProjectContainer loading={ !thumbLoaded } className="project">
            <ProjectImageFigure ref={ relativeItemRef } loaded={ thumbLoaded }>
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
                    <ReadMore onClick={ handleOpen }>
                        <Text>
                            Check Out
                        </Text>
                        <FontAwesomeIcon icon="arrow-right"/>
                    </ReadMore>
                </ProjectImageCaption>
            </ProjectImageFigure>
            <ProjectModal
                style={ {
                    content: modalStyles,
                    overlay: overlayStyles
                } }
                contentRef={ setModalRef }
                shouldFocusAfterRender={ false }
                htmlOpenClassName="has-overlay"
                className={ modalClassList.join( ' ' ) }
                overlayClassName="middle center"
                isOpen={ active }
                onRequestClose={ handleClose }>
                <ProjectDetails onImageLoad={ handleImageLoad } project={ project }/>
                <Button round={ true } ripple={ true } flat={ true } onClick={ handleClose } className="close">
                    <FontAwesomeIcon icon="times"/>
                </Button>
            </ProjectModal>
        </ProjectContainer>
    )
};

export default Project;
