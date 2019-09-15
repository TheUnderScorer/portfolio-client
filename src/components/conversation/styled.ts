import styled from 'styled-components';
import { Grid, List } from '@material-ui/core';
import { FlexProps } from '../styled/types';

export const ConversationContainer = styled( Grid ).attrs<FlexProps>( {
    direction: 'column',
    container: true
} )`
    height: 100%;
`;

export const ConversationList = styled( List )`
    flex: 1;
`;
