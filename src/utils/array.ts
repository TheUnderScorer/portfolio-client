export const removeItems = <T>( arr: T[], toRemove: T[] ): T[] =>
{
    return arr.filter( item => !toRemove.includes( item ) );
};

export const last = <T>( arr: T[] ): T =>
{
    return arr[ arr.length - 1 ];
};

export const removeItem = <T>( arr: T[], value: T ): T[] =>
{
    while ( arr.indexOf( value ) > -1 ) {
        const index = arr.indexOf( value );

        arr.splice( index, 1 );
    }

    return arr;
};
