import { MutationFn, MutationResult, QueryHookResult, useMutation, useQuery } from 'react-apollo-hooks';
import { CREATE_CONVERSATION, MY_CONVERSATION } from '../graphql/queries/conversations';
import { ConversationResult } from '../types/graphql/Queries';

export type Result = [
    QueryHookResult<ConversationResult, any>,
    [ MutationFn<ConversationResult, any>, MutationResult<ConversationResult> ]
];

export default ( suspend: boolean = false ): Result =>
{
    const conversationsQuery = useQuery<ConversationResult>( MY_CONVERSATION, {
        suspend
    } );
    const createConversation = useMutation<ConversationResult>( CREATE_CONVERSATION );

    return [ conversationsQuery, createConversation ];
}
