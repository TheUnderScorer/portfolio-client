import { gql } from 'apollo-boost';

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation ($input: ConversationInput) {
        conversation: createConversation(conversationInput: $input) {
            id,
            title,
            createdAt,
            messages{
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
