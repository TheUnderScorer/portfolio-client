import * as React from 'react';
import { useCallback } from 'react';
import { HomeSection } from '../styled/wrappers';
import { SectionSubtitle, SectionTitle } from '../styled/typography';
import texts from '../../pages/data/texts';
import { Button } from '../styled/buttons';
import { useDispatch } from 'react-redux';
import { SetContactActive } from '../../types/actions/ContactActions';

const ContactSection = () =>
{
    const dispatch = useDispatch();

    const openContact = useCallback( () =>
    {
        dispatch<SetContactActive>( {
            type:    'SetContactActive',
            payload: true
        } )
    }, [ dispatch ] );

    return (
        <HomeSection isCentered={ true } id={ texts.contact.id }>
            <SectionTitle hasSubtitle={ true }>
                { texts.contact.sectionTitle }
            </SectionTitle>
            <SectionSubtitle>
                { texts.contact.subTitle }
            </SectionSubtitle>
            <Button onClick={ openContact } transparent={ true } flat={ true } isRound={ true }>
                Start conversation
            </Button>
        </HomeSection>
    )
};

export default ContactSection;
