export const removeItems = <T>( arr: T[], toRemove: T[] ): T[] =>
{
    return arr.filter( item => !toRemove.includes( item ) );
};

export const last = <T>( arr: T[] ): T =>
{
    return arr[ arr.length - 1 ];
};
