import { MutationFn, MutationResult, QueryHookResult } from 'react-apollo-hooks';
import { ConversationResult, MessageResult } from '../../../types/graphql/Queries';
import PaginationInput from '../../../types/graphql/inputs/PaginationInput';
import { MessageInputVariable } from '../../../types/graphql/inputs/MessageInput';

export default interface ConversationProps
{
    query: QueryHookResult<ConversationResult, PaginationInput>;
    creationMutation: [ MutationFn<ConversationResult, PaginationInput>, MutationResult<ConversationResult> ],
    messageCreationMutation: [ MutationFn<MessageResult, MessageInputVariable>, MutationResult<MessageResult> ];
}
