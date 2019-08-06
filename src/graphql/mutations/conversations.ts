import { CONVERSATION_FRAGMENT, MESSAGE_FRAGMENT } from '../fragments/conversations';
import gql from 'graphql-tag';

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation ($input: ConversationInput) {
        conversation: createConversation(conversationInput: $input) {
            ...ConversationFragment
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
    ${CONVERSATION_FRAGMENT}
`;

export const CHANGE_STATUS = gql`
    mutation ChangeStatus($input: ChangeConversationStatusInput!) {
        changeStatus(input: $input) {
            ...ConversationFragment
        }
    }
    ${CONVERSATION_FRAGMENT}
`;

export const SEND_MESSAGE = gql`
    mutation SendMessage($input: MessageInput!) {
        message: sendMessage(messageInput: $input) {
            ...MessageFragment
        }
    }
    ${MESSAGE_FRAGMENT}
`;
