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
    
    h5 {
        margin-bottom: ${ props => props.theme.spacing( 0.5 ) };
    }
    
    svg {
        font-size: 5rem;
        margin-bottom: ${ props => props.theme.spacing( 0.1 ) };
    }
`;
