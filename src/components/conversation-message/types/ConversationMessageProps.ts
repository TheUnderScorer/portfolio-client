import Message from '../../../types/graphql/Message';

export default interface ConversationMessageProps
{
    message: Message;
    showDate?: boolean;
    isSelf?: boolean;
    isFirstMessage?: boolean;
    nextMessage?: Message | null;
    prevMessage?: Message | null;
}
