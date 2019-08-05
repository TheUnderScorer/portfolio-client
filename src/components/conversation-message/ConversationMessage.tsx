import * as React from 'react';
import ConversationMessageProps from './types/ConversationMessageProps';
import moment from 'moment';
import { DateHeadline, MessageDate, MessageItem, MessageText } from './styled';
import { Text } from '../styled/typography';
import { Tooltip } from '@material-ui/core';
import { DateFormats } from '../../types/common/DateFormats';

const ConversationMessage = ( { message, showDate = true, prevMessage, isSelf = false, isFirstMessage = false, nextMessage }: ConversationMessageProps ) =>
{
    const date = moment( message.createdAt );

    const prevMessageDate = prevMessage ? moment( prevMessage.createdAt ) : null;
    const nextMessageDate = nextMessage ? moment( nextMessage.createdAt ) : null;

    const displayDate = showDate && ( !nextMessageDate || nextMessageDate.format( DateFormats.DateTime ) !== date.format( DateFormats.DateTime ) );
    const displayDateHeadline = !isFirstMessage && ( !!prevMessageDate && prevMessageDate.format( 'DD' ) !== date.format( 'DD' ) );
    const marginTop = !isFirstMessage && !!prevMessageDate && prevMessageDate.format( DateFormats.DateTime ) !== date.format( DateFormats.DateTime );

    return <>
        { displayDateHeadline &&
          <DateHeadline>
              <Text>
                  { date.calendar( undefined, {
                      sameDay:  '[Today]',
                      nextDay:  '[Tomorrow]',
                      nextWeek: 'dddd',
                      lastDay:  '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'DD/MM/YYYY'
                  } ) }
              </Text>
          </DateHeadline>
        }
        <MessageItem marginTop={ marginTop } isSelf={ isSelf }>
            <Tooltip placement="top-start" title={ date.format( 'DD/MM/YYYY HH:mm' ) }>
                <MessageText isSelf={ isSelf }>
                    { message.content }
                </MessageText>
            </Tooltip>
            { displayDate &&
              <MessageDate>
                  { date.format( 'H:mm' ) }
              </MessageDate>
            }
        </MessageItem>
    </>
};

export default ConversationMessage;
