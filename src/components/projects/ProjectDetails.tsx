import * as React from 'react';
import { UIEventHandler, useCallback, useEffect, useState } from 'react';
import { DetailsContainer, ProjectImage, SliderArrow, SliderContainer, TextContainer } from './styled';
import Slider from 'react-slick';
import ProjectDetailsProps from './types/ProjectDetailsProps';
import Loader from '../loader/Loader';
import { SectionTitle, Text } from '../styled/typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const handleTextScroll: UIEventHandler<HTMLElement> = useCallback( ( event ) => {

        event.preventDefault();

        const maxPosition = 5000;

        const target = event.target as HTMLElement;

        const styles = getComputedStyle( target );
        const currentBottom = parseInt( styles.bottom as string );

        const { scrollHeight, scrollTop } = target;

        if ( currentBottom <= maxPosition && currentBottom >= 0 ) {
            target.style.bottom = `${ Math.floor( ( scrollTop / scrollHeight ) * 100 ) }%`;
        }
    }, [] );

    return (
        <DetailsContainer>
            <SliderContainer className="slider-container">
                <Loader width="100%" height="100%" svgProps={ {
                    width:  '50%',
                    height: '50%'
                } } asOverlay={ true } active={ imageLoader }/>
                <Slider
                    prevArrow={
                        <SliderArrow ripple={ true } visible={ !imageLoader }><FontAwesomeIcon icon="chevron-left"/></SliderArrow> }
                    nextArrow={
                        <SliderArrow ripple={ true } visible={ !imageLoader }><FontAwesomeIcon icon="chevron-right"/></SliderArrow> }
                    dots={ true }
                    lazyLoad="progressive">
                    { images && images.map( ( imageSrc, index ) =>
                        <ProjectImage onLoad={ handleImageLoad( index ) } key={ index } src={ imageSrc } alt=""/>
                    ) }
                </Slider>
            </SliderContainer>
            <TextContainer onScroll={ handleTextScroll }>
                <div className="title">
                    <SectionTitle uplined={ true }>
                        { name }
                    </SectionTitle>
                </div>
                <div className="details">
                    <Text>
                        { details }
                    </Text>
                </div>
            </TextContainer>
        </DetailsContainer>
    )
};

export default ProjectDetails;
