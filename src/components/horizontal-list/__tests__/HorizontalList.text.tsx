import * as React from 'react';
import HorizontalListItemData from '../types/HorizontalListItemData';
import * as faker from 'faker';
import HorizontalList from '../HorizontalList';
import HorizontalListItem from '../HorizontalListItem';
import { LeftSide, RightSide, SideSectionIconContainer } from '../styled';
import '../../../fontAwesome';
import { mountWithStoreAndApollo } from '../../../tests/renderer';

describe( 'HorizontalList component', () =>
{

    const items: HorizontalListItemData[] = [
        {
            title:         faker.random.word(),
            icon:          <i/>,
            content:       faker.random.words( 20 ),
            detailsHeight: '500px',
            position:      'left',
            name:          faker.random.word()
        },
        {
            title:         faker.random.word(),
            icon:          <i/>,
            content:       faker.random.words( 20 ),
            detailsHeight: '600px',
            position:      'right',
            name:          faker.random.word()
        }
    ];

    const mountComponent = () => mountWithStoreAndApollo(
        <HorizontalList items={ items } lineHeight="500px"/>,
        {}
    );

    it( 'Renders without crashing', () =>
    {
        mountComponent();
    } );

    it( 'Should render items basing on their positions', () =>
    {
        const { component } = mountComponent();

        const leftSide = component.find( LeftSide );
        const rightSide = component.find( RightSide );

        expect( leftSide.find( HorizontalListItem ).at( 0 ).props().title ).toEqual( items[ 0 ].title );
        expect( rightSide.find( HorizontalListItem ).at( 0 ).props().title ).toEqual( items[ 1 ].title );
    } );

    it( 'Clicking item toggles it as active in state', () =>
    {
        const { component } = mountComponent();
        const secondItem = component.find( HorizontalListItem ).at( 1 );

        secondItem.find( SideSectionIconContainer ).simulate( 'click' );

        expect( component.find( HorizontalListItem ).at( 1 ).props().isActive ).toBeTruthy();
    } );

} );
