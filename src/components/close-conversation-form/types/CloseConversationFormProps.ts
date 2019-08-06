import User from '../../../types/graphql/User';
import { ChangeStatusMutation } from '../../../hooks/useChat';

export default interface CloseConversationFormProps
{
    conversationID: number;
    onCancel: () => any;
    currentUser: User;
    closeConversationMutation: ChangeStatusMutation;
}
