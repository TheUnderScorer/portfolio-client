import { SetCssProperties } from '../../../types/common/SetCssProperties';

export default ( animationTimeout: number ) => ( setWrapperStyles: SetCssProperties, setPlaceholderStyles: SetCssProperties, setPlaceholder: ( placeholder: string ) => any, relativeItem: HTMLElement ) =>
{
    return new Promise( ( resolve ) =>
    {
        const position = relativeItem.getBoundingClientRect();

        const styles = getComputedStyle( relativeItem );

        const size = {
            width:  window.getComputedStyle( relativeItem ).width,
            height: window.getComputedStyle( relativeItem ).height
        };

        // Initially hide placeholder
        setPlaceholderStyles( {
            display: 'none',
        } );

        // Set placeholder content basing on relative item
        setPlaceholder( relativeItem.outerHTML );

        // Show placeholder
        setPlaceholderStyles( {
            display: styles.display as string,
        } );

        // Position and mimic wrapper basing on relative item
        setWrapperStyles( {
            borderRadius:    styles.borderRadius as string,
            backgroundColor: styles.backgroundColor as string,
            position:        'absolute',
            top:             position.top + 'px',
            left:            position.left + 'px',
            height:          size.height as string,
            width:           size.width as string,
            visibility:      'visible',
            opacity:         1,
            display:         'block',
        } );

        setTimeout( () => resolve(), animationTimeout );
    } );
}
