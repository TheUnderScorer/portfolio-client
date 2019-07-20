import BaseStore from './BaseStore';
import HomeReducer from '../reducers/HomeReducer';
import ContactReducer from '../reducers/ContactReducer';

export default interface HomeStore extends BaseStore
{
    home: HomeReducer;
    contact: ContactReducer;
}

export type GetAppStore = () => HomeStore;
