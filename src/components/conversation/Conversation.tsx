import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { ConversationContainer } from './styled';
import ConversationEditor from '../conversation-editor/ConversationEditor';
import ConversationMessages from '../conversation-messages/ConversationMessages';
import usePrevious from '../../hooks/usePrevious';
import { useApolloClient } from 'react-apollo-hooks';
import { MY_CONVERSATION } from '../../graphql/queries/conversations';
import { ConversationResult } from '../../types/graphql/Queries';

const messagesPerPage = 30;

const Conversation = ( { query, creationMutation, messageCreationMutation }: ConversationProps ) =>
{
    const { data: result, loading: queryLoading } = query;

    const client = useApolloClient();

    const conversationID = result ? result.conversation.id : 0;
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

            if ( !data || data.conversation.messages.length < messagesPerPage ) {
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
        if ( !result || ( conversationID && conversationID === prevConversationID ) ) {
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
                  <ConversationMessages loading={ query.loading } onLoadMore={ loadMore } hasMore={ hasMore } conversation={ result.conversation }/>
                  <ConversationEditor mutation={ messageCreationMutation } disabled={ queryLoading } conversationID={ conversationID }/>
              </>
            }
        </ConversationContainer>
    )

};

export default Conversation;
