export const pushState = ( { validationCallback, state, url = '' }: PushStateParams ): void =>
{
    if ( window.history.state && validationCallback ) {

        if ( !validationCallback( window.history.state ) ) {
            return;
        }

    }

    window.history.pushState( state, '', url );
};

export const getState = ( key: string ): any =>
{
    if ( !window.history.state ) {
        return null;
    }

    return window.history.state[ key ] ? window.history.state[ key ] : null
};

export const getStateFromEvent = ( event: PopStateEvent, key: string ): any =>
{
    if ( !event.state ) {
        return null;
    }

    return event.state[ key ] ? event.state[ key ] : null
};

export type PushStateParams = {
    state: any;
    url?: string;
    validationCallback?: ( state: any ) => boolean;
}
