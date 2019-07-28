import { PositionAfter } from '../types/OpenableSectionProps';
import { SetCssProperties } from '../../../types/common/SetCssProperties';
import { CSSProperties } from 'react';
import { PositionProperty } from 'csstype';

export default (
    setWrapperStyles: SetCssProperties,
    wrapperStyles: CSSProperties,
    setPlaceholderStyles: SetCssProperties,
    setPlaceholder: ( placeholder: string ) => any,
    positionAfter: PositionAfter = { top: 0, left: 0 },
    positionTypeAfter: PositionProperty,
    setIsActive: ( active: boolean ) => any,
    setHasBg: ( hasBg: boolean ) => any,
) =>
{
    return new Promise( ( resolve ) =>
    {
        // Hide placeholder
        setPlaceholderStyles( {
            display: 'none'
        } );

        // Position wrapper
        setWrapperStyles( {
            ...wrapperStyles,
            position:     positionTypeAfter,
            top:          positionAfter.top.toString(),
            left:         positionAfter.left.toString(),
            height:       '100%',
            width:        '100%',
            margin:       '0',
            borderRadius: '0',
        } );

        setTimeout( () =>
        {
            setHasBg( true );
            setPlaceholder( '' );
        }, 600 );
        setTimeout( () =>
        {
            setIsActive( true );

            resolve();
        }, 900 );
    } );
}
