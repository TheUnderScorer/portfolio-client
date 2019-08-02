import * as React from 'react';
import ConversationMessagesProps from './types/ConversationMessagesProps';
import { HelperText, List } from './styled';
import { H6, Text } from '../styled/typography';
import useCurrentUser from '../../hooks/useCurrentUser';
import ConversationMessage from '../conversation-message/ConversationMessage';

const ConversationMessages = ( { conversation }: ConversationMessagesProps ) =>
{
    const { messages } = conversation;

    const { data: userData } = useCurrentUser();

    if ( !userData ) {
        return null;
    }

    const { user } = userData;

    return (
        <List>
            { !messages.length &&
              <HelperText>
                  <H6 display="block">
                      Hello there!
                  </H6>
                  <Text>
                      Write your message below in order to start conversation with me!
                  </Text>
              </HelperText>
            }
            { messages.length && messages.map( message =>
                <ConversationMessage message={ message } isSelf={ message.author.id === user.id }/>
            ) }
        </List>
    )
};

export default ConversationMessages;
