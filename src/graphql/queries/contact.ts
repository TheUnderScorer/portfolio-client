import { gql } from 'apollo-boost';

export const SEND = gql`
    mutation Send($input: ContactInput!) {
        send(contactInput: $input) {
            id
        }
    }
`;
