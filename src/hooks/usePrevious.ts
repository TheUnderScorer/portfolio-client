import { MutableRefObject, useEffect, useRef } from 'react';

export default <T>( value: T ): T => {

    const ref: MutableRefObject<T | any> = useRef();

    useEffect( () => {
        ref.current = value;
    }, [ value ] );

    return ref.current;

}
