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
    
    > *: not(.placeholder) {
        opacity: 0;
    }
    
    &.opened {
        > * {
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
