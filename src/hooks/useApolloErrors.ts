import useFilteredArray from './useFilteredArray';
import { MutationResult, QueryResult } from '@apollo/react-common';

export default ( initialState: Array<QueryResult<any, any> | MutationResult<any> | undefined> = [] ) =>
{
    return useFilteredArray( initialState, item => !!item && !!item.error );
}
