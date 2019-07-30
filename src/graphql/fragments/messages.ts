import gql from 'graphql-tag';

export const MESSAGE_FRAGMENT = gql`
    fragment MessageFragment on Message {
        id,
        content,
        author {
            id,
            name,
            email,
            role,
            lastLogin
        }
    }
`;
