import ReactModal from 'react-modal';
import styled from 'styled-components';
import colors from './colors';

export const Modal = styled( ReactModal )`
    position: absolute;
    transition: all .5s;
    left: 8%;
    top: 15%;
    
    &.hidden {
        display: none;
    }
    
    .hide-on-open {
        opacity: 0;
        transition: opacity 1s, width .3s;
    }
    
    .no-hide {
        transition: width .3s;
    }
    
    &:not(.opened){
        .no-hide {
            width: 100%;
        }
    }
    
    &.opened {
         .hide-on-open {
            opacity: 1;
        }
    }
    
    &, * {
        outline: none;
    }

    .close {
        position: absolute;
        z-index: 14;
        top: -16px;
        right: -9px;
        width: 30px;
        height: 30px;
        margin: 0;
        padding: 0;
        font-size: 0.8em;
        background-color: ${ colors.red };
        border-color: ${ colors.red };
    }
`;
