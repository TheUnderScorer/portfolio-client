import gql from 'graphql-tag';

export const CONVERSATION_FRAGMENT = gql`
    fragment ConversationFragment on Conversation {
        id,
        title,
        createdAt,
        status,
    }
`;

export const MESSAGE_FRAGMENT = gql`
    fragment MessageFragment on Message {
        id,
        content,
        createdAt,
        author {
            id,
            name,
            email,
            role,
            lastLogin
        }
    }
`;
