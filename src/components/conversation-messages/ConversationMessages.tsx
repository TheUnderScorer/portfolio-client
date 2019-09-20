import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ConversationMessagesProps from './types/ConversationMessagesProps';
import { HelperText, List, ListContainer } from './styled';
import useCurrentUser from '../../hooks/useCurrentUser';
import usePrevious from '../../hooks/usePrevious';
import { smoothScroll } from '../../utils/scroll';
import ConversationMessage from '../conversation-message/ConversationMessage';
import Loader from '../loader/Loader';
import { isEmpty } from 'lodash';
import { Typography } from '@material-ui/core';
import { Button } from '../styled/buttons';

const ConversationMessages = ( { conversation, hasMore, onLoadMore, onCloseClick }: ConversationMessagesProps ) =>
{
    const { messages } = conversation;
    const prevMessagesLength = usePrevious( messages.length );

    const [ isScrolling, setScrolling ] = useState( false );
    const [ didInitialScroll, setDidInitialScroll ] = useState( false );
    const [ isPaginationEvent, setIsPaginationEvent ] = useState( false );
    const [ page, setPage ] = useState( 1 );

    const { data: userData } = useCurrentUser();

    const listRef = useRef<any>();
    const prevListRef = usePrevious( listRef.current );

    useEffect( () =>
    {
        if ( !listRef.current || ( prevMessagesLength === messages.length && prevListRef ) || isScrolling || isPaginationEvent ) {
            return;
        }

        setScrolling( true );

        const list = listRef.current as HTMLElement;

        smoothScroll(
            list.scrollHeight,
            500,
            list
        ).then( () =>
        {
            if ( !didInitialScroll ) {
                setDidInitialScroll( true );
            }

            setScrolling( false )
        } );

    }, [ messages.length, prevMessagesLength, listRef, isScrolling, didInitialScroll, isPaginationEvent ] );

    useEffect( () =>
    {
        if ( prevMessagesLength === messages.length || !isPaginationEvent ) {
            return;
        }

        setIsPaginationEvent( false );
    }, [ isPaginationEvent, messages.length, prevMessagesLength ] );

    // Disables pagination event after hasMore flag have changed to false
    useEffect( () =>
    {
        if ( !hasMore ) {
            setIsPaginationEvent( false );
        }
    }, [ hasMore ] );

    const getScrollParent = () => listRef.current;

    const handleLoadMore = useCallback( async () =>
    {
        if ( isPaginationEvent ) {
            return;
        }

        const newPage = page + 1;
        setPage( newPage );

        setIsPaginationEvent( true );

        await onLoadMore( newPage );
    }, [ onLoadMore, isPaginationEvent ] );

    if ( !userData || isEmpty( userData ) ) {
        return null;
    }

    const { user } = userData;

    return (
        <ListContainer className={ `messages ${ didInitialScroll ? 'did-initial-scroll' : '' }` } ref={ listRef }>
            <List
                element="ul"
                initialLoad={ false }
                getScrollParent={ getScrollParent }
                isReverse={ true }
                pageStart={ 1 }
                loadMore={ handleLoadMore }
                hasMore={ hasMore && didInitialScroll }
                useWindow={ false }
                threshold={ 50 }
                loader={ <Loader as="li" active={ true } key={ 0 } width="100%" height="50px"/> }
            >
                { !messages.length &&
                  <HelperText>
                      <Typography variant="h6" gutterBottom={ false }>
                          Hi!
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle1">
                          Write your message below.
                      </Typography>

                  </HelperText>
                }
                { messages.length > 0 &&
                  <>
                      { !hasMore &&
                        <HelperText>
                            <Typography variant="body1" color="textPrimary">
                                This is the start of your current conversation with me.
                            </Typography>
                            <Button color="primary" onClick={ onCloseClick }>
                                Close conversation
                            </Button>
                        </HelperText>
                      }
                      { messages.map( ( message, index ) =>
                      {
                          const nextMessage = messages[ index + 1 ];
                          const prevMessage = index > 0 ? messages[ index - 1 ] : null;

                          return <ConversationMessage isFirstMessage={ index === 0 } prevMessage={ prevMessage } nextMessage={ nextMessage } key={ message.id } message={ message } isSelf={ message.author.id === user.id }/>
                      } ) }
                  </>
                }

            </List>
        </ListContainer>
    )
};

export default ConversationMessages;
