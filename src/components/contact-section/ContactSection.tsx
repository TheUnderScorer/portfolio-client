import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionSubtitle, SectionTitle } from '../styled/typography';
import texts from '../../pages/data/texts';
import { Button } from '../styled/buttons';

const ContactSection = () =>
{
    return (
        <HomeSection isCentered={ true } id={ texts.contact.id }>
            <SectionTitle hasSubtitle={ true }>
                { texts.contact.sectionTitle }
            </SectionTitle>
            <SectionSubtitle>
                { texts.contact.subTitle }
            </SectionSubtitle>
            <Button transparent={ true } flat={ true } round={ true }>
                Start conversation
            </Button>
        </HomeSection>
    )
};

export default ContactSection;
