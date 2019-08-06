import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import OpenableSection from '../OpenableSection';
import { act } from 'react-dom/test-utils';

describe( 'OpenableSection component', () =>
{

    let relativeItem: HTMLElement;

    beforeEach( () =>
    {
        relativeItem = document.createElement( 'div' );
    } );

    it( 'Renders without crashing', () =>
    {
        mount(
            <OpenableSection relativeTo={ relativeItem }>
                Test section
            </OpenableSection>
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

        act( () =>
        {
            component = mount(
                <OpenableSection isOpen={ true } onOpen={ onOpen } relativeTo={ relativeItem }>
                    Test content
                </OpenableSection>
            );
        } );
    } );

} );
