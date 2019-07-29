import { MutationFn, MutationResult, QueryHookResult } from 'react-apollo-hooks';
import { ConversationResult } from '../../../types/graphql/Queries';
import PaginationInput from '../../../types/graphql/inputs/PaginationInput';

export default interface ConversationProps
{
    query: QueryHookResult<ConversationResult, any>;
    creationMutation: [ MutationFn<ConversationResult, PaginationInput>, MutationResult<ConversationResult> ]
}
