import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Actions, DetailsContainer, ProjectImage, SliderArrow, SliderContainer, TextContainer } from './styled';
import Slider from 'react-slick';
import ProjectDetailsProps from './types/ProjectDetailsProps';
import Loader from '../loader/Loader';
import { A, SectionTitle, Text } from '../styled/typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import texts from '../../pages/data/texts';
import { Typography } from '@material-ui/core';

const ProjectDetails = ( { project, onImageLoad, isClosing }: ProjectDetailsProps ) =>
{
    const { details, images = [], name, url, repositoryUrl } = project;

    const [ imageLoader, setImageLoader ] = useState( true );
    const [ scheduleHideLoader, setScheduleHideLoader ] = useState( false );

    useEffect( () =>
    {
        if ( !scheduleHideLoader ) {
            return;
        }

        const timeout = setTimeout( () =>
        {
            setImageLoader( false );
        }, 1500 );

        return () =>
        {
            clearTimeout( timeout )
        };

    }, [ scheduleHideLoader ] );

    const handleImageLoad = useCallback( ( index: number ) => () =>
    {
        if ( onImageLoad ) {
            onImageLoad( index );
        }

        // We only need to handle first image
        if ( index > 0 ) {
            return;
        }

        setScheduleHideLoader( true );
    }, [ onImageLoad ] );

    return (
        <DetailsContainer isClosing={ isClosing }>
            <SliderContainer className="slider-container no-hide">
                <Loader width="100%" height="100%" svgProps={ {
                    width:  '50%',
                    height: '50%'
                } } asOverlay={ true } active={ imageLoader }/>
                <Slider
                    prevArrow={
                        (
                            <SliderArrow className="hide-on-open" visible={ !imageLoader }>
                                <FontAwesomeIcon icon="chevron-left"/>
                            </SliderArrow>
                        )
                    }
                    nextArrow={
                        (
                            <SliderArrow className="hide-on-open" visible={ !imageLoader }>
                                <FontAwesomeIcon icon="chevron-right"/>
                            </SliderArrow>
                        )
                    }
                    dots={ true }
                    lazyLoad="ondemand">
                    { images && images.map( ( imageSrc, index ) =>
                        <ProjectImage onLoad={ handleImageLoad( index ) } key={ index } src={ imageSrc } alt=""/>
                    ) }
                </Slider>
            </SliderContainer>
            <TextContainer className="hide-on-open">
                <div className="title">
                    <SectionTitle underlined={ true }>
                        { name }
                    </SectionTitle>
                </div>
                <div className="details">
                    <Typography paragraph>
                        { details }
                    </Typography>
                </div>
                <Actions>
                    { url &&
                      <A href={ url }>
                          <FontAwesomeIcon icon="external-link-alt"/>
                          <Text>
                              { texts.projects.viewProject }
                          </Text>
                      </A>
                    }
                    { repositoryUrl &&
                      <A href={ repositoryUrl }>
                          <FontAwesomeIcon icon={ [ 'fab', 'github' ] }/>
                          <Text>
                              { texts.projects.viewRepo }
                          </Text>
                      </A>
                    }
                </Actions>
            </TextContainer>
        </DetailsContainer>
    )
};

export default ProjectDetails;
