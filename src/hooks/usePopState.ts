import { useEffect } from 'react';

export default ( callback: PopStateCallback, dependencies: any[] = [] ) =>
{
    useEffect( () =>
    {
        window.addEventListener( 'popstate', callback );

        return () => window.removeEventListener( 'popstate', callback );
    }, dependencies );
}

export type PopStateCallback = ( event: PopStateEvent ) => any;
