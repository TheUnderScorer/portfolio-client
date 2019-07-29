import * as React from 'react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import Loader from '../loader/Loader';
import ErrorMessage from '../error-message/ErrorMessage';
import { ContactSlider, FormTitle, FormTitleContainer, Inner } from './styled/contact';
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { FaIcon, FaIconReversed, Text } from '../styled/typography';
import getFormTitle from './getFormTitle';
import { ContactTypes } from '../../types/reducers/ContactReducer';
import { Notice } from './Notice';
import UserForm from '../user-form/UserForm';
import Selection from '../selection/Selection';
import contactSelections from '../../pages/data/contactSelections';
import ContactForm from '../contact-form/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import useCurrentUser from '../../hooks/useCurrentUser';
import User from '../../types/graphql/User';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_ME } from '../../graphql/queries/users';
import Result from '../../types/graphql/Result';
import { ContactInputVariable } from '../../types/graphql/inputs/ContactInput';
import { SEND } from '../../graphql/queries/contact';
import { UserInputVariable } from '../../types/graphql/inputs/UserInput';
import useApolloErrors from '../../hooks/useApolloErrors';
import HomeStore from '../../types/stores/HomeStore';
import { SelectionCallback } from '../selection/types/SelectionProps';
import { SetContactType } from '../../types/actions/ContactActions';
import { useSpring } from 'react-spring';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import useChat from '../../hooks/useChat';
import Conversation from '../conversation/Conversation';

const sections = {
    [ ContactTypes.UserForm ]:     0,
    [ ContactTypes.Selection ]:    1,
    [ ContactTypes.ContactForm ]:  2,
    [ ContactTypes.Conversation ]: 3,
    [ ContactTypes.EditProfile ]:  4,
};

const titlesWithReturnIcon = [ ContactTypes.ContactForm, ContactTypes.EditProfile, ContactTypes.Conversation ];
const shouldAddIcon = ( type: ContactTypes ) => titlesWithReturnIcon.includes( type );

const ContactInner = () =>
{
    const dispatch = useDispatch();

    const active = useSelector( ( store: HomeStore ) => store.contact.active );
    const type = useSelector( ( store: HomeStore ) => store.contact.type );

    const userQuery = useCurrentUser();
    const { data: userData, loading: userLoading } = userQuery;
    const user: User | undefined = userData ? userData.user : undefined;

    const contactMutation = useMutation<Result, ContactInputVariable>( SEND );
    const [ , contactMutationResult ] = contactMutation;

    const userMutation = useMutation<User, UserInputVariable>( UPDATE_ME );
    const [ , userMutationResult ] = userMutation;

    const [ conversationsQuery, conversationMutation ] = useChat( type !== ContactTypes.Conversation );

    const [ errors, setErrors ] = useApolloErrors( [
        userQuery,
        conversationsQuery,
        userMutation[ 1 ],
        contactMutation[ 1 ],
    ] );

    const [ isConnected, setConnected ] = useState( true );

    const [ successMessages, setSuccessMessages ] = useState<string[]>( [] );

    const [ menuOpen, setMenuOpen ] = useState( false );
    const toggleMenu = useCallback( () =>
    {
        setMenuOpen( !menuOpen );
    }, [ menuOpen, setMenuOpen ] );

    const menuIconRef = useRef() as MutableRefObject<HTMLElement | null>;
    const setMenuRef = ( ref: HTMLElement | null ) => menuIconRef.current = ref;

    const [ currentSlide, setCurrentSlide ] = useState<number>( sections[ type ] );

    const setSection: SelectionCallback<ContactTypes> = useCallback( ( section: ContactTypes ) =>
    {
        const action: SetContactType = {
            type:    'SetContactType',
            payload: section,
        };

        dispatch( action );
    }, [ dispatch ] );
    const handleReturnClick = useCallback( () =>
    {
        setSection( ContactTypes.Selection );
    }, [ type ] );
    const changeProfile = useCallback( () =>
    {
        setMenuOpen( false );
        setSection( ContactTypes.EditProfile );
    }, [] );

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

    const onContactFormSubmit = useCallback( ( result: boolean, modifiedEmail: boolean ) =>
    {
        if ( result ) {
            const newMessages = [ ...successMessages, 'Your message have been sent!' ];

            if ( modifiedEmail ) {
                newMessages.push( 'Your e-mail have been saved, you won\'t need to provide it again.' );
            }

            setSuccessMessages( newMessages );
        }
    }, [] );

    // Clears success messages after timeout
    useEffect( () =>
    {
        const timeout = setTimeout( () =>
        {
            setSuccessMessages( [] );
        }, 6000 );

        return () =>
        {
            clearTimeout( timeout );
        }
    }, [ successMessages ] );

    // Clears errors after timeout
    useEffect( () =>
    {
        if ( !errors.length ) {
            return;
        }

        const timeout = setTimeout( () =>
        {
            setErrors( [] );
        }, 8000 );

        return () =>
        {
            clearTimeout( timeout );
        }
    }, [ errors ] );

    useEffect( () =>
    {
        if ( !errors.length ) {
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
        <Inner style={ props }>
            <Loader active={ userLoading } asOverlay={ true } svgProps={ {
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
                                <MenuItem onClick={ changeProfile }>
                                    <FaIcon margin="normal" icon={ faUserCircle }/>
                                    <Text>
                                        Edit my profile
                                    </Text>
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
                        <Conversation query={ conversationsQuery } creationMutation={ conversationMutation }/>
                        <div>
                            Edit profile!
                        </div>
                    </ContactSlider>
                  }
              </>
            }
        </Inner>
    )
};

export default ContactInner;
