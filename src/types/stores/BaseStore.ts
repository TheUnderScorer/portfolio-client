import UserReducer from '../reducers/UserReducer';
import ThemeReducer from '../reducers/ThemeReducer';

export default interface BaseStore {
    user: UserReducer;
    theme: ThemeReducer;
}

export type GetBaseStore = () => BaseStore;
