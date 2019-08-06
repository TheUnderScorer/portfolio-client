import Conversation, { ConversationStatuses } from '../Conversation';

export default interface ChangeConversationStatusInput extends Partial<Conversation>
{
    conversationID: number;
    status: ConversationStatuses;
    email?: string;
}

export interface ChangeConversationStatusInputVariable
{
    input: ChangeConversationStatusInput;
}
