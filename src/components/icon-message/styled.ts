import styled from 'styled-components';
import { Flex } from '../styled/wrappers';

export const IconMessageWrapper = styled( Flex ).attrs( {
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'column'
} )`
    padding: 1rem;
    flex: 1;
    width: 100%;
    
    h5 {
        margin-bottom: 1em;
    }
    
    svg {
        font-size: 5rem;
        margin-bottom: 0.1em;
    }
`;
