import * as React from 'react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Props from './types/OpenableSectionProps';
import handleOpen from './effects/handleOpen';
import positionToRelativeItem from './effects/positionToRelativeItem';
import { Openable } from './styled';
import usePrevious from '../../hooks/usePrevious';
import handleClose from './effects/handleClose';
import { removeItems } from '../../utils/array';

const body = document.body;

const OpenableSection = ( { children, isOpen = false, relativeTo, onOpen, className = '', positionAfter, zIndex = 2 }: Props ) => {

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const placeholderRef = useRef() as MutableRefObject<HTMLDivElement>;

    const [ classList, setClassList ] = useState( className.split( ' ' ) );
    const [ isOpening, setIsOpening ] = useState( false );

    const wasOpen = usePrevious( isOpen );

    useEffect( () => {

        if ( isOpening ) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }

    }, [ isOpening ] );

    useEffect( () => {

        if ( !wrapperRef.current || !relativeTo || !placeholderRef.current ) {
            return;
        }

        if ( isOpen && !wasOpen ) {
            setIsOpening( true );
            positionToRelativeItem( wrapperRef.current, placeholderRef.current, relativeTo );

            classList.push( 'animated' );
            setClassList( classList );

            setTimeout( () => {
                handleOpen( wrapperRef.current, placeholderRef.current, positionAfter );

                setTimeout( () => {
                    setClassList( [ ...classList, 'with-bg', 'placeholder-hidden' ] );
                }, 600 );

                setTimeout( () => {
                    classList.push( 'active' );
                    setIsOpening( false );

                    setClassList( classList );

                    if ( onOpen ) {
                        onOpen();
                    }
                }, 1000 )

            }, 100 )

        } else if ( !isOpen && wasOpen ) {

            setTimeout( () => {
                handleClose( wrapperRef.current, placeholderRef.current, relativeTo );
                positionToRelativeItem( wrapperRef.current, placeholderRef.current, relativeTo );
            }, 300 );

            setTimeout( () => {
                setClassList(
                    removeItems( classList, [ 'active', 'with-bg', 'placeholder-hidden', 'animated' ] )
                );
            }, 1000 );

        }

    }, [ isOpen, relativeTo, wrapperRef, placeholderRef, onOpen, wasOpen, positionAfter ] );

    return (
        <Openable zIndex={ zIndex } className={ classList.join( ' ' ) } ref={ wrapperRef }>
            <div ref={ placeholderRef } className="placeholder"/>
            <div className="content">
                { children }
            </div>
        </Openable>
    )
};

export default OpenableSection;
