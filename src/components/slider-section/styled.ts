import BaseSlider from 'react-slick';
import styled from 'styled-components';
import { SliderItemProps } from './types/styled';

export const Slider = styled( BaseSlider )`
    .slick-list, .slick-track, .slick-slide > div {
        height: 100%;
    }
`;

export const SliderItem = styled.div<SliderItemProps>`
    transition: opacity .2s;
    height: 100%;
    
    ${ ( { active = false } ) => !active && `
        opacity: 0;
        visibility: hidden;
    ` }
`;
