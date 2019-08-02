import * as React from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';
import { ConversationContainer } from './styled';
import ConversationEditor from '../conversation-editor/ConversationEditor';
import ConversationMessages from '../conversation-messages/ConversationMessages';

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
                  <ConversationMessages conversation={ result.conversation }/>
                  <ConversationEditor mutation={ messageCreationMutation } disabled={ queryLoading } conversationID={ result ? result.conversation.id : 0 }/>
              </>
            }
        </ConversationContainer>
    )

};

export default Conversation;
