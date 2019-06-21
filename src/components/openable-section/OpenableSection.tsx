import * as React from 'react';
import { MutableRefObject, useEffect, useRef } from 'react';
import Props from './types/OpenableSectionProps';
import * as ReactDOM from 'react-dom';
import handleOpen from './effects/handleOpen';
import positionToRelativeItem from './effects/positionToRelativeItem';
import { Openable } from './styled';

const OpenableSection = ( { children, isOpen = false, relativeTo, onOpen }: Props ) => {

    const wrapperRef: MutableRefObject<HTMLDivElement | any> = useRef();
    const placeholderRef: MutableRefObject<HTMLDivElement | any> = useRef();

    useEffect( () => {

        if ( !wrapperRef.current || !relativeTo || !placeholderRef.current ) {
            return;
        }

        if ( isOpen ) {
            positionToRelativeItem( wrapperRef.current, placeholderRef.current, relativeTo );
            setTimeout( () => {

                handleOpen( wrapperRef.current, placeholderRef.current, onOpen );

            }, 100 );
        }

    }, [ isOpen, relativeTo, wrapperRef, placeholderRef, onOpen ] );

    return ReactDOM.createPortal(
        (
            <Openable ref={ wrapperRef }>
                <div ref={ placeholderRef } className="placeholder"/>
                <div className="content">
                    { children }
                </div>
            </Openable>
        ),
        document.querySelector( '#root' ) as HTMLElement
    )
};

export default OpenableSection;
