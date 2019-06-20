import UserReducer from '../reducers/UserReducer';
import ThemeReducer from '../reducers/ThemeReducer';

export default interface HomeStore {
    user: UserReducer;
    theme: ThemeReducer;
}

export type GetAppStore = () => HomeStore;
