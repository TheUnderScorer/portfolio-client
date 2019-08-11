import ConversationInterface, { ConversationStatuses } from '../../types/graphql/Conversation';
import moment from 'moment';
import { DateFormats } from '../../types/common/DateFormats';
import mockUser from './mockUser';
import Message from '../../types/graphql/Message';
import * as faker from 'faker';
import User from '../../types/graphql/User';

const secondUser: User & any = {
    ...mockUser,
    id:    2,
    name:  faker.name.firstName(),
    email: faker.internet.email()
};

const messages: Array<Message & any> = [];

while ( messages.length < 50 ) {
    messages.push( {
        id:         messages.length,
        content:    faker.random.words(),
        author:     messages.length % 2 === 0 ? mockUser : secondUser,
        createdAt:  moment().subtract( 10 + messages.length, 'minutes' ).format( DateFormats.DateTime ),
        updatedAt:  moment().subtract( 10 + messages.length, 'minutes' ).format( DateFormats.DateTime ),
        __typename: 'Message'
    } );
}

const mockConversation: ConversationInterface & any = {
    id:         1,
    title:      '',
    createdAt:  0,
    status:     ConversationStatuses.open,
    messages:   [
        {
            id:         1,
            content:    'Test',
            author:     mockUser,
            createdAt:  moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
            updatedAt:  moment().subtract( 10, 'minutes' ).format( DateFormats.DateTime ),
            __typename: 'Message'
        }
    ],
    __typename: 'Conversation'
};

export default mockConversation;
