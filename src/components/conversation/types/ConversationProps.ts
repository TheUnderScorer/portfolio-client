import {
    ChangeStatusMutation,
    ConversationQuery,
    CreateConversationMutation,
    CreateMessageMutation
} from '../../../hooks/useChat';

export default interface ConversationProps
{
    createConversationMutation: CreateConversationMutation;
    conversationQuery: ConversationQuery;
    creationMutation: CreateConversationMutation,
    messageCreationMutation: CreateMessageMutation;
    changeStatusMutation: ChangeStatusMutation
}
