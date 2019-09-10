import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Actions, DetailsContainer, ProjectImage, SliderArrow, SliderContainer, TextContainer } from './styled';
import Slider from 'react-slick';
import ProjectDetailsProps from './types/ProjectDetailsProps';
import Loader from '../loader/Loader';
import { Paragraph, SectionTitle, Text } from '../styled/typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../styled/buttons';
import texts from '../../pages/data/texts';

const ProjectDetails = ( { project, onImageLoad }: ProjectDetailsProps ) =>
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
        <DetailsContainer>
            <SliderContainer className="slider-container no-hide">
                <Loader width="100%" height="100%" svgProps={ {
                    width:  '50%',
                    height: '50%'
                } } asOverlay={ true } active={ imageLoader }/>
                <Slider
                    prevArrow={
                        (
                            <SliderArrow className="hide-on-open" ripple={ true } visible={ !imageLoader }>
                                <FontAwesomeIcon icon="chevron-left"/>
                            </SliderArrow>
                        )
                    }
                    nextArrow={
                        (
                            <SliderArrow className="hide-on-open" ripple={ true } visible={ !imageLoader }>
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
                    <Paragraph>
                        { details }
                    </Paragraph>
                </div>
                <Actions>
                    { url &&
                      // @ts-ignore
                      <Button flat as="a" href={ url } withIcon ripple>
                          <FontAwesomeIcon icon="external-link-alt"/>
                          <Text>
                              { texts.projects.viewProject }
                          </Text>
                      </Button>
                    }
                    { repositoryUrl &&
                      // @ts-ignore
                      <Button flat as="a" href={ repositoryUrl } withIcon ripple>
                          <FontAwesomeIcon icon={ [ 'fab', 'github' ] }/>
                          <Text>
                              { texts.projects.viewRepo }
                          </Text>
                      </Button>
                    }
                </Actions>
            </TextContainer>
        </DetailsContainer>
    )
};

export default ProjectDetails;
