import * as React from 'react';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MenuIcon, Text, WhiteFaIcon } from '../styled/typography';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import ContactMenuProps from './types/ContactMenuProps';
import { ContactTypes } from '../../types/reducers/ContactReducer';

const ContactMenu = ( { onMenuClick }: ContactMenuProps ) =>
{
    const [ menuOpen, setMenuOpen ] = useState( false );
    const toggleMenu = useCallback( () =>
    {
        setMenuOpen( !menuOpen );
    }, [ menuOpen, setMenuOpen ] );

    const menuIconRef = useRef() as MutableRefObject<HTMLElement | null>;
    const setMenuRef = ( ref: HTMLElement | null ) => menuIconRef.current = ref;

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
                <MenuItem button onClick={ onMenuClick( ContactTypes.EditProfile ) }>
                    <MenuIcon margin="normal" icon={ faUserCircle }/>
                    <Text>
                        Edit my profile
                    </Text>
                </MenuItem>
            </Menu>
        </>
    )
};

export default ContactMenu;
