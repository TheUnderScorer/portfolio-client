import * as React from 'react';
import { useCallback } from 'react';
import SelectionProps from './types/SelectionProps';
import { SelectionContainer, SelectionItem } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemAvatar, ListItemText } from '@material-ui/core';

function Selection<T extends string>( { options, onSelection }: SelectionProps<T> )
{
    const handleSelection = useCallback( ( id: T ) => () =>
    {
        onSelection( id );
    }, [ onSelection ] );

    return (
        <SelectionContainer>
            { options.map( ( { icon, subTitle, title, id } ) =>
                <SelectionItem key={ id } onClick={ handleSelection( id as T ) }>
                    <ListItemAvatar>
                        { icon }
                    </ListItemAvatar>
                    <ListItemText primary={ title } secondary={ subTitle }/>
                    <FontAwesomeIcon className="arrow" icon="angle-right"/>
                </SelectionItem>
            ) }
        </SelectionContainer>
    )
}

export default Selection;
