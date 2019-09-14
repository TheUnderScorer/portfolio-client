import { ThemeActions } from '../actions/ThemeActions';
import { ReducerHandler } from './ReducerHandler';

export default interface ThemeReducer
{
    mode: ThemeMode
}

export type ThemeReducerHandler = Record<ThemeActions['type'], ReducerHandler<ThemeReducer>>

// TODO Refactor for light and dark (or just use PaletteType from @material-ui)
export type ThemeMode = 'black' | 'white';
