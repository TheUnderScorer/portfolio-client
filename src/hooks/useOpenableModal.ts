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

    const [ didOpen, setDidOpen ] = useState( false );
    const [ modalClassList, setModalClasslist ] = useState( [ ...defaultModalClasses, 'hidden' ] );

    const onModalOpen = useCallback( () =>
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

    useEffect( () =>
    {
        if ( !open ) {
            return;
        }

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

    return {
        modalRef,
        setModalRef,
        modalStyles,
        onModalOpen,
        modalClassList,
        overlayStyles,
        setModalLoaded,
        modalLoaded
    }
}
