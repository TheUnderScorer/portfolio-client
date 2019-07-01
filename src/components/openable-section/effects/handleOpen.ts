import { PositionAfter } from '../types/OpenableSectionProps';

export default ( wrapper: HTMLDivElement, placeholder: HTMLElement, positionAfter: PositionAfter = {
    top:  '0px',
    left: '0px'
} ) => {

    placeholder.style.display = 'none';

    wrapper.classList.add( 'animated' );
    wrapper.classList.add( 'placeholder-hidden' );

    wrapper.style.top = positionAfter.top.toString();
    wrapper.style.left = positionAfter.left.toString();
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';
    wrapper.style.margin = '0';
    wrapper.style.borderRadius = '0';

    return [
        setTimeout( () => {
            wrapper.classList.add( 'with-bg' );
        }, 600 ),
        setTimeout( () => {
            wrapper.classList.add( 'active' );
            wrapper.removeAttribute( 'style' );

        }, 1000 )
    ]

}
