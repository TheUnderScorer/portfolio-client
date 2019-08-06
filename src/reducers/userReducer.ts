import UserReducer, { UserReducerHandlers } from '../types/reducers/UserReducer';
import reducer from './reducer';
import { TOKEN_KEY } from '../graphql/auth';

const storedToken = localStorage.getItem( TOKEN_KEY ) as string;

const initialState: UserReducer = {
    token: storedToken ? storedToken : ''
};

const handlers: UserReducerHandlers = {
    SetToken: ( state, token ) =>
              {
                  localStorage.setItem( TOKEN_KEY, token );

                  return {
                      ...state,
                      token
                  }

              }
};

export default reducer( handlers, initialState );
