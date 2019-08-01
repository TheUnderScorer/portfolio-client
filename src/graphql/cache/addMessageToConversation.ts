import { DataProxy } from 'apollo-cache'
import { ConversationResult, MessageResult } from '../../types/graphql/Queries';
import { MY_CONVERSATION } from '../queries/conversations';

export default ( cache: DataProxy, data?: MessageResult ) =>
{
    const conversationResult = cache.readQuery<ConversationResult>( {
        query: MY_CONVERSATION
    } );

    if ( !conversationResult || !data ) {
        return;
    }

    const conversation = { ...conversationResult.conversation };

    conversation.messages.push( data.message );

    cache.writeQuery<ConversationResult>( {
        query: MY_CONVERSATION,
        data:  {
            conversation
        }
    } );
}
