import * as React from 'react';
import { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Props from './types/OpenableSectionProps';
import colors from '../styled/colors';
import * as ReactDOM from 'react-dom';
import handleOpen from './effects/handleOpen';
import positionToRelativeItem from './effects/positionToRelativeItem';

const Openable = styled.div`
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
        
        .placeholder {
            opacity: 0;
            visibility: hidden;
        }
    }
    
    &.with-bg {
        background: ${ ( props ) => props.theme.mode === 'black' ? colors.black : colors.white } !important;
    }
`;

const OpenableSection = ( { children, isOpen = false, relativeTo }: Props ) => {

    const wrapperRef: MutableRefObject<HTMLDivElement | any> = useRef();

    useEffect( () => {

        if ( !wrapperRef.current || !relativeTo ) {
            return;
        }

        if ( isOpen ) {
            positionToRelativeItem( wrapperRef.current, relativeTo );
            setTimeout( () => handleOpen( wrapperRef.current ), 100 );
        }

    }, [ isOpen, relativeTo, wrapperRef ] );

    return ReactDOM.createPortal(
        (
            <Openable ref={ wrapperRef }>
                <div className="placeholder"/>
                <div className="content">
                    { children }
                </div>
            </Openable>
        ),
        document.querySelector( '#root' ) as HTMLElement
    )
};

export default OpenableSection;
