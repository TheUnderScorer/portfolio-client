import styled from 'styled-components';
import { List } from '@material-ui/core';
import { Flex } from '../styled/wrappers';
import { FlexProps } from '../styled/types';

export const ConversationContainer = styled( Flex ).attrs<FlexProps>( {
    flexDirection: 'column'
} )`
    height: 100%;
`;

export const ConversationList = styled( List )`
    flex: 1;
`;
