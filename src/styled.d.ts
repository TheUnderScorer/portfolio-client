import 'styled-components'
import { Shape } from '@material-ui/core/styles/shape';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import { Mixins } from '@material-ui/core/styles/createMixins';
import { Overrides } from '@material-ui/core/styles/overrides';
import { Palette } from '@material-ui/core/styles/createPalette';
import { ComponentsProps } from '@material-ui/core/styles/props';
import { Shadows } from '@material-ui/core/styles/shadows';
import { Spacing } from '@material-ui/core/styles/createSpacing';
import { Direction, Transitions } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/styles/createTypography';
import { ZIndex } from '@material-ui/core/styles/zIndex';

declare module 'styled-components'
{

    export interface DefaultTheme
    {
        shape: Shape;
        breakpoints: Breakpoints;
        direction: Direction;
        mixins: Mixins;
        overrides?: Overrides;
        palette: Palette;
        props?: ComponentsProps;
        shadows: Shadows;
        spacing: Spacing;
        transitions: Transitions;
        typography: Typography;
        zIndex: ZIndex;
    }
}
