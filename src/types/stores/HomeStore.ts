import BaseStore from './BaseStore';
import HomeReducer from '../reducers/HomeReducer';

export default interface HomeStore extends BaseStore {
    home: HomeReducer;
}

export type GetAppStore = () => HomeStore;
