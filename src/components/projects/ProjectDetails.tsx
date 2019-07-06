import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailsContainer, ProjectImage, SliderContainer, TextContainer } from './styled';
import Slider from 'react-slick';
import ProjectDetailsProps from './types/ProjectDetailsProps';
import Loader from '../loader/Loader';
import { SectionTitle, Text } from '../styled/typography';

const ProjectDetails = ( { project }: ProjectDetailsProps ) => {

    const { details, images = [], name } = project;

    const [ imageLoader, setImageLoader ] = useState( true );
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
                <Loader width="100%" height="100%" svgProps={ {
                    width:  '50%',
                    height: '50%'
                } } asOverlay={ true } active={ imageLoader }/>
                <Slider dots={ true } lazyLoad="progressive">
                    { images && images.map( ( imageSrc, index ) =>
                        <ProjectImage onLoad={ handleImageLoad( index ) } key={ index } src={ imageSrc } alt=""/>
                    ) }
                </Slider>
            </SliderContainer>
            <TextContainer>
                <div className="title">
                    <SectionTitle uplined={ true }>
                        { name }
                    </SectionTitle>
                </div>
                <div>
                    <Text>
                        { details }
                    </Text>
                </div>
            </TextContainer>
        </DetailsContainer>
    )
};

export default ProjectDetails;
