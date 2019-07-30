import gql from 'graphql-tag';
import { MESSAGE_FRAGMENT } from '../fragments/conversations';

export const NEW_MESSAGE = gql`
    subscription {
        message: newMessage {
            ...MessageFragment
        }
        ${MESSAGE_FRAGMENT}
    }
`;
