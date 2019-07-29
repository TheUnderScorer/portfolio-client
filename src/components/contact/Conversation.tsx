import * as React from 'react';
import { useEffect } from 'react';
import Loader from '../loader/Loader';
import ConversationProps from './types/ConversationProps';

const Conversation = ( { query, creationMutation }: ConversationProps ) =>
{
    const { data: conversationResult, loading: queryLoading } = query;

    const [ mutationFn, mutationResult ] = creationMutation;
    const { loading: mutationLoading } = mutationResult;

    useEffect( () =>
    {
        if ( !conversationResult ) {
            return;
        }

        if ( !conversationResult.conversation ) {
            mutationFn();
        }

    }, [ conversationResult ] );

    return (
        <Loader active={ mutationLoading || queryLoading } asOverlay={ true } svgProps={ {
            width:  '30%',
            height: '30%'
        } }/>
    )

};

export default Conversation;
