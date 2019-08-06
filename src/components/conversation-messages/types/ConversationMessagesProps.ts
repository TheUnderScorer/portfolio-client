import Conversation from '../../../types/graphql/Conversation';

export default interface ConversationMessagesProps
{
    conversation: Conversation;
    loading?: boolean;
    onLoadMore: ( page: number ) => any;
    hasMore?: boolean;
    onCloseClick: () => any;
}
