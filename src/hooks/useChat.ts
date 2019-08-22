import { MutationTuple, QueryLazyOptions, useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { MY_CONVERSATION } from '../graphql/queries/conversations';
import { ConversationResult, MessageResult } from '../types/graphql/Queries';
import { useEffect } from 'react';
import { CHANGE_STATUS, CREATE_CONVERSATION, SEND_MESSAGE } from '../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../graphql/subscriptions/messages';
import addMessageToConversation from '../graphql/cache/addMessageToConversation';
import { MessageInputVariable } from '../types/graphql/inputs/MessageInput';
import { ChangeConversationStatusInputVariable } from '../types/graphql/inputs/ChangeConversationStatusInput';
import { QueryResult } from '@apollo/react-common';
import SubscriptionResult from '../types/graphql/SubscriptionResult';
import PaginationInput from '../types/graphql/inputs/PaginationInput';

export type ChangeStatusMutation = MutationTuple<ConversationResult, ChangeConversationStatusInputVariable>;
export type CreateMessageMutation = MutationTuple<MessageResult, MessageInputVariable>;
export type CreateConversationMutation = MutationTuple<ConversationResult, any>;
// TODO Create type for callback function
export type ConversationQuery = [ ( options?: QueryLazyOptions<PaginationInput> ) => void, QueryResult<ConversationResult, any> ];

export type Result = {
    conversationsQuery: ConversationQuery,
    createConversationMutation: CreateConversationMutation,
    createMessageMutation: CreateMessageMutation,
    newMessagesSubscription: SubscriptionResult<MessageResult>,
    changeStatusMutation: ChangeStatusMutation
}

export default ( suspend: boolean = false ): Result =>
{
    const conversationsQuery = useLazyQuery<ConversationResult>( MY_CONVERSATION );
    const [ fetchConversation, { data, loading } ] = conversationsQuery;

    const createConversationMutation = useMutation<ConversationResult>( CREATE_CONVERSATION, {
        variables: {},
        update:    ( cache, { data } ) =>
                   {
                       if ( !data ) {
                           return;
                       }

                       cache.writeQuery( {
                           query: MY_CONVERSATION,
                           data:  {
                               conversation: {
                                   ...data.conversation
                               }
                           },
                       } )
                   }
    } );
    const [ mutationFn, mutationResult ] = createConversationMutation;

    const newMessagesSubscription = useSubscription<MessageResult>( NEW_MESSAGE, {
        onSubscriptionData: ( { client: { cache }, subscriptionData: { data } } ) =>
                            {
                                addMessageToConversation( cache, data );
                            }
    } );

    const createMessageMutation = useMutation<MessageResult, MessageInputVariable>( SEND_MESSAGE, {
        update: ( cache, { data } ) =>
                {
                    addMessageToConversation( cache, data );
                }
    } );

    useEffect( () =>
    {
        if ( loading || !data || data.conversation || suspend ) {
            return;
        }

        mutationFn();
    }, [ data, suspend ] );

    const changeStatusMutation = useMutation<ConversationResult, ChangeConversationStatusInputVariable>( CHANGE_STATUS );

    useEffect( () =>
    {
        if ( data || mutationResult.loading || suspend ) {
            return;
        }

        fetchConversation();
    }, [ data, fetchConversation, mutationResult.loading, suspend ] );

    return {
        conversationsQuery,
        createConversationMutation,
        createMessageMutation,
        newMessagesSubscription,
        changeStatusMutation
    };
}
