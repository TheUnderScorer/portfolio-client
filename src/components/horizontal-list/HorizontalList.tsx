import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { HelpingListWrapper, LeftSide, Line, RightSide } from './styled';
import HorizontalListItem from './HorizontalListItem';
import HorizontalListProps from './types/HorizontalListProps';
import HorizontalListItemData from './types/HorizontalListItemData';

const HorizontalList = ( { items }: HorizontalListProps ) => {

    const [ activeSection, setActiveSection ] = useState( '' );

    const [ leftItems, setLeftItems ] = useState( [] as HorizontalListItemData[] );
    const [ rightItems, setRightItems ] = useState( [] as HorizontalListItemData[] );

    useEffect( () => {

        setLeftItems(
            items.filter( item => item.position === 'left' )
        );

        setRightItems(
            items.filter( item => item.position === 'right' )
        )

    }, [ items ] );

    const toggleSection = useCallback( ( section: string ) => () => {

        section === activeSection ?
            setActiveSection( '' ) :
            setActiveSection( section );

    }, [ activeSection ] );

    return (
        <HelpingListWrapper>
            <LeftSide>
                { leftItems.map( ( item, index ) =>
                    (
                        <HorizontalListItem
                            key={ index }
                            title={ item.title }
                            icon={ item.icon }
                            onButtonClick={ toggleSection( item.name ) }
                            detailsHeight={ item.detailsHeight }
                            isActive={ activeSection === item.name }
                        >
                            { item.content }
                        </HorizontalListItem>
                    )
                ) }
            </LeftSide>
            <Line/>
            <RightSide>
                { rightItems.map( ( item, index ) =>
                    (
                        <HorizontalListItem
                            key={ index }
                            marginTop={ index === 0 ? '40px' : '0' }
                            title={ item.title }
                            icon={ item.icon }
                            onButtonClick={ toggleSection( item.name ) }
                            detailsHeight={ item.detailsHeight }
                            isActive={ activeSection === item.name }
                        >
                            { item.content }
                        </HorizontalListItem>
                    )
                ) }
            </RightSide>
        </HelpingListWrapper>
    )
};

export default HorizontalList;
