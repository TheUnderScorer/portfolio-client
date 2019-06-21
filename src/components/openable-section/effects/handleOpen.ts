export default ( wrapper: HTMLDivElement ) => {

    wrapper.classList.add( 'animated' );

    wrapper.style.top = '0px';
    wrapper.style.left = '0px';
    wrapper.style.height = '100%';
    wrapper.style.width = '100%';
    wrapper.style.margin = '0';
    wrapper.style.borderRadius = '0';

    wrapper.classList.add( 'active' );

    setTimeout( () => {
        wrapper.classList.add( 'with-bg' );
    }, 1000 );

}
