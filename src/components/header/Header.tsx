import * as React from 'react';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import {
    HeaderWrapper,
    Navigation,
    NavigationLink,
    NavigationList,
    NavigationListItem,
    SwitchContainer
} from './styled';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetCurrentSection } from '../../types/actions/HomeActions';
import Switch from '@material/react-switch';
import '@material/react-switch/dist/switch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetThemeMode } from '../../types/actions/ThemeActions';

const Header = () => {

    const dispatch = useDispatch();
    const setSection = useCallback( ( section: string ) => () => {

        const action: SetCurrentSection = {
            type:    'SetCurrentSection',
            payload: section
        };

        dispatch( action );

    }, [ dispatch ] );

    const currentSection = useSelector( ( store: HomeStore ) => store.home.currentSection );
    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );
    const mode = useSelector( ( store: HomeStore ) => store.theme.mode );

    const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback( ( event ) => {

        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: event.target.checked ? 'black' : 'white'
        };
        dispatch( action );

    }, [ dispatch ] );

    const [ transparent, setTransparent ] = useState( !innerActive );

    useEffect( () => {

        const timeout = setTimeout( () => {
            setTransparent( !innerActive );
        }, 700 );

        return () => {
            clearTimeout( timeout );
        }

    }, [ innerActive ] );

    return (
        <HeaderWrapper transparent={ transparent }>
            <Navigation>
                <NavigationList>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( 'about' ) } active={ currentSection === 'about' }>
                            About
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( 'projects' ) } active={ currentSection === 'projects' }>
                            Projects
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( 'contact' ) } active={ currentSection === 'contact' }>
                            Contact
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <SwitchContainer>
                            <FontAwesomeIcon icon="sun"/>
                            <Switch
                                onChange={ handleToggle }
                                checked={ mode === 'black' }
                            />
                            <FontAwesomeIcon icon="moon"/>
                        </SwitchContainer>
                    </NavigationListItem>
                </NavigationList>
            </Navigation>
        </HeaderWrapper>
    )
};

export default connect()( Header );
