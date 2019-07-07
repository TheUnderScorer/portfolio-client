import { Action as ReduxAction } from 'redux';

export default interface Action<Type> extends ReduxAction<Type> {
    payload: any;
}
