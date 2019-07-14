import * as React from 'react';
import { useRef } from 'react';
import { animated, useSprings } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import SliderProps from './types/SliderProps';
import { clamp } from 'lodash';
import { SliderContainer } from '../projects/styled';

const Slider = ( { children }: SliderProps ) =>
{
    const index = useRef( 0 );

    const [ props, set ] = useSprings( children.length, i => ( {
        x:       i * window.innerWidth,
        sc:      1,
        display: 'block'
    } ) );

    const bind = useGesture( ( { down, delta: [ xDelta ], direction: [ xDir ], distance, cancel } ) =>
    {
        if ( down && distance > window.innerWidth / 2 && cancel ) {
            index.current = clamp( index.current + ( xDir > 0 ? -1 : 1 ), 0, children.length - 1 );

            cancel();
        }
        // @ts-ignore
        set( ( i ) =>
        {
            if ( i < index.current - 1 || i > index.current + 1 ) {
                return { display: 'none' }
            }
            const x = ( i - index.current ) * window.innerWidth + ( down ? xDelta : 0 );
            const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
            return { x, sc, display: 'block' }
        } )
    } );

    return (
        <SliderContainer>
            { props.map( ( { x, display, sc }, i ) => (
                <animated.div { ...bind() } key={ i } style={ {
                    display,
                    transform: x.interpolate( x => `translate3d(${ x }px,0,0)` )
                } }>
                    <animated.div style={ {
                        transform: sc.interpolate( s => `scale(${ s })` ),
                    } }/>
                </animated.div>
            ) ) }
        </SliderContainer>
    )
};

export default Slider;
