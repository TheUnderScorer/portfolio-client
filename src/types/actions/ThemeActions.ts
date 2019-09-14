import { ThemeMode } from '../reducers/ThemeReducer';
import Action from './Action';

export interface SetThemeMode extends Action<'SetThemeMode'>
{
    payload: ThemeMode;
}

export type ThemeActions = SetThemeMode;
