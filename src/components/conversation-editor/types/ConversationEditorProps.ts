import { MessageResult } from '../../../types/graphql/Queries';
import { MessageInputVariable } from '../../../types/graphql/inputs/MessageInput';
import { MutationTuple } from '@apollo/react-hooks';

export default interface ConversationEditorProps
{
    conversationID: number;
    initialContent?: string;
    mutation: MutationTuple<MessageResult, MessageInputVariable>;
    disabled?: boolean;
    afterSubmit?: () => any;
}

