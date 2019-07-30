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
import { CREATE_CONVERSATION } from '../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../graphql/subscriptions/messages';

export type Result = [
    QueryHookResult<ConversationResult, any>,
    [ MutationFn<ConversationResult, any>, MutationResult<ConversationResult> ],
    SubscriptionHookResult<MessageResult>
];

export default ( suspend: boolean = false ): Result =>
{
    const conversationsQuery = useQuery<ConversationResult>( MY_CONVERSATION, {
        suspend
    } );
    const { data } = conversationsQuery;

    const createConversation = useMutation<ConversationResult>( CREATE_CONVERSATION, {
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
    const [ mutationFn ] = createConversation;

    const newMessagesSubscription = useSubscription<MessageResult>( NEW_MESSAGE, {
        /**
         * Updates array of conversation messages whenever new messages comes in
         * */
        onSubscriptionData: ( { client: { cache }, subscriptionData: { data } } ) =>
                            {
                                const conversationResult = cache.readQuery<ConversationResult>( MY_CONVERSATION );

                                if ( !conversationResult || !data ) {
                                    return;
                                }

                                const conversation = { ...conversationResult.conversation };

                                conversation.messages.push( data.message );

                                cache.writeQuery<ConversationResult>( {
                                    query: MY_CONVERSATION,
                                    data:  {
                                        conversation
                                    }
                                } )
                            }
    } );


    useEffect( () =>
    {
        if ( !conversationsQuery.data || conversationsQuery.data.conversation || suspend ) {
            return;
        }

        mutationFn();
    }, [ data, suspend ] );

    return [ conversationsQuery, createConversation, newMessagesSubscription ];
}
