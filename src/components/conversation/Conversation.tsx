import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { ConversationContainer } from './styled';
import usePrevious from '../../hooks/usePrevious';
import { MY_CONVERSATION } from '../../graphql/queries/conversations';
import { ConversationResult } from '../../types/graphql/Queries';
import useCurrentUser from '../../hooks/useCurrentUser';
import ConversationEditor from '../conversation-editor/ConversationEditor';
import ConversationMessages from '../conversation-messages/ConversationMessages';
import CloseConversationForm from '../close-conversation-form/CloseConversationForm';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import IconMessage from '../icon-message/IconMessage';
import { FaIcon } from '../styled/typography';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SetContactType, SetIsClosing } from '../../types/actions/ContactActions';
import { ContactTypes } from '../../types/reducers/ContactReducer';
import { useApolloClient } from '@apollo/react-hooks';
import HomeStore from '../../types/stores/HomeStore';
import { Button } from '../styled/buttons';
import { Typography } from '@material-ui/core';
import { ButtonsRow } from '../styled/wrappers';

const messagesPerPage = 30;

const Conversation = ( { conversationQuery, messageCreationMutation, changeStatusMutation, createConversationMutation }: ConversationProps ) =>
{
    const dispatch = useDispatch();

    const [ createConversation, mutationResult ] = createConversationMutation;
    const { loading: mutationLoading } = mutationResult;

    const [ , query ] = conversationQuery;
    const { data: result, loading: queryLoading } = query;

    const currentUser = useCurrentUser();

    const client = useApolloClient();

    const isClosing = useSelector( ( store: HomeStore ) => store.contact.isClosing );

    const setIsClosing = useCallback( ( payload: boolean ) =>
    {
        dispatch<SetIsClosing>( {
            type: 'SetIsClosing',
            payload
        } )
    }, [ dispatch ] );

    const handleClose = useCallback( () => setIsClosing( true ), [ setIsClosing ] );
    const handleCancel = useCallback( () => setIsClosing( false ), [ setIsClosing ] );

    const handleReturn = useCallback( () =>
    {
        dispatch<SetContactType>( {
            type:    'SetContactType',
            payload: ContactTypes.Selection
        } );

        setIsClosing( false );
    }, [ dispatch, setIsClosing ] );

    const startNewConversation = useCallback( async () =>
    {
        setIsClosing( false );

        await createConversation();
    }, [ setIsClosing ] );

    const conversationID = result && result.conversation ? result.conversation.id : 0;
    const prevConversationID = usePrevious( conversationID );

    const [ hasMore, setHasMore ] = useState( true );

    const loadMore = useCallback( async ( page: number ) =>
    {
        if ( !hasMore ) {
            return;
        }

        await query.fetchMore( {
            variables:   {
                page
            },
            updateQuery: ( prev, { fetchMoreResult } ) =>
                         {
                             if ( !fetchMoreResult || !fetchMoreResult.conversation.messages.length ) {
                                 setHasMore( false );

                                 return prev;
                             }

                             return {
                                 conversation: {
                                     ...prev.conversation,
                                     messages: [ ...fetchMoreResult.conversation.messages, ...prev.conversation.messages ]
                                 }
                             };
                         }
        } )
    }, [ hasMore, result, query ] );

    useEffect( () =>
    {
        if ( query.data || !query.called || createConversationMutation[ 1 ].loading ) {
            return;
        }

        createConversation();
    }, [ query.data, createConversationMutation, query.called, createConversation ] );

    useEffect( () =>
    {
        return () =>
        {
            const data = client.cache.readQuery<ConversationResult>( {
                query: MY_CONVERSATION
            } );

            if ( !data || !data.conversation || data.conversation.messages.length < messagesPerPage ) {
                return;
            }

            const { conversation } = data;
            const { messages } = conversation;

            client.cache.writeQuery( {
                query: MY_CONVERSATION,
                data:  {
                    conversation: {
                        ...conversation,
                        messages: messages.slice( messages.length - messagesPerPage )
                    }
                }
            } );

        }
    }, [] );

    useEffect( () =>
    {
        if ( !result || !result.conversation || ( conversationID && conversationID === prevConversationID ) ) {
            return;
        }

        setHasMore( result.conversation.messages.length >= messagesPerPage )
    }, [ conversationID, prevConversationID, result ] );

    return (
        <ConversationContainer>
            <Loader active={ mutationLoading || queryLoading } asOverlay={ true } svgProps={ {
                width:  '30%',
                height: '30%'
            } }/>

            { result && result.conversation &&

              <>

                  { result.conversation.status === ConversationStatuses.closed && isClosing &&
                    <IconMessage title="Conversation closed." icon={ <FaIcon icon={ faCheckCircle }/> }>
                        <Typography align="center" variant="subtitle1" color="textPrimary">
                            You have closed this conversation.
                        </Typography>
                        <ButtonsRow>
                            <Button variant="contained" color="primary" onClick={ startNewConversation }>
                                Start new conversation
                            </Button>
                            <Button onClick={ handleReturn } variant="outlined" color="secondary">
                                Return
                            </Button>
                        </ButtonsRow>
                    </IconMessage>
                  }

                  { result.conversation.status === ConversationStatuses.open &&
                    <>
                        { !isClosing &&
                          <>
                              <ConversationMessages onCloseClick={ handleClose } loading={ query.loading } onLoadMore={ loadMore } hasMore={ hasMore } conversation={ result.conversation }/>
                              <ConversationEditor mutation={ messageCreationMutation } disabled={ queryLoading } conversationID={ conversationID }/>
                          </>
                        }

                        { isClosing && currentUser.data &&
                          <CloseConversationForm
                              onCancel={ handleCancel }
                              closeConversationMutation={ changeStatusMutation }
                              conversationID={ result.conversation.id }
                              currentUser={ currentUser.data.user }/>
                        }
                    </>
                  }
              </>

            }

        </ConversationContainer>
    )

};

export default Conversation;
