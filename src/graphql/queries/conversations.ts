import { gql } from 'apollo-boost';

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
    query MyConversation($page: Int = 1, $perPage: Int = 15) {
        conversation:getCurrentConversation{
            id,
            title,
            createdAt,
            messages(perPage: $perPage, page: $page) {
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


