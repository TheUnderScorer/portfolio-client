import { useState } from 'react';

export type UseFilteredArrayResult<T> = [ T[], ( items: T[] ) => any ];

export default <ItemType>(
    initialState: ItemType[] = [],
    callbackfn?: ( value: ItemType, index: number, array: ItemType[] ) => boolean,
): UseFilteredArrayResult<ItemType> =>
{
    const [ items, setStateItems ] = useState<ItemType[]>( initialState );

    const callback = callbackfn ? callbackfn : ( ( item: ItemType ) => item );

    const setItems = ( data: ItemType[] ) =>
    {
        setStateItems( data.filter( callback ) );
    };

    return [ items, setItems ];

}
