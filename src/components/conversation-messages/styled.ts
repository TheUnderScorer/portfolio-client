import styled from 'styled-components';
import colors from '../styled/colors';
import { Flex } from '../styled/wrappers';
import { FlexProps } from '../styled/types';

export const List = styled( Flex ).attrs<FlexProps>( {
    as:            'ul',
    flex:          '1',
    flexDirection: 'column',
} )`
    list-style: none;
    padding: 1em;
    margin: 0;
    width: 100%;
    overflow: auto;
    
`;

export const HelperText = styled.li`
    padding: 1em 2em 2em;
    border-bottom: 1px solid ${ colors.lightBorder };
    font-size: 0.9em;

    h6 {
        display: block;
        margin-bottom: 1em;
    }
`;
