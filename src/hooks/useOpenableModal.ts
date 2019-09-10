import { CSSProperties, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { removeItem } from '../utils/array';

export interface Result
{
    modalRef: MutableRefObject<HTMLDivElement | undefined>;
    setModalRef: ( modal: HTMLDivElement ) => any;
    modalStyles: CSSProperties;
    onModalOpen: () => any;
    modalClassList: string[];
    overlayStyles: CSSProperties;
    setModalLoaded: ( loaded: boolean ) => any;
    modalLoaded: boolean;
    onModalClose: () => any;
    didClose: boolean;
}

export interface Params
{
    relativeElement?: HTMLElement;
    defaultModalClasses?: string[];
    open?: boolean;
}

export default ( { relativeElement, defaultModalClasses = [], open = false }: Params ): Result =>
{
    const modalRef = useRef<HTMLDivElement>();
    const setModalRef = useCallback( ( modal: HTMLDivElement ) =>
    {
        modalRef.current = modal;
    }, [] );

    const [ modalStyles, setModalStyles ] = useState<CSSProperties>( {} );
    const [ overlayStyles, setOverlayStyles ] = useState<CSSProperties>( {} );
    const [ modalLoaded, setModalLoaded ] = useState( false );
    const [ isClosing, setIsClosing ] = useState( false );
    const [ didOpen, setDidOpen ] = useState( false );
    const [ didClose, setDidClose ] = useState( false );
    const [ modalClassList, setModalClasslist ] = useState( [ ...defaultModalClasses, 'hidden' ] );

    const positionToRelativeElement = useCallback( () =>
    {
        if ( !relativeElement ) {
            return;
        }

        const { top, left, width, height } = relativeElement.getBoundingClientRect();

        const newModalStyles: CSSProperties = {
            ...modalStyles,
            top:      `${ top }px`,
            left:     `${ left }px`,
            position: 'absolute',
            width:    `${ width }px`,
            height:   `${ height }px`
        };
        setModalStyles( newModalStyles );
    }, [ relativeElement ] );

    const onModalOpen = useCallback( () =>
    {
        if ( !relativeElement ) {
            return;
        }

        positionToRelativeElement();

        const newOverlayStyles: CSSProperties = {
            ...overlayStyles,
            background: 'none',
        };
        setOverlayStyles( newOverlayStyles );

        const modalClasses = removeItem( modalClassList, 'hidden' );
        modalClasses.push( 'active' );

        setModalClasslist( modalClasses );

        setDidOpen( true );
    }, [ relativeElement ] );

    const onModalClose = useCallback( () =>
    {
        if ( !relativeElement ) {
            return;
        }

        const modalClasses = removeItem( modalClassList, 'opened' );
        modalClasses.push( 'closing' );
        setModalClasslist( modalClasses );

        setIsClosing( true );
    }, [ relativeElement ] );

    useEffect( () =>
    {
        if ( !isClosing ) {
            return;
        }

        positionToRelativeElement();

        setTimeout( () =>
        {
            setIsClosing( false );
            setDidClose( true );
        }, 400 );
    }, [ isClosing ] );

    useEffect( () =>
    {
        if ( !open ) {
            return;
        }

        setDidClose( false );

        // Hide modal before aligning it into relative item
        modalClassList.push( 'hidden' );
        setModalClasslist( modalClassList );

        onModalOpen();
    }, [ open, onModalOpen ] );

    // Removes all defined modal styles after it has opened
    useEffect( () =>
    {
        if ( !didOpen || !modalLoaded ) {
            return;
        }

        const timeout = setTimeout( () =>
        {
            setModalStyles( {} );
            setDidOpen( false );
        }, 100 );

        return () =>
        {
            clearTimeout( timeout );
        };
    }, [ didOpen, modalLoaded ] );

    // Removes modal styles after it was initially opened
    useEffect( () =>
    {
        if ( !didOpen || !modalLoaded ) {
            return;
        }

        setTimeout( () =>
        {
            setOverlayStyles( {} );
            setModalClasslist( [
                ...modalClassList,
                'opened'
            ] )
        }, 400 );
    }, [ didOpen, modalLoaded ] );

    useEffect( () =>
    {
        if ( open ) {
            return;
        }

        const modalClasses = removeItem( modalClassList, 'active' );
        setModalClasslist( modalClasses );
    }, [ open ] );

    return {
        modalRef,
        setModalRef,
        modalStyles,
        onModalOpen,
        modalClassList,
        overlayStyles,
        setModalLoaded,
        modalLoaded,
        onModalClose,
        didClose
    }
}
