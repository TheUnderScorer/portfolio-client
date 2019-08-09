import Conversation, { ConversationStatuses } from '../Conversation';

export default interface ChangeConversationStatusInput extends Partial<Conversation>
{
    id: number;
    status: ConversationStatuses;
    email?: string;
    sendTranscript?: boolean;
}

export interface ChangeConversationStatusInputVariable
{
    input: ChangeConversationStatusInput;
}
