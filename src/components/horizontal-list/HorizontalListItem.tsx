import * as React from 'react';
import { ReadMoreButton, SideSection, SideSectionDetails, SideSectionIconContainer, SideSectionTitle } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '../styled/typography';
import Props from './types/HorizontalListItemProps';

const HorizontalListItem = ( { isActive, title, icon, children, onButtonClick, detailsHeight, marginTop }: Props ) => {
    return (
        <SideSection className="side-section" open={ isActive } marginTop={ marginTop }>
            <div>
                <SideSectionIconContainer className="icon-container">
                    { icon }
                </SideSectionIconContainer>
                <SideSectionTitle>
                    { title }
                </SideSectionTitle>
                <SideSectionDetails height={ detailsHeight } className="section-details">
                    { children }
                </SideSectionDetails>
                <ReadMoreButton flat={ true } withIcon={ true } onClick={ onButtonClick }>
                    <FontAwesomeIcon icon="plus"/>
                    <Text>
                        { isActive ? 'Close' : 'Read More' }
                    </Text>
                </ReadMoreButton>
            </div>
        </SideSection>
    )
};

export default HorizontalListItem;
