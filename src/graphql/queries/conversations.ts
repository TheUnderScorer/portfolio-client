import { gql } from 'apollo-boost';

export const GET_CONVERSATIONS = gql`
    query GetConversations($page: Int, $perPage: Int) {
        myConversations(page: $page, perPage:$perPage) {
            id,
            title,
            messages {
                id,
                content,
                author {
                    name
                },
                createdAt
            }
        }
    }
`;
