import { ThemeActions } from '../actions/ThemeActions';
import { ReducerHandler } from './ReducerHandler';

export default interface ThemeReducer {
    mode: ThemeMode
}

export type ThemeReducerHandler = {
    [key in ThemeActions['type']]: ReducerHandler<ThemeReducer>;
}

export type ThemeMode = 'black' | 'white';
