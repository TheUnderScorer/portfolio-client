import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactWrapper, IconContainer } from './styled/contact';
import { FaIconReversed } from '../styled/typography';
import { SetContactActive } from '../../types/actions/ContactActions';
import ContactInner from './ContactInner';
import { Tooltip } from '@material-ui/core';

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
            <Tooltip enterDelay={ 1000 } title={ !active ? '' : 'Click to close' }>
                <IconContainer active={ active } onClick={ toggleActive }>
                    { active ?
                        <FaIconReversed icon="times"/> :
                        <FaIconReversed icon="comment"/>
                    }
                </IconContainer>
            </Tooltip>
            <ContactInner/>
        </ContactWrapper>
    );
};

export default Contact;
