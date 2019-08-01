import * as React from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { ConversationContainer, ConversationList, HelperText } from './styled';
import { H6, Text } from '../styled/typography';
import ConversationEditor from '../conversation-editor/ConversationEditor';

const Conversation = ( { query, creationMutation, messageCreationMutation }: ConversationProps ) =>
{
    const { data: result, loading: queryLoading } = query;

    const [ , mutationResult ] = creationMutation;
    const { loading: mutationLoading } = mutationResult;

    return (
        <ConversationContainer>
            <Loader active={ mutationLoading || queryLoading } asOverlay={ true } svgProps={ {
                width:  '30%',
                height: '30%'
            } }/>
            { result && result.conversation &&
              <>
                  <ConversationList>
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
                  </ConversationList>
                  <ConversationEditor mutation={ messageCreationMutation } disabled={ queryLoading } conversationID={ result ? result.conversation.id : 0 }/>
              </>
            }
        </ConversationContainer>
    )

};

export default Conversation;
