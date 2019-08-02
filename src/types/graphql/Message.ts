import Conversation from './Conversation';
import Model from './Model';
import User from './User';

export default interface Message extends Model
{
    author: User;
    conversation?: Conversation;
    content: string;
    createdAt: number;
    updatedAt: number;
}
