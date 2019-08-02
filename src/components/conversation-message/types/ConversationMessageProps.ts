import Message from '../../../types/graphql/Message';

export default interface ConversationMessageProps
{
    message: Message;
    isSelf?: boolean;
}
