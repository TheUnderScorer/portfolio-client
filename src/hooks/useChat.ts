import { MutationFn, MutationResult, QueryHookResult, useMutation, useQuery } from 'react-apollo-hooks';
import { CREATE_CONVERSATION, MY_CONVERSATION } from '../graphql/queries/conversations';
import { ConversationResult } from '../types/graphql/Queries';
import { useEffect } from 'react';

export type Result = [
    QueryHookResult<ConversationResult, any>,
    [ MutationFn<ConversationResult, any>, MutationResult<ConversationResult> ]
];

export default ( suspend: boolean = false ): Result =>
{
    const conversationsQuery = useQuery<ConversationResult>( MY_CONVERSATION, {
        suspend
    } );
    const { data } = conversationsQuery;

    const createConversation = useMutation<ConversationResult>( CREATE_CONVERSATION, {
        update: ( cache, result ) =>
                {
                    cache.writeQuery( {
                        query: MY_CONVERSATION,
                        data:  {
                            conversation: {
                                ...result.data.conversation
                            }
                        },
                    } )
                }
    } );
    const [ mutationFn ] = createConversation;

    useEffect( () =>
    {
        if ( !conversationsQuery.data || conversationsQuery.data.conversation || suspend ) {
            return;
        }

        mutationFn();

    }, [ data, suspend ] );

    return [ conversationsQuery, createConversation ];
}
