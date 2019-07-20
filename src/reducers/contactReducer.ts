import reducer from './reducer';
import ContactReducer, { ContactReducerHandler } from '../types/reducers/ContactReducer';

const initialState: ContactReducer = {
    active: false,
};

const handlers: ContactReducerHandler = {
    SetContactType:   ( state, type ) => ( {
        ...state,
        type
    } ),
    SetContactActive: ( state, active ) => ( {
        ...state,
        active
    } )
};

export default reducer( handlers, initialState );
