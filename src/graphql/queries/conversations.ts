import { CONVERSATION_FRAGMENT, MESSAGE_FRAGMENT } from '../fragments/conversations';
import gql from 'graphql-tag';

export const MY_CONVERSATIONS = gql`
    query GetConversations($page: Int = 1, $perPage: Int = 15) {
        conversations:myConversations(page: $page, perPage:$perPage) {
            id,
            title,
            messages {
                id,
                content,
                author {
                    id,
                    name,
                },
                createdAt
            }
        }
    }
`;

export const MY_CONVERSATION = gql`
    query MyConversation($page: Int = 1, $perPage: Int = 30) {
        conversation:getCurrentConversation{
            ...ConversationFragment
            messages(perPage: $perPage, page: $page) {
                ...MessageFragment
            }
        }
    }
    ${MESSAGE_FRAGMENT}
    ${CONVERSATION_FRAGMENT}
`;


