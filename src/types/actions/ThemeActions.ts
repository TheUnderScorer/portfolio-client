import { Action } from 'redux';
import { ThemeMode } from '../reducers/ThemeReducer';

export interface SetThemeMode extends Action<'SetThemeMode'> {
    payload: ThemeMode;
}

export type ThemeActions = SetThemeMode | any;
