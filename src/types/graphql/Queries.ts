import User from './User';
import Conversation from './Conversation';
import Message from './Message';

export interface GetMeResult
{
    me: User;
}

export interface GetConversationsResult
{
    conversations: Conversation[];
}

export interface ConversationResult
{
    conversation: Conversation;
}

export interface GetMessagesResult
{
    messages: Message[];
}

export interface MessageResult
{
    message: Message;
}
