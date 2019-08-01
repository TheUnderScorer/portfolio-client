import { MutationFn, MutationResult } from 'react-apollo-hooks';
import { MessageResult } from '../../../types/graphql/Queries';
import { MessageInputVariable } from '../../../types/graphql/inputs/MessageInput';

export default interface ConversationEditorProps
{
    conversationID: number;
    mutation: [ MutationFn<MessageResult, MessageInputVariable>, MutationResult<MessageResult> ];
    disabled?: boolean;
}

