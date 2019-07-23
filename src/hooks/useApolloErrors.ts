import { MutationResult, QueryHookResult } from 'react-apollo-hooks';
import useFilteredArray from './useFilteredArray';

export default ( initialState: Array<QueryHookResult<any, any> | MutationResult<any> | undefined> = [] ) =>
{
    return useFilteredArray( initialState, item => !!item && !!item.error );
}
