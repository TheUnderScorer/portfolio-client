import * as React from 'react';
import ConversationMessageProps from './types/ConversationMessageProps';
import { MessageDate, MessageItem, MessageText } from './styled';
import moment from 'moment';

const ConversationMessage = ( { message, isSelf = false }: ConversationMessageProps ) =>
{
    const date = moment( message.createdAt );


    return (
        <MessageItem isSelf={ isSelf }>
            <MessageText isSelf={ isSelf }>
                { message.content }
            </MessageText>
            <MessageDate>
                { date.calendar() }
            </MessageDate>
        </MessageItem>
    )
};

export default ConversationMessage;
