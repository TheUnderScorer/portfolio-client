export const removeItems = <T>( arr: T[], toRemove: T[] ): T[] => {
    return arr.filter( item => !toRemove.includes( item ) );
};
