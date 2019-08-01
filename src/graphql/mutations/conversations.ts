import { MESSAGE_FRAGMENT } from '../fragments/conversations';
import gql from 'graphql-tag';

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
        message: sendMessage(messageInput: $input) {
            ...MessageFragment
        }
    }
    ${MESSAGE_FRAGMENT}
`;
