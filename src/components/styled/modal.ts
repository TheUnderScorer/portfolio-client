import ReactModal from 'react-modal';
import styled from 'styled-components';

export const Modal = styled( ReactModal )`
    position: relative;

    .close {
        position: absolute;
        z-index: 14;
        top: -16px;
        right: -9px;
        width: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
    }
`;
