import { QueryHookResult } from 'react-apollo-hooks';
import { ConversationResult } from '../../../types/graphql/Queries';
import PaginationInput from '../../../types/graphql/inputs/PaginationInput';
import { ChangeStatusMutation, CreateConversationMutation, CreateMessageMutation } from '../../../hooks/useChat';

export default interface ConversationProps
{
    query: QueryHookResult<ConversationResult, PaginationInput>;
    creationMutation: CreateConversationMutation,
    messageCreationMutation: CreateMessageMutation;
    changeStatusMutation: ChangeStatusMutation
}
