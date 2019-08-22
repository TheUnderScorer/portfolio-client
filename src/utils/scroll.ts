const scrollTopOffset = 70;

export const smoothScroll = ( elementY: number, duration: number, element?: HTMLElement ): Promise<void> =>
{

    return new Promise( resolve =>
    {

        const startingY = element ? element.scrollTop - scrollTopOffset : window.pageYOffset;
        const diff = elementY - startingY;
        let start: number;

        window.requestAnimationFrame( function step( timestamp )
        {
            if ( !start ) {
                start = timestamp;
            }
            // Elapsed milliseconds since start of scrolling.
            const time = timestamp - start;
            // Get percent of completion in range [0, 1].
            const percent = Math.min( time / duration, 1 );

            if ( element && element.scrollTo ) {
                element.scrollTo( 0, startingY + diff * percent );
            } else {
                window.scrollTo( 0, startingY + diff * percent );
            }

            // Proceed with animation as long as we wanted it to.
            if ( time < duration ) {
                window.requestAnimationFrame( step );
            } else {
                resolve();
            }
        } )

    } );

};
