import * as React from 'react';
import { useEffect, useRef } from 'react';
import SliderSectionProps from './types/SliderSectionProps';
import { Settings } from 'react-slick';
import { Slider, SliderItem } from './styled';

const sliderSettings: Settings = {
    autoplay:       false,
    dots:           false,
    arrows:         false,
    draggable:      false,
    slidesToScroll: 1,
    slidesToShow:   1,
};

const SliderSection = ( { children, activeSection, className }: SliderSectionProps ) =>
{
    const sliderRef = useRef() as any;

    useEffect( () =>
    {
        if ( !sliderRef.current ) {
            return;
        }

        sliderRef.current.slickGoTo( activeSection );
    }, [ activeSection, sliderRef ] );

    return (
        <Slider ref={ sliderRef } className={ className } { ...sliderSettings }>
            { children.map( ( child, index ) =>
            {
                if ( activeSection !== index ) {
                    return <SliderItem key={ index } active={ false }/>;
                }

                return (
                    <SliderItem active={ index === activeSection } key={ index }>
                        { child }
                    </SliderItem>
                )
            } ) }
        </Slider>
    )
};

export default SliderSection;
