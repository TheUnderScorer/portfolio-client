import * as React from 'react';
import Loader from '../Loader';
import { mountWithStoreAndApollo } from '../../../tests/renderer';
import { LoaderContainer } from '../styled';

describe( 'Loader component', () => {

    const initialState = {
        theme: {
            mode: 'black'
        }
    };

    it( 'Renders without crashing', () => {
        mountWithStoreAndApollo( <Loader/>, initialState );
    } );

    it( 'Is visible if `active` props is set to true', () => {
        const { component } = mountWithStoreAndApollo( <Loader active={ true }/>, initialState );

        const svg = component.find( LoaderContainer );
        const styles = getComputedStyle( svg.at( 0 ).getDOMNode() );

        expect( styles.opacity ).toEqual( '1' );
        expect( styles.visibility ).toEqual( 'visible' );
    } );

} );
