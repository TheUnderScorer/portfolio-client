import styled from 'styled-components';
import colors from '../styled/colors';
import OpenableStyledProps from './types/OpenableStyledProps';

export const Openable = styled.div<OpenableStyledProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    z-index: ${ props => props.zIndex };
    top: 0;
    left: 0;
   
    ${ props => props.animated && `
        transition: all .3s;
    ` }
    
    .content{
        opacity: 0;
        visibility: hidden;
        transition: all .3s;
    }

    ${ props => props.isActive && `
        opacity: 1;
        visibility: visible;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        
        .content {
            opacity: 1;
            visibility: visible;
        }
        
        .placeholder {
            opacity: 0;
            visibility: hidden;
        }
    ` };
    
    ${ props => props.hasBg && `
         background: ${ props.theme.mode === 'black' ? colors.black : colors.lightBg } !important;
    ` }
`;
