import { gql } from 'apollo-boost';

export const GET_ME = gql`
    {
        me {
            id,
            name,
            email,
            token {
                value
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser ($input: UserInput){
        createUser(userInput: $input) {
            id,
            name,
            token {
                value
            }
        }
    }
`;
