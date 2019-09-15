import ThemeReducer, { ThemeMode, ThemeReducerHandler } from '../types/reducers/ThemeReducer';
import reducer from './reducer';

const localMode = localStorage.getItem( 'themeMode' ) as ThemeMode;

const initialState: ThemeReducer = {
    mode: localMode ? localMode : 'light'
};

const handlers: ThemeReducerHandler = {
    SetThemeMode: ( state, mode: ThemeMode ) =>
                  {
                      localStorage.setItem( 'themeMode', mode );

                      return {
                          ...state,
                          mode
                      }
                  }
};

export default reducer( handlers, initialState );
