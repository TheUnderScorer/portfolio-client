import Message from './Message';
import User from './User';
import Model from './Model';

export enum ConversationStatuses
{
    'open'   = 'Open',
    'closed' = 'Closed'
}

export default interface Conversation extends Model
{
    title?: string;
    createdAt: number;
    messages: Message[];
    author?: User;
    status: ConversationStatuses;
}
