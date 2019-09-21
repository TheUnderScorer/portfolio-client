import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import OpenableSection from '../OpenableSection';
import { act } from 'react-dom/test-utils';
import { mountWithStoreAndApollo } from '../../../tests/renderer';

describe( 'OpenableSection component', () =>
{
    jest.setTimeout( 10000 );

    let relativeItem: HTMLElement;

    beforeEach( () =>
    {
        relativeItem = document.createElement( 'div' );
    } );

    it( 'Renders without crashing', () =>
    {
        mountWithStoreAndApollo(
            <OpenableSection relativeTo={ relativeItem }>
                Test section
            </OpenableSection>,
        )
    } );

    it( 'Content is visible when isOpen is set to true', async ( done ) =>
    {
        let component: ReactWrapper;

        const onOpen = () =>
        {
            const content = component.find( '.content' );
            const styles = getComputedStyle( content.getDOMNode() );

            expect( styles.opacity ).toEqual( '1' );

            done();
        };

        await act( async () =>
        {
            component = await mountWithStoreAndApollo(
                <OpenableSection isOpen={ true } onOpen={ onOpen } relativeTo={ relativeItem }>
                    Test content
                </OpenableSection>
            ).component;
        } );
    } );

} );
