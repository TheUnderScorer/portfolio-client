import * as React from 'react';
import { useEffect, useState } from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import HorizontalList from '../horizontal-list/HorizontalList';
import helpItems from '../../pages/data/helpItems';
import { useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import styled from 'styled-components';

const Section = styled( HomeSection )`
     padding-bottom: 0;
`;

const HowCanIHelp = () =>
{
    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );

    const [ loaded, setLoaded ] = useState( false );

    useEffect( () =>
    {
        const timeout = setTimeout( () =>
        {
            setLoaded( didInnerOpen );
        }, 300 );

        return () =>
        {
            clearTimeout( timeout );
        }

    }, [ didInnerOpen ] );

    return (
        <Section id="how_can_i_help" isCentered={ true }>
            <div>
                <SectionTitle underlined={ true }>
                    How can I help?
                </SectionTitle>
                <HorizontalList lineHeight="735px" loaded={ loaded } items={ helpItems }/>
            </div>

        </Section>
    )
};

export default HowCanIHelp;
