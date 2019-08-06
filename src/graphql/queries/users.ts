import { gql } from 'apollo-boost';

export const GET_ME = gql`
    {
        user:me {
            id,
            name,
            email,
            lastLogin,
            token {
                value
            }
        }
    }
`;

