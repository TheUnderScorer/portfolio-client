import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import IconMessage from '../icon-message/IconMessage';
import { ContactSlider, FormTitle, FormTitleContainer, Inner } from './styled/contact';
import { IconButton, Tooltip } from '@material-ui/core';
import { FaIcon, Text, WhiteFaIcon } from '../styled/typography';
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
import Result from '../../types/graphql/Result';
import { ContactInputVariable } from '../../types/graphql/inputs/ContactInput';
import { SEND } from '../../graphql/mutations/contact';
import { UserInputVariable } from '../../types/graphql/inputs/UserInput';
import useApolloErrors from '../../hooks/useApolloErrors';
import HomeStore from '../../types/stores/HomeStore';
import { SelectionCallback } from '../selection/types/SelectionProps';
import { SetContactType, SetIsClosing } from '../../types/actions/ContactActions';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import useChat from '../../hooks/useChat';
import Conversation from '../conversation/Conversation';
import { UPDATE_ME } from '../../graphql/mutations/users';
import { useMutation } from '@apollo/react-hooks';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import ContactMenu from '../contact-menu/ContactMenu';
import { ContactMenuItems, MenuClickHandler } from '../contact-menu/types/ContactMenuProps';

const sections = {
    [ ContactTypes.UserForm ]:     0,
    [ ContactTypes.Selection ]:    1,
    [ ContactTypes.ContactForm ]:  2,
    [ ContactTypes.Conversation ]: 3,
    [ ContactTypes.EditProfile ]:  4,
};

const titlesWithReturnIcon = [ ContactTypes.ContactForm, ContactTypes.EditProfile, ContactTypes.Conversation ];
const shouldAddIcon = ( type: ContactTypes ) => titlesWithReturnIcon.includes( type );

// TODO - Refactor Title, Notices and Errors into separate components
// TODO - Cleanup
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

    const { conversationsQuery, createConversationMutation, createMessageMutation, changeStatusMutation } = useChat( type !== ContactTypes.Conversation );
    const [ , conversationQueryResult ] = conversationsQuery;
    const [ createConversation, createConversationResult ] = createConversationMutation;

    const [ errors, setErrors ] = useApolloErrors( [
        userQuery,
        conversationQueryResult,
        userMutation[ 1 ],
        contactMutation[ 1 ],
    ] );

    const [ isConnected, setConnected ] = useState( true );
    const [ successMessages, setSuccessMessages ] = useState<string[]>( [] );
    const [ currentSlide, setCurrentSlide ] = useState<number>( sections[ type ] );

    const onMenuClick: MenuClickHandler = useCallback( ( menu ) =>
    {

        if ( ContactTypes.hasOwnProperty( menu ) ) {
            dispatch<SetContactType>( {
                type:    'SetContactType',
                payload: menu as ContactTypes
            } );
        } else {
            switch ( menu as ContactMenuItems ) {

                case ContactMenuItems.CloseConversation:

                    dispatch<SetIsClosing>( {
                        type:    'SetIsClosing',
                        payload: true,
                    } );

                    break;

            }
        }

    }, [ dispatch ] );

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
    }, [ successMessages ] );

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

    // Handles connection error
    useEffect( () =>
    {
        if ( !errors.length ) {
            return;
        }

        errors.forEach( apolloError =>
        {
            if ( apolloError && apolloError.error && apolloError.error.message.includes( 'Failed to fetch' ) ) {
                setConnected( false );

                return;
            }
        } );

    }, [ errors ] );

    // Creates new conversation after user have closed current one
    // TODO Check if we actually need this
    useEffect( () =>
    {
        if ( !conversationQueryResult.data || !Object.values( conversationQueryResult.data as object ).length ) {
            return;
        }

        const { conversation } = conversationQueryResult.data;

        if ( !!conversation &&
             conversation.status === ConversationStatuses.closed &&
             !createConversationResult.loading
             && type === ContactTypes.Selection ) {
            createConversation();
        }

    }, [ conversationQueryResult, createConversation, createConversationMutation, createConversationResult.loading, type ] );

    return (
        <Inner active={ active }>
            <Loader active={ userLoading } asOverlay={ true } svgProps={ {
                width:  '30%',
                height: '30%'
            } }/>

            { !isConnected &&
              <IconMessage icon={
                  <FaIcon icon={ faFrown }/> } title="Oh no!">
                  <Text>
                      We are unable to connect to our server. Please check your internet connection.
                  </Text>
              </IconMessage>
            }

            { isConnected &&
              <>
                  <FormTitleContainer>
                      { shouldAddIcon( type ) &&
                        <Tooltip title="Return to selection">
                            <IconButton onClick={ handleReturnClick }>
                                <WhiteFaIcon icon="arrow-left"/>
                            </IconButton>
                        </Tooltip>
                      }
                      <FormTitle className="form-title">
                          { getFormTitle( type, user ) }
                      </FormTitle>
                      { user && type !== ContactTypes.UserForm &&
                        <ContactMenu conversation={ conversationQueryResult.data ? conversationQueryResult.data.conversation : null } onMenuClick={ onMenuClick }/>
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
                        <Conversation createConversationMutation={ createConversationMutation } changeStatusMutation={ changeStatusMutation } messageCreationMutation={ createMessageMutation } conversationQuery={ conversationsQuery }/>
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
