import * as React from 'react';
import { ReadMoreButton, SideSection, SideSectionDetails, SideSectionIconContainer, SideSectionTitle } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Props from './types/HorizontalListItemProps';

const HorizontalListItem = ( { isActive, title, icon, children, onButtonClick, detailsHeight, marginTop, loaded = true }: Props ) => {
    return (
        <SideSection className="side-section" loaded={ loaded } open={ isActive } marginTop={ marginTop }>
            <div>
                <SideSectionIconContainer onClick={ onButtonClick } className="icon-container">
                    { icon }
                </SideSectionIconContainer>
                <SideSectionTitle>
                    { title }
                </SideSectionTitle>
                <SideSectionDetails height={ detailsHeight } className="section-details">
                    { children }
                </SideSectionDetails>
                <ReadMoreButton onClick={ onButtonClick }>
                    <FontAwesomeIcon icon="plus"/>
                    { isActive ? 'Close' : 'Read More' }
                </ReadMoreButton>
            </div>
        </SideSection>
    )
};

export default HorizontalListItem;
