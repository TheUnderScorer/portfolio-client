import * as React from 'react';
import { CSSProperties, useEffect, useState } from 'react';
import Props from './types/OpenableSectionProps';
import positionToRelativeItem from './effects/positionToRelativeItem';
import { Openable } from './styled';
import usePrevious from '../../hooks/usePrevious';
import handleOpen from './effects/handleOpen';
import { Actions } from './types/Actions';
import handleClose from './effects/handleClose';
import * as ReactDOM from 'react-dom';

const body = document.body;

const positionToRelativeBeforeOpen = positionToRelativeItem( 50 );
const positionToRelativeOnClose = positionToRelativeItem( 300 );

const OpenableSection = ( { children, isOpen = false, relativeTo, className = '', zIndex = 2, positionAfter, onOpen, positionTypeAfter = 'absolute', portalTarget }: Props ) =>
{
    const [ isChangingState, setIsChangingState ] = useState( false );
    const [ isActive, setActive ] = useState( false );
    const [ hasBg, setHasBg ] = useState( false );
    const [ wrapperStyle, setWrapperStyle ] = useState<CSSProperties>( {} );
    const [ placeholderStyles, setPlaceholderStyle ] = useState<CSSProperties>( {} );
    const [ placeholder, setPlaceholder ] = useState( '' );
    const [ currentAction, setCurrentAction ] = useState( '' );
    const [ animated, setAnimated ] = useState( false );

    const wasOpen = usePrevious( isOpen );

    useEffect( () =>
    {
        if ( isChangingState ) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }, [ isChangingState ] );

    useEffect( () =>
    {
        if ( currentAction === Actions.open ) {
            handleOpen(
                setWrapperStyle,
                wrapperStyle,
                setPlaceholderStyle,
                setPlaceholder,
                positionAfter,
                positionTypeAfter,
                setActive,
                setHasBg,
            ).then( () =>
            {
                setIsChangingState( false );

                if ( onOpen ) {
                    onOpen();
                }
            } );
        } else if ( currentAction === Actions.close ) {
            positionToRelativeOnClose(
                setWrapperStyle,
                setPlaceholderStyle,
                setPlaceholder,
                relativeTo
            ).then( () =>
            {
                setAnimated( false );
                setWrapperStyle( {} );
                setActive( false );
            } );
        }

    }, [ currentAction ] );

    useEffect( () =>
    {

        if ( isOpen && !wasOpen ) {

            // Let component know that we are about to open it
            setIsChangingState( true );

            // Disable animations before positioning
            setAnimated( false );

            positionToRelativeBeforeOpen(
                setWrapperStyle,
                setPlaceholderStyle,
                setPlaceholder,
                relativeTo
            ).then( () =>
            {
                setAnimated( true );
                setCurrentAction( Actions.open )
            } )

        } else if ( !isOpen && wasOpen ) {
            handleClose(
                setWrapperStyle,
                setPlaceholderStyle,
                setHasBg,
                relativeTo
            ).then( () =>
            {
                setPlaceholderStyle( {
                    display: 'none'
                } );

                setCurrentAction( Actions.close );
            } )
        }

    }, [ isOpen, wasOpen ] );

    const component = (
        <Openable animated={ animated } isActive={ isActive } hasBg={ hasBg } className={ className } style={ wrapperStyle } zIndex={ zIndex }>
            <div style={ placeholderStyles } className="placeholder" dangerouslySetInnerHTML={ { __html: placeholder } }/>
            <div className="content">
                { children }
            </div>
        </Openable>
    );

    if ( portalTarget ) {
        return ReactDOM.createPortal( component, portalTarget );
    }

    return component;
};

export default OpenableSection;
