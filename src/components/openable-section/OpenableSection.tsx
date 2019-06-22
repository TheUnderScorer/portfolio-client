import * as React from 'react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Props from './types/OpenableSectionProps';
import handleOpen from './effects/handleOpen';
import positionToRelativeItem from './effects/positionToRelativeItem';
import { Openable } from './styled';
import usePrevious from '../../hooks/usePrevious';

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
                        }, 1000 )
                    );

                }, 100 )
            );

            return () => {
                timeouts.forEach( timeout => clearTimeout( timeout ) );
            }
        }

    }, [ isOpen, relativeTo, wrapperRef, placeholderRef, onOpen, wasOpen, classList ] );

    console.log( { classList } );

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
