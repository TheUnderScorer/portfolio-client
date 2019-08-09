import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { ConversationContainer } from './styled';
import usePrevious from '../../hooks/usePrevious';
import { useApolloClient } from 'react-apollo-hooks';
import { MY_CONVERSATION } from '../../graphql/queries/conversations';
import { ConversationResult } from '../../types/graphql/Queries';
import useCurrentUser from '../../hooks/useCurrentUser';
import ConversationEditor from '../conversation-editor/ConversationEditor';
import ConversationMessages from '../conversation-messages/ConversationMessages';
import CloseConversationForm from '../close-conversation-form/CloseConversationForm';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import IconMessage from '../icon-message/IconMessage';
import { A, FaIcon } from '../styled/typography';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const messagesPerPage = 30;

const Conversation = ( { query, creationMutation, messageCreationMutation, changeStatusMutation }: ConversationProps ) =>
{
    const { data: result, loading: queryLoading } = query;

    const currentUser = useCurrentUser();

    const client = useApolloClient();

    const [ isClosing, setIsClosing ] = useState( false );
    const handleClose = useCallback( () => setIsClosing( true ), [] );
    const handleCancel = useCallback( () => setIsClosing( false ), [] );

    const conversationID = result && result.conversation ? result.conversation.id : 0;
    const prevConversationID = usePrevious( conversationID );

    const [ , mutationResult ] = creationMutation;
    const { loading: mutationLoading } = mutationResult;

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
                    <IconMessage title="Conversation closed" icon={ <FaIcon icon={ faCheckCircle }/> }>
                        <A underlined={ true }>
                            Click here to return.
                        </A>
                    </IconMessage>
                  }

                  { !isClosing &&
                    <>
                        <ConversationMessages onCloseClick={ handleClose } loading={ query.loading } onLoadMore={ loadMore } hasMore={ hasMore } conversation={ result.conversation }/>
                        <ConversationEditor mutation={ messageCreationMutation } disabled={ queryLoading } conversationID={ conversationID }/>
                    </>
                  }

                  { isClosing && currentUser.data &&
                    <CloseConversationForm onCancel={ handleCancel } closeConversationMutation={ changeStatusMutation } conversationID={ result.conversation.id } currentUser={ currentUser.data.user }/>
                  }
              </>

            }

        </ConversationContainer>
    )

};

export default Conversation;
