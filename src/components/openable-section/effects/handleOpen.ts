export default ( wrapper: HTMLDivElement, placeholder: HTMLElement, onOpen?: () => any ) => {

    placeholder.style.display = 'none';

    wrapper.classList.add( 'animated' );
    wrapper.classList.add( 'placeholder-hidden' );

    wrapper.style.top = '0px';
    wrapper.style.left = '0px';
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

            if ( onOpen ) {
                onOpen();
            }
        }, 1000 )
    ]

}
