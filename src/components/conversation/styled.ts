import styled from 'styled-components';
import colors from '../styled/colors';
import { List } from '@material-ui/core';
import { Flex } from '../styled/wrappers';
import { FlexProps } from '../styled/types';

export const ConversationContainer = styled( Flex ).attrs<FlexProps>( {
    flexDirection: 'column'
} )`
    height: 100%;
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

export const ConversationList = styled( List )`
    flex: 1;
`;
