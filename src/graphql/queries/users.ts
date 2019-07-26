import { gql } from 'apollo-boost';

export const GET_ME = gql`
    {
        user:me {
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
        user:createUser(userInput: $input) {
            id,
            name,
            email,
            token {
                value
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser ($input: UserInput!) {
        updateUser(userInput: $input) {
            id,
            name,
            email
        }
    }
`;

export const UPDATE_LOGIN_DATE = gql`
    mutation {
        user:updateLoginDate {
            lastLogin
        }
    }
`;

export const UPDATE_ME = gql`
    mutation UpdateMe ($input: UserInput!) {
        updateMe(userInput: $input) {
            id,
            name,
            email
        }
    }
`;
