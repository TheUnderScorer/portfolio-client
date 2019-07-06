import * as React from 'react';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import {
    GoBackButton,
    HeaderWrapper,
    InnerCaption,
    LogoWrapper,
    MenuActivator,
    Navigation,
    NavigationLink,
    NavigationList,
    NavigationListItem,
    SwitchContainer
} from './styled';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetCurrentSection, SetDidInnerOpen, SetInnerActive } from '../../types/actions/HomeActions';
import Switch from '@material/react-switch';
import '@material/react-switch/dist/switch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetThemeMode } from '../../types/actions/ThemeActions';
import Me from '../../assets/me.jpg';
import { SmallText, Text } from '../styled/typography';
import { RoundButton } from '../styled/buttons';
import texts from '../../pages/data/texts';


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
    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );
    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );
    const mode = useSelector( ( store: HomeStore ) => store.theme.mode );

    const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback( ( event ) => {

        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: event.target.checked ? 'black' : 'white'
        };
        dispatch( action );

    }, [ dispatch ] );

    const [ transparent, setTransparent ] = useState( !didInnerOpen );
    const [ isBackVisible, setBackVisible ] = useState( false );

    useEffect( () => {
        setTransparent( !didInnerOpen );
    }, [ didInnerOpen ] );

    useEffect( () => {

        const timeout = setTimeout( () => {
            setBackVisible( innerActive );
        }, 100 );

        return () => clearTimeout( timeout );

    }, [ innerActive ] );

    const handleLogoClick = useCallback( () => {

        const sectionAction: SetCurrentSection = {
            type:    'SetCurrentSection',
            payload: ''
        };

        dispatch( sectionAction );

        if ( !innerActive ) {
            return;
        }

        const innerAction: SetInnerActive = {
            type:    'SetInnerActive',
            payload: false
        };

        const didOpenAction: SetDidInnerOpen = {
            type:    'SetDidInnerOpen',
            payload: false
        };

        dispatch( innerAction );
        dispatch( didOpenAction );

    }, [ innerActive ] );

    return (
        <HeaderWrapper transparent={ transparent }>
            <LogoWrapper>
                <GoBackButton onClick={ handleLogoClick } isActive={ isBackVisible } flat={ true } transparent={ true }>
                    <FontAwesomeIcon icon="arrow-left"/>
                </GoBackButton>
                <img src={ Me } alt=""/>
                <InnerCaption>
                    <Text>
                        { texts.me.name }
                    </Text>
                    <SmallText>
                        { texts.me.position }
                    </SmallText>
                </InnerCaption>
            </LogoWrapper>
            <Navigation>
                <NavigationList>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( 'about' ) } active={ currentSection === 'about' }>
                            { texts.aboutMe.sectionTitle }
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( 'projects' ) } active={ currentSection === 'projects' }>
                            { texts.projects.sectionTitle }
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <RoundButton flat={ true } ripple={ true } onClick={ setSection( 'contact' ) }>
                            { texts.hire.sectionTitle }
                        </RoundButton>
                    </NavigationListItem>
                    <NavigationListItem>
                        <SwitchContainer>
                            <FontAwesomeIcon icon="sun"/>
                            <Switch
                                className="theme-mode-switch"
                                onChange={ handleToggle }
                                checked={ mode === 'black' }
                            />
                            <FontAwesomeIcon icon="moon"/>
                        </SwitchContainer>
                    </NavigationListItem>
                </NavigationList>
            </Navigation>
            <MenuActivator flat={ true } transparent={ true }>
                <FontAwesomeIcon icon="bars"/>
            </MenuActivator>
        </HeaderWrapper>
    )
};

export default connect()( Header );
