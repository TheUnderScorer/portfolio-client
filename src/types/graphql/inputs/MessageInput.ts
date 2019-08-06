import Message from '../Message';

export default interface MessageInput extends Partial<Message>
{
    conversationID: number;
    content: string;
}

export interface MessageInputVariable
{
    input: MessageInput;
}
