export const pushState = <T>( { validationCallback, state, url = '' }: PushStateParams<T> ): void =>
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

export const getStateFromEvent = <T>( event: PopStateEvent, key: string ): T | null =>
{
    if ( !event.state ) {
        return null;
    }

    return event.state.hasOwnProperty( key ) ? event.state[ key ] : null
};

export type PushStateParams<T = any> = {
    state: T;
    url?: string;
    validationCallback?: ( state: any ) => boolean;
}
