import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionTitle } from '../styled/typography';
import HorizontalList from '../horizontal-list/HorizontalList';
import helpItems from '../../pages/data/helpItems';

const HowCanIHelp = () => {
    return (
        <HomeSection centered={ true }>
            <div>
                <SectionTitle>
                    How can I help?
                </SectionTitle>
                <HorizontalList items={ helpItems }/>
            </div>

        </HomeSection>
    )
};

export default HowCanIHelp;
