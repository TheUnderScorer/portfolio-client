export const pushState = ( { validationCallback, state, url = '' }: PushStateParams ): void =>
{
    if ( window.history.state && validationCallback ) {

        if ( !validationCallback( window.history.state ) ) {
            return;
        }

    }

    window.history.pushState( state, '', url );
};

export const getState = <T>( key: string, def: T ): T =>
{
    if ( !window.history.state ) {
        return def;
    }

    return window.history.state.hasOwnProperty( key ) ?
        window.history.state[ key ] :
        def;
};

export const getStateFromEvent = ( event: PopStateEvent, key: string ): any =>
{
    if ( !event.state ) {
        return null;
    }

    return event.state.hasOwnProperty( key ) ? event.state[ key ] : null
};

export type PushStateParams = {
    state: any;
    url?: string;
    validationCallback?: ( state: any ) => boolean;
}
