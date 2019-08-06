import styled from 'styled-components';
import { Flex } from '../styled/wrappers';

export const ErrorMessageWrapper = styled( Flex ).attrs( {
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'column'
} )`
    padding: 1rem;
    flex: 1;
    
    h5 {
        margin-bottom: 1em;
    }
    
    svg {
        font-size: 5rem;
    }
`;
