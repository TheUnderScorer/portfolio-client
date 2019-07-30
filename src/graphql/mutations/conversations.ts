import { gql } from 'apollo-boost';
import { MESSAGE_FRAGMENT } from '../fragments/conversations';

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation ($input: ConversationInput) {
        conversation: createConversation(conversationInput: $input) {
            id,
            title,
            createdAt,
            messages{
                id,
                content,
                createdAt,
                author {
                    id,
                    name,
                    email,
                    role
                }
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation SendMessage($input: MessageInput!) {
        sendMessage(messageInput: $input) {
            ...MessageFragment
        }
        ${MESSAGE_FRAGMENT}
    }
`;
