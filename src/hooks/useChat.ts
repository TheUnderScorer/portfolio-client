import {
    MutationFn,
    MutationResult,
    QueryHookResult,
    SubscriptionHookResult,
    useMutation,
    useQuery,
    useSubscription
} from 'react-apollo-hooks';
import { MY_CONVERSATION } from '../graphql/queries/conversations';
import { ConversationResult, MessageResult } from '../types/graphql/Queries';
import { useEffect } from 'react';
import { CHANGE_STATUS, CREATE_CONVERSATION, SEND_MESSAGE } from '../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../graphql/subscriptions/messages';
import addMessageToConversation from '../graphql/cache/addMessageToConversation';
import { MessageInputVariable } from '../types/graphql/inputs/MessageInput';
import { ChangeConversationStatusInputVariable } from '../types/graphql/inputs/ChangeConversationStatusInput';

export type ChangeStatusMutation = [ MutationFn<ConversationResult, ChangeConversationStatusInputVariable>, MutationResult<ConversationResult> ];
export type CreateMessageMutation = [ MutationFn<MessageResult, MessageInputVariable>, MutationResult<MessageResult> ];
export type CreateConversationMutation = [ MutationFn<ConversationResult, any>, MutationResult<ConversationResult> ];

export type Result = {
    conversationsQuery: QueryHookResult<ConversationResult, any>,
    createConversationMutation: CreateConversationMutation,
    createMessageMutation: CreateMessageMutation,
    newMessagesSubscription: SubscriptionHookResult<MessageResult>,
    changeStatusMutation: ChangeStatusMutation
}

export default ( suspend: boolean = false ): Result =>
{
    const conversationsQuery = useQuery<ConversationResult>( MY_CONVERSATION, {
        suspend,
    } );
    const { data } = conversationsQuery;

    const createConversationMutation = useMutation<ConversationResult>( CREATE_CONVERSATION, {
        update: ( cache, { data } ) =>
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
    const [ mutationFn ] = createConversationMutation;

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
        if ( !data || data.conversation || suspend ) {
            return;
        }

        mutationFn();
    }, [ data, suspend ] );

    const changeStatusMutation = useMutation<ConversationResult, ChangeConversationStatusInputVariable>( CHANGE_STATUS );

    return {
        conversationsQuery,
        createConversationMutation,
        createMessageMutation,
        newMessagesSubscription,
        changeStatusMutation
    };
}
