import Action from '../actions/Action';

export type ReducerHandler<State> = ( state: State, payload: any ) => State;

export type ReducerHandlers<Actions extends Action<any>, State> = {
    [key in keyof Actions['type']]: ReducerHandler<State>;
}
