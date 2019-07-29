import styled from 'styled-components';
import colors from '../styled/colors';

export const HelperText = styled.li`
    padding: 1em 2em 2em;
    border-bottom: 1px solid ${ colors.lightBorder };
    font-size: 0.9em;

    h6 {
        display: block;
        margin-bottom: 1em;
    }
`;
