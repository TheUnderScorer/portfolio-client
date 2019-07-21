import * as React from 'react';
import {
    ChangeEventHandler,
    MouseEventHandler,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
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
    SwitchContainer,
    ToggleLink
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { SetCurrentSection, SetInnerActive, SetInnerSectionRelativeItem } from '../../types/actions/HomeActions';
import Switch from '@material/react-switch';
import '@material/react-switch/dist/switch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetThemeMode } from '../../types/actions/ThemeActions';
import Logo from '../../assets/logo.jpg';
import { SmallText, Text } from '../styled/typography';
import texts from '../../pages/data/texts';
import { ThemeMode } from '../../types/reducers/ThemeReducer';
import { getPrimary } from '../styled/colors';
import { smoothScroll } from '../../utils/scroll';
import { pushState } from '../../utils/history';
import 'hamburgers/dist/hamburgers.min.css';

const html = document.querySelector( 'html' );

const Header = () =>
{
    const dispatch = useDispatch();

    const headerRef = useRef() as MutableRefObject<HTMLElement>;

    const currentSection = useSelector( ( store: HomeStore ) => store.home.currentSection );
    const didInnerOpen = useSelector( ( store: HomeStore ) => store.home.didInnerOpen );
    const innerActive = useSelector( ( store: HomeStore ) => store.home.innerActive );
    const mode = useSelector( ( store: HomeStore ) => store.theme.mode );

    const [ transparent, setTransparent ] = useState( !didInnerOpen );
    const [ backgroundVisible, setBackVisible ] = useState( false );
    const [ isOpen, setOpen ] = useState( false );
    const [ isFixed, setFixed ] = useState( false );

    const setSection = useCallback( ( section: string ): MouseEventHandler => ( event ) =>
    {
        const target = event.target as HTMLElement;

        if ( !innerActive ) {

            const innerActivation: SetInnerActive = {
                type:    'SetInnerActive',
                payload: !innerActive
            };

            // isOpen has usage only on mobiles, and there we don't want to change relative item
            if ( !isOpen ) {

                if ( !target.classList.contains( 'header-cta' ) ) {
                    target.style.backgroundColor = getPrimary( mode );
                }

                const relativeItemAction: SetInnerSectionRelativeItem = {
                    type:    'SetInnerSectionRelativeItem',
                    payload: event.target as HTMLElement
                };

                dispatch( relativeItemAction );

                if ( !target.classList.contains( 'header-cta' ) ) {
                    setTimeout( () => target.removeAttribute( 'style' ), 500 );
                }
            }

            dispatch( innerActivation );

        }

        const action: SetCurrentSection = {
            type:    'SetCurrentSection',
            payload: section
        };

        dispatch( action );

    }, [ dispatch, innerActive, mode, isOpen ] );

    const setThemeMode = ( mode: ThemeMode ) => () =>
    {
        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: mode
        };

        dispatch( action );
    };

    const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback( ( event ) =>
    {
        const action: SetThemeMode = {
            type:    'SetThemeMode',
            payload: event.target.checked ? 'black' : 'white'
        };
        dispatch( action );

    }, [ dispatch ] );

    const handleLogoClick = useCallback( () =>
    {
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

        // Reset history state
        pushState( {
            state: {
                innerActive: false,
            },
            url:   '/'
        } );

        dispatch( innerAction );

    }, [ innerActive ] );

    const switchOpenState = useCallback( () =>
    {
        setOpen( !isOpen );
    }, [ isOpen ] );

    useEffect( () =>
    {
        setTransparent( !didInnerOpen );
    }, [ didInnerOpen ] );

    useEffect( () =>
    {
        const timeout = setTimeout( () =>
        {
            setBackVisible( innerActive );
        }, 100 );

        return () => clearTimeout( timeout );

    }, [ innerActive ] );

    useEffect( () =>
    {
        const offset = 100;

        if ( !didInnerOpen || !currentSection ) {
            return;
        }

        const section = document.getElementById( currentSection );

        if ( !section ) {
            return;
        }

        setOpen( false );

        smoothScroll( section.offsetTop - offset, 600 ).then( () =>
        {
            const sectionAction: SetCurrentSection = {
                type:    'SetCurrentSection',
                payload: ''
            };

            dispatch( sectionAction );
        } )

    }, [ didInnerOpen, currentSection ] );

    useEffect( () =>
    {

        const callback = () =>
        {
            const targetScroll = headerRef.current.offsetHeight * 2;

            if ( !document.scrollingElement ) {
                return;
            }

            if ( document.scrollingElement.scrollTop > targetScroll ) {
                setFixed( true );
            } else if ( document.scrollingElement.scrollTop <= targetScroll ) {
                setFixed( false );
            }
        };

        document.addEventListener( 'scroll', callback );

        return () => document.removeEventListener( 'scroll', callback );

    }, [ headerRef ] );

    useEffect( () =>
    {
        if ( !html ) {
            return;
        }

        isOpen ?
            html.classList.add( 'has-overlay' ) :
            html.classList.remove( 'has-overlay' );
    }, [ isOpen ] );

    return (
        <HeaderWrapper ref={ headerRef } isFixed={ isFixed } isOpen={ isOpen } transparent={ transparent }>
            <LogoWrapper onClick={ handleLogoClick }>
                <GoBackButton isActive={ backgroundVisible && !isOpen } flat={ true } transparent={ true }>
                    <FontAwesomeIcon icon="arrow-left"/>
                </GoBackButton>
                <img src={ Logo } alt=""/>
                <InnerCaption>
                    <Text>
                        { texts.me.name }
                    </Text>
                    <SmallText>
                        { texts.me.position }
                    </SmallText>
                </InnerCaption>
            </LogoWrapper>
            <Navigation className="navigation">
                <NavigationList>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( texts.aboutMe.id ) } active={ currentSection === texts.aboutMe.id }>
                            { texts.aboutMe.label }
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( texts.projects.id ) } active={ currentSection === texts.projects.id }>
                            { texts.projects.label }
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <NavigationLink onClick={ setSection( texts.contact.id ) } active={ currentSection === texts.contact.id }>
                            { texts.contact.label }
                        </NavigationLink>
                    </NavigationListItem>
                    <NavigationListItem>
                        <SwitchContainer>
                            <ToggleLink transparent={ !didInnerOpen } href="#" onClick={ setThemeMode( 'white' ) }>
                                <FontAwesomeIcon className="sun" icon="sun"/>
                            </ToggleLink>
                            <Switch
                                className="theme-mode-switch"
                                onChange={ handleToggle }
                                checked={ mode === 'black' }
                            />
                            <ToggleLink transparent={ !didInnerOpen } href="#" onClick={ setThemeMode( 'black' ) }>
                                <FontAwesomeIcon className="moon" icon="moon"/>
                            </ToggleLink>
                        </SwitchContainer>
                    </NavigationListItem>
                </NavigationList>
            </Navigation>
            <MenuActivator className={ `hamburger hamburger--collapse ${ isOpen ? 'is-active' : '' }` } onClick={ switchOpenState } flat={ true } transparent={ true }>
                <Text className="hamburger-box">
                    <Text className="hamburger-inner"/>
                </Text>
            </MenuActivator>
        </HeaderWrapper>
    )
};

export default Header;
