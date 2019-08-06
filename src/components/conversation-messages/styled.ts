import styled from 'styled-components';
import colors from '../styled/colors';
import InfiniteScroll from 'react-infinite-scroller';

export const ListContainer = styled.div`
    flex: 1;
    width: 100%;
    overflow: auto;
    padding: 1em 0;
`;

export const List = styled( InfiniteScroll )`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    width: 100%;
    padding: 0;
`;

export const HelperText = styled.li`
    padding: 1em 2em 2em;
    border-bottom: 1px solid ${ colors.lightBorder };
    font-size: 0.9em;
    width: 100%;
    line-height: 1.5em;
    margin-bottom: 2em;

    h6 {
        display: block;
        margin-bottom: 1em;
    }
`;
