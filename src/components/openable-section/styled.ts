import styled from 'styled-components';
import colors from '../styled/colors';

export const Openable = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    z-index: 2;
    
    .content{
        opacity: 0;
        visibility: hidden;
        transition: all .3s;
    }
    
    &.animated{
        transition: all .4s;
    }

    &.active{
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
    }
    
    &.with-bg {
        background: ${ ( props ) => props.theme.mode === 'black' ? colors.black : colors.lightBg } !important;
    }
`;
