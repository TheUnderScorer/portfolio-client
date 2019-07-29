import * as React from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { List } from '@material-ui/core';
import { HelperText } from './styled';
import { H6, Text } from '../styled/typography';

const Conversation = ( { query, creationMutation }: ConversationProps ) =>
{
    const { data: result, loading: queryLoading } = query;

    const [ , mutationResult ] = creationMutation;
    const { loading: mutationLoading } = mutationResult;

    return (
        <div>
            <Loader active={ mutationLoading || queryLoading } asOverlay={ true } svgProps={ {
                width:  '30%',
                height: '30%'
            } }/>
            { result && result.conversation &&
              <List>
                  { !result.conversation.messages.length &&
                    <HelperText>
                        <H6 display="block">
                            Hello there!
                        </H6>
                        <Text>
                            Write your message below in order to start conversation with me!
                        </Text>
                    </HelperText>
                  }
              </List>
            }
        </div>
    )

};

export default Conversation;
