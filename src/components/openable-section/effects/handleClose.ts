export default ( wrapper: HTMLDivElement, placeholder: HTMLElement ) => {

    placeholder.style.display = 'block';

    wrapper.classList.add( 'animated' );
    wrapper.classList.remove( 'with-bg' );
    wrapper.classList.remove( 'placeholder-hidden' );

    return [
        setTimeout( () => {
            wrapper.classList.remove( 'active' );
        }, 300 ),
        setTimeout( () => {
            wrapper.classList.remove( 'animated' );
            wrapper.removeAttribute( 'style' );
            placeholder.style.display = 'none';
        }, 1000 )
    ]

}
