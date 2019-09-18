import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const IconMessageWrapper = styled( Grid ).attrs( {
    alignItems: 'center',
    justify:    'center',
    direction:  'column',
    container:  true,
} )`
    padding: 1rem;
    flex: 1;
    width: 100%;
    
    svg {
        font-size: 5rem;
        margin-bottom: ${ props => props.theme.spacing( 0.1 ) };
    }
`;
