import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ConversationMessagesProps from './types/ConversationMessagesProps';
import { HelperText, List } from './styled';
import { A, H6, Text } from '../styled/typography';
import useCurrentUser from '../../hooks/useCurrentUser';
import usePrevious from '../../hooks/usePrevious';
import { smoothScroll } from '../../utils/scroll';
import ConversationMessage from '../conversation-message/ConversationMessage';


const ConversationMessages = ( { conversation }: ConversationMessagesProps ) =>
{
    const { messages } = conversation;
    const prevMessagesLength = usePrevious( messages.length );

    const [ isScrolling, setScrolling ] = useState( false );

    const { data: userData } = useCurrentUser();

    const listRef = useRef<any>();

    useEffect( () =>
    {
        if ( !listRef.current || prevMessagesLength === messages.length || isScrolling ) {
            return;
        }

        setScrolling( true );

        const list = listRef.current as HTMLElement;

        smoothScroll(
            list.scrollHeight,
            500,
            list
        ).then( () => setScrolling( false ) );

    }, [ messages.length, prevMessagesLength, listRef, isScrolling ] );

    if ( !userData ) {
        return null;
    }

    const { user } = userData;

    return (
        <List ref={ listRef }>
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
            { messages.length > 0 &&
              <>
                  <HelperText>
                      <Text>
                          This is start of your current conversation with me.
                          <br/>
                          <A underlined={ true }>Click here to close this conversation.</A>
                      </Text>
                  </HelperText>
                  { messages.map( ( message, index ) =>
                  {
                      const nextMessage = messages[ index + 1 ];
                      const prevMessage = index > 0 ? messages[ index - 1 ] : null;

                      return <ConversationMessage isFirstMessage={ index === 0 } prevMessage={ prevMessage } nextMessage={ nextMessage } key={ message.id } message={ message } isSelf={ message.author.id === user.id }/>
                  } ) }
              </>
            }
        </List>
    )
};

export default ConversationMessages;
