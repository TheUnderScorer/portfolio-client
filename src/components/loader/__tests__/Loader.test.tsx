import * as React from 'react';
import Loader from '../Loader';
import { mountWithStore } from '../../../tests/utils/renderer';

describe( 'Loader component', () => {

    const initialState = {
        theme: {
            mode: 'black'
        }
    };

    it( 'Renders without crashing', () => {
        mountWithStore( <Loader/>, initialState );
    } );

    it( 'Is visible if `active` props is set to true', () => {
        const { component } = mountWithStore( <Loader active={ true }/>, initialState );

        const svg = component.find( 'svg' );
        const styles = getComputedStyle( svg.at( 0 ).getDOMNode() );

        expect( styles.opacity ).toEqual( '1' );
        expect( styles.visibility ).toEqual( 'visible' );
    } );

} );
