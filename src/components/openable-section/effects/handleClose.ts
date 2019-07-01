import { SetCssProperties } from '../../../types/common/SetCssProperties';

export default (
    setWrapperStyles: SetCssProperties,
    setPlaceholderStyles: SetCssProperties,
    setHasBg: ( hasBg: boolean ) => any,
    relativeTo: HTMLElement,
) => {

    return new Promise( resolve => {

        const styles = getComputedStyle( relativeTo );

        setPlaceholderStyles( {
            display: 'block'
        } );

        setHasBg( false );

        setWrapperStyles( {
            borderRadius:    styles.borderRadius as string,
            backgroundColor: styles.backgroundColor as string
        } );

        setTimeout( () => {
            resolve();
        }, 300 );
    } )

}
