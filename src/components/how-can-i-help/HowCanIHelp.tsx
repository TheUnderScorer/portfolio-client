import * as React from 'react';
import { useEffect, useState } from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import HorizontalList from '../horizontal-list/HorizontalList';
import helpItems from '../../pages/data/helpItems';
import { useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';

const HowCanIHelp = () => {

    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );

    const [ loaded, setLoaded ] = useState( false );

    useEffect( () => {

        const timeout = setTimeout( () => {
            setLoaded( didInnerOpen );
        }, 300 );

        return () => {
            clearTimeout( timeout );
        }

    }, [ didInnerOpen ] );

    return (
        <HomeSection centered={ true }>
            <div>
                <SectionTitle underlined={ true }>
                    How can I help?
                </SectionTitle>
                <HorizontalList loaded={ loaded } items={ helpItems }/>
            </div>

        </HomeSection>
    )
};

export default HowCanIHelp;
