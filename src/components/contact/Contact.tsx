import * as React from 'react';
import { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactWrapper, IconContainer } from './styled/contact';
import { FaIconReversed } from '../styled/typography';
import { SetContactActive } from '../../types/actions/ContactActions';
import ContactInner from './ContactInner';

const Contact = () =>
{
    const dispatch = useDispatch();

    const active = useSelector<HomeStore, any>( store => store.contact.active );

    const toggleActive = useCallback( () =>
    {
        const action: SetContactActive = {
            type:    'SetContactActive',
            payload: !active
        };

        dispatch( action );
    }, [ active, dispatch ] );

    return (
        <ContactWrapper>
            <IconContainer active={ active } onClick={ toggleActive } ripple={ true }>
                { active ?
                    <FaIconReversed icon="times"/> :
                    <FaIconReversed icon="comment"/>
                }
            </IconContainer>
            <ContactInner/>
        </ContactWrapper>
    );
};

export default connect()( Contact );
