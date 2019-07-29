import Message from './Message';
import User from './User';
import Model from './Model';

export default interface Conversation extends Model
{
    title?: string;
    createdAt: number;
    messages: Message[];
    author?: User;
}
