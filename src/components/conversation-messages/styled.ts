import styled from 'styled-components';
import colors from '../styled/colors';
import InfiniteScroll from 'react-infinite-scroller';

export const ListContainer = styled.div`
    flex: 1;
    width: 100%;
    overflow: auto;
    padding: 1em 0;
    background-color: ${ props => props.theme.mode === 'black' ? colors.black : colors.white }
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
    padding: ${ props => props.theme.spacing( 1 ) } 0;
    border-bottom: 1px solid ${ colors.lightBorder };
    font-size: 0.9em;
    width: 100%;
    line-height: 1.5em;
    margin-bottom: 2em;
`;
