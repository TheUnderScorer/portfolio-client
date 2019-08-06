import { ReducerHandlers } from '../types/reducers/ReducerHandler';
import Action from '../types/actions/Action';

/**
 *  Builds reducer basing on provided handlers (that are connected to action types) and initial state
 * */
const reducer = <State, Actions extends Action<any>>( handlers: ReducerHandlers<Actions, State>, initialState: State ) => ( state: State = initialState, action: Action<any> ): State =>
{

    if ( !action ) {
        return state;
    }

    if ( !action.type || !handlers[ action.type ] ) {
        return state;
    }

    return handlers[ action.type ]( state, action.payload );

};

export default reducer;
