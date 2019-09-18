import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const ErrorMessage = styled( Typography ).attrs( {
    color:   'error',
    variant: 'body2'
} )`
    font-size: 0.80em;
    text-align: left;
`;
