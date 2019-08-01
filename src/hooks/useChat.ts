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
import { CREATE_CONVERSATION, SEND_MESSAGE } from '../graphql/mutations/conversations';
import { NEW_MESSAGE } from '../graphql/subscriptions/messages';
import addMessageToConversation from '../graphql/cache/addMessageToConversation';
import { MessageInputVariable } from '../types/graphql/inputs/MessageInput';

export type Result = [
    QueryHookResult<ConversationResult, any>,
    [ MutationFn<ConversationResult, any>, MutationResult<ConversationResult> ],
    [ MutationFn<MessageResult, MessageInputVariable>, MutationResult<MessageResult> ],
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

    return [ conversationsQuery, createConversation, createMessageMutation, newMessagesSubscription, ];
}
