import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailsContainer, ProjectImage, SliderContainer, TextContainer } from './styled';
import Slider from 'react-slick';
import ProjectDetailsProps from './types/ProjectDetailsProps';
import Loader from '../loader/Loader';

const ProjectDetails = ( { project }: ProjectDetailsProps ) => {

    const { details, images = [] } = project;

    const [ showImageLoader, setImageLoader ] = useState( true );
    const [ scheduleHideLoader, setScheduleHideLoader ] = useState( false );

    useEffect( () => {

        if ( !scheduleHideLoader ) {
            return;
        }

        const timeout = setTimeout( () => {
            setImageLoader( false );
        }, 1500 );

        return () => {
            clearTimeout( timeout )
        };

    }, [ scheduleHideLoader ] );

    const handleImageLoad = ( index: number ) => () => {

        // We only need to handle first image
        if ( index > 0 ) {
            return;
        }

        setScheduleHideLoader( true );

    };

    return (
        <DetailsContainer>
            <SliderContainer>
                { showImageLoader &&
                  <Loader width="100%" height="100%" asOverlay={ true } active={ showImageLoader }/> }
                <Slider dots={ true } lazyLoad="progressive">
                    { images && images.map( ( imageSrc, index ) =>
                        <ProjectImage onLoad={ handleImageLoad( index ) } key={ index } src={ imageSrc } alt=""/>
                    ) }
                </Slider>
            </SliderContainer>
            <TextContainer>
                { details }
            </TextContainer>
        </DetailsContainer>
    )
};

export default ProjectDetails;
