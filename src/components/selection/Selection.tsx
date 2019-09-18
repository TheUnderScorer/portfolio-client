import * as React from 'react';
import SelectionProps from './types/SelectionProps';
import { SelectionContainer, SelectionItem } from './styled';
import { SmallText, Text } from '../styled/typography';
import { Flex } from '../styled/wrappers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Selection<T extends string>( { options, onSelection }: SelectionProps<T> )
{
    const handleSelection = ( id: T ) => () =>
    {
        onSelection( id );
    };

    return (
        <SelectionContainer>
            { options.map( ( { icon, subTitle, title, id } ) =>
                <SelectionItem key={ id } onClick={ handleSelection( id as T ) }>
                    { icon }
                    <Flex inline={ true } flexDirection="column" as="span">
                        <Text className="text">
                            { title }
                        </Text>
                        { subTitle &&
                          <SmallText className="small-text">
                              { subTitle }
                          </SmallText>
                        }
                    </Flex>
                    <FontAwesomeIcon className="arrow" icon="angle-right"/>
                </SelectionItem>
            ) }
        </SelectionContainer>
    )
}

export default Selection;
