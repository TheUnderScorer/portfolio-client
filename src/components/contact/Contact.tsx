import * as React from 'react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactSlider, ContactWrapper, FormTitle, FormTitleContainer, IconContainer, Inner } from './styled';
import { FaIconReversed } from '../styled/typography';
import { useSpring } from 'react-spring';
import { SetContactActive, SetContactType } from '../../types/actions/ContactActions';
import { useMutation } from 'react-apollo-hooks';
import Loader from '../loader/Loader';
import UserForm from './UserForm';
import useUpdateUser from '../../hooks/useUpdateUser';
import getFormTitle from './getFormTitle';
import ContactReducer, { ContactTypes } from '../../types/reducers/ContactReducer';
import Selection from '../selection/Selection';
import contactSelections from '../../pages/data/contactSelections';
import Result from '../../types/graphql/Result';
import { SEND } from '../../graphql/queries/contact';
import useApolloErrors from '../../hooks/useApolloErrors';
import { ContactInputVariable } from '../../types/graphql/inputs/ContactInput';
import { SelectionCallback } from '../selection/types/SelectionProps';
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUpdateLoginDate from '../../hooks/useUpdateLoginDate';
import usePrevious from '../../hooks/usePrevious';
import User from '../../types/graphql/User';
import ContactForm from './ContactForm';
import { Notice } from './Notice';
import ErrorMessage from '../error-message/ErrorMessage';

const sections = {
    [ ContactTypes.UserForm ]:    0,
    [ ContactTypes.Selection ]:   1,
    [ ContactTypes.Chat ]:        3,
    [ ContactTypes.ContactForm ]: 2
};

const titlesWithReturnIcon = [ ContactTypes.ContactForm, ContactTypes.Chat ];
const shouldAddIcon = ( type: ContactTypes ) => titlesWithReturnIcon.includes( type );

const Contact = () =>
{
    const dispatch = useDispatch();

    const userQuery = useCurrentUser();
    const user: User | undefined = userQuery.data && userQuery.data.user ? userQuery.data.user : undefined;
    const prevUserID = usePrevious( user ? user.id : 0 );
    const updateLastLoginDate = useUpdateLoginDate( userQuery );

    const contactMutation = useMutation<Result, ContactInputVariable>( SEND );
    const [ , contactMutationResult ] = contactMutation;

    const userMutation = useUpdateUser( async () =>
    {
        await userQuery.updateQuery( ( oldUser ) => ( {
            user: {
                ...oldUser.user,
                ...userMutation[ 1 ].data
            }
        } ) );
    } );
    const [ , userMutationResult ] = userMutation;

    const [ errors, setErrors ] = useApolloErrors( [
        userQuery,
        userMutation[ 1 ],
        contactMutation[ 1 ],
    ] );

    const [ isConnected, setConnected ] = useState( true );

    const [ successMessages, setSuccesMessages ] = useState<string[]>( [] );

    const [ menuOpen, setMenuOpen ] = useState( false );
    const toggleMenu = useCallback( () =>
    {
        setMenuOpen( !menuOpen );
    }, [ menuOpen, setMenuOpen ] );

    const menuIconRef = useRef() as MutableRefObject<HTMLElement | null>;
    const setMenuRef = ( ref: HTMLElement | null ) => menuIconRef.current = ref;

    const { active = false, type }: ContactReducer = useSelector( ( store: HomeStore ) => ( {
        active: store.contact.active,
        type:   store.contact.type
    } ) );

    const [ currentSlide, setCurrentSlide ] = useState<number>( sections[ type ] );

    const setSection: SelectionCallback<ContactTypes> = useCallback( ( section: ContactTypes ) =>
    {
        const action: SetContactType = {
            type:    'SetContactType',
            payload: section,
        };

        dispatch( action );
    }, [ dispatch ] );
    const handleReturnClick = () => setSection( ContactTypes.Selection );

    const toggleActive = useCallback( () =>
    {
        const action: SetContactActive = {
            type:    'SetContactActive',
            payload: !active
        };

        dispatch( action );
    }, [ active, dispatch ] );

    // Props for opening animation
    const props = useSpring( {
        opacity:         active ? 1 : 0,
        transform:       `scale(${ active ? 1 : 0 })`,
        transformOrigin: 'right bottom',
    } );

    // Handles errors update
    useEffect( () =>
    {
        setErrors( [
            userQuery,
            userMutation[ 1 ],
            contactMutation[ 1 ],
        ] );
    }, [ userQuery.error, userMutationResult.error, contactMutationResult.error ] );

    // Moves to first section after used filled UserForm
    useEffect( () =>
    {
        // User have filled the form, move him to next slide
        if ( type === ContactTypes.UserForm && user && user.name ) {
            setSection( ContactTypes.Selection )
        }
    }, [ user, type ] );

    // Sets timeout for changing slider section in order to enable smooth transition
    useEffect( () =>
    {
        const timeout = setTimeout( () =>
        {
            const section = sections[ type ];

            setCurrentSlide( section );
        }, 50 );

        return () =>
        {
            clearTimeout( timeout );
        }
    }, [ type ] );

    // Updates login data on user change
    useEffect( () =>
    {
        if ( user && user.id === prevUserID ) {
            return;
        }

        updateLastLoginDate();
    }, [ updateLastLoginDate, user, prevUserID ] );

    const onContactFormSubmit = useCallback( ( result: boolean ) =>
    {

        if ( result ) {
            const newMessages = [ ...successMessages, 'Your message have been sent!' ];

            setSuccesMessages( newMessages );
        }

    }, [] );

    // Clears success messages after timeout
    useEffect( () =>
    {
        const timeout = setTimeout( () =>
        {
            setSuccesMessages( [] );
        }, 6000 );

        return () =>
        {
            clearTimeout( timeout );
        }
    }, [ successMessages ] );

    useEffect( () =>
    {
        if ( !errors.length ) {
            setConnected( true );

            return;
        }

        errors.forEach( error =>
        {
            if ( error && error.error && error.error.message.includes( 'Failed to fetch' ) ) {
                setConnected( false );
            }
        } );

    }, [ errors ] );

    return (
        <ContactWrapper>
            <IconContainer active={ active } onClick={ toggleActive } ripple={ true }>
                { active ?
                    <FaIconReversed icon="times"/> :
                    <FaIconReversed icon="comment"/>
                }
            </IconContainer>
            <Inner style={ props }>
                <Loader active={ userQuery.loading } asOverlay={ true } svgProps={ {
                    width:  '30%',
                    height: '30%'
                } }/>

                { !isConnected &&
                  <ErrorMessage title="Oh no!" message="We are unable to connect to our server. Please check your internet connection"/>
                }

                { isConnected &&
                  <>
                      <FormTitleContainer>
                          { shouldAddIcon( type ) &&
                            <Tooltip title="Return to selection">
                                <IconButton href="#" onClick={ handleReturnClick }>
                                    <FaIconReversed icon="arrow-left"/>
                                </IconButton>
                            </Tooltip>
                          }
                          <FormTitle className="form-title">
                              { getFormTitle( type, user ) }
                          </FormTitle>
                          { user && type !== ContactTypes.UserForm &&
                            <>
                                <IconButton
                                    href="#"
                                    ref={ setMenuRef }
                                    aria-label="More"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={ toggleMenu }
                                >
                                    <FaIconReversed icon="ellipsis-v"/>
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    anchorEl={ menuIconRef.current }
                                    keepMounted
                                    open={ menuOpen }
                                    onClose={ toggleMenu }
                                >
                                    <MenuItem>
                                        Test option
                                    </MenuItem>
                                </Menu>
                            </>
                          }
                      </FormTitleContainer>
                      { errors.length > 0 && errors.map( ( item, index ) =>
                          <Notice type="error" message={ item && item.error ? item.error.message : '' } key={ index }/>
                      ) }
                      { successMessages.length > 0 && successMessages.map( ( item, index ) =>
                          <Notice type="success" message={ item } key={ index }/>
                      ) }
                      { user &&
                        <ContactSlider activeSection={ currentSlide }>
                            <UserForm user={ user } mutation={ userMutation }/>
                            <Selection<ContactTypes> onSelection={ setSection } options={ contactSelections }/>
                            <ContactForm afterSubmit={ onContactFormSubmit } user={ user } mutation={ contactMutation }/>
                        </ContactSlider>
                      }
                  </>
                }

            </Inner>
        </ContactWrapper>
    );
};

export default connect()( Contact );
