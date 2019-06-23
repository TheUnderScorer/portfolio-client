import * as React from 'react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Props from './types/OpenableSectionProps';
import handleOpen from './effects/handleOpen';
import positionToRelativeItem from './effects/positionToRelativeItem';
import { Openable } from './styled';
import usePrevious from '../../hooks/usePrevious';
import handleClose from './effects/handleClose';
import { removeItems } from '../../utils/array';

const OpenableSection = ( { children, isOpen = false, relativeTo, onOpen, className = '' }: Props ) => {

    const wrapperRef: MutableRefObject<HTMLDivElement | any> = useRef();
    const placeholderRef: MutableRefObject<HTMLDivElement | any> = useRef();

    const [ classList, setClassList ] = useState( className.split( ' ' ) );

    const wasOpen = usePrevious( isOpen );

    useEffect( () => {

        let timeouts: number[] = [];

        if ( !wrapperRef.current || !relativeTo || !placeholderRef.current ) {
            return;
        }

        if ( isOpen && !wasOpen ) {
            positionToRelativeItem( wrapperRef.current, placeholderRef.current, relativeTo );

            classList.push( 'animated' );
            setClassList( classList );

            timeouts.push(
                setTimeout( () => {
                    const openTimeouts = handleOpen( wrapperRef.current, placeholderRef.current );

                    timeouts.concat( openTimeouts );

                    timeouts.push(
                        setTimeout( () => {
                            classList.push( 'with-bg' );
                            classList.push( 'placeholder-hidden' );

                            setClassList( classList );
                        }, 600 )
                    );

                    timeouts.push(
                        setTimeout( () => {
                            classList.push( 'active' );

                            setClassList( classList );

                            if ( onOpen ) {
                                onOpen();
                            }
                        }, 1000 )
                    );

                }, 100 )
            );

        } else if ( !isOpen && wasOpen ) {

            timeouts.push(
                setTimeout( () => {

                    const closeTimeouts = handleClose( wrapperRef.current, placeholderRef.current );
                    positionToRelativeItem( wrapperRef.current, placeholderRef.current, relativeTo );

                    timeouts.concat( closeTimeouts );

                    timeouts.push( setTimeout( () => {
                        setClassList(
                            removeItems( classList, [ 'active', 'with-bg', 'placeholder-hidden', 'animated' ] )
                        );
                    }, 1000 ) );

                }, 300 )
            );

        }

        return () => {
            timeouts.forEach( timeout => clearTimeout( timeout ) );
        }

    }, [ isOpen, relativeTo, wrapperRef, placeholderRef, onOpen, wasOpen, classList ] );

    return (
        <Openable className={ classList.join( ' ' ) } ref={ wrapperRef }>
            <div ref={ placeholderRef } className="placeholder"/>
            <div className="content">
                { children }
            </div>
        </Openable>
    )
};

export default OpenableSection;
