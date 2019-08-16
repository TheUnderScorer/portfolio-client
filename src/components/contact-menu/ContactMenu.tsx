import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MenuIcon, Text, WhiteFaIcon } from '../styled/typography';
import ContactMenuProps, { ContactMenuItems } from './types/ContactMenuProps';
import { ContactTypes } from '../../types/reducers/ContactReducer';
import { useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';

const ContactMenu = ( { onMenuClick, conversation }: ContactMenuProps ) =>
{
    const contactType = useSelector( ( store: HomeStore ) => store.contact.type );

    const [ menuOpen, setMenuOpen ] = useState( false );
    const toggleMenu = useCallback( () =>
    {
        setMenuOpen( !menuOpen );
    }, [ menuOpen, setMenuOpen ] );

    const menuIconRef = useRef() as MutableRefObject<HTMLElement | null>;
    const setMenuRef = ( ref: HTMLElement | null ) => menuIconRef.current = ref;

    const handleMenuClick = useCallback( ( menu: ContactTypes | ContactMenuItems ) => () =>
    {
        setMenuOpen( false );

        onMenuClick( menu );
    }, [ onMenuClick ] );

    return (
        <>
            <IconButton
                href="#"
                ref={ setMenuRef }
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={ toggleMenu }
            >
                <WhiteFaIcon icon="ellipsis-v"/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={ menuIconRef.current }
                keepMounted
                open={ menuOpen }
                onClose={ toggleMenu }
            >
                <MenuItem button onClick={ handleMenuClick( ContactTypes.EditProfile ) }>
                    <MenuIcon margin="normal" icon="user-cog"/>
                    <Text>
                        Edit my profile
                    </Text>
                </MenuItem>
                { !!conversation && conversation.messages.length > 0 && contactType === ContactTypes.Conversation &&
                  <MenuItem button onClick={ handleMenuClick( ContactMenuItems.CloseConversation ) }>
                      <MenuIcon margin="normal" icon="lock"/>
                      <Text>
                          Close conversation
                      </Text>
                  </MenuItem>
                }
            </Menu>
        </>
    )
};

export default ContactMenu;
