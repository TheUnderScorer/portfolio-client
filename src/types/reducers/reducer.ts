import { ReducerHandler } from './ReducerHandler';
import Action from '../actions/Action';

export type Reducer<Actions extends Action<any>, State> = {
    // @ts-ignore
    [key in keyof Actions['type']]: ReducerHandler<State>;
}
