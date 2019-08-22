import { CSSProperties, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { removeItem } from '../utils/array';

export interface Result
{
    modalRef: MutableRefObject<HTMLDivElement | undefined>;
    setModalRef: ( modal: HTMLDivElement ) => any;
    modalStyles: CSSProperties;
    onModalOpen: () => any;
    modalClassList: string[];
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

    useEffect( () =>
    {
        if ( !didOpen ) {
            return;
        }

        const timeout = setTimeout( () =>
        {
            setModalStyles( {} );
            setDidOpen( false );
            setModalClasslist( [
                ...modalClassList,
                'opened'
            ] )
        }, 100 );

        return () => clearTimeout( timeout );
    }, [ didOpen ] );

    return {
        modalRef,
        setModalRef,
        modalStyles,
        onModalOpen,
        modalClassList
    }
}
