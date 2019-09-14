import { ThemeMode } from '../../types/reducers/ThemeReducer';

// TODO Refactor 

const colors = {
    buttons:      {
        mainBg: '#364366',
        cta:    '#FD523A',
    },
    white:        '#fefefe',
    black:        '#000000',
    lightBlue:    '#4e8fd1',
    darkBlue:     '#00354D',
    orange:       '#FD5A36',
    lightBorder:  '#ebebeb',
    darkerBorder: '#BDBDBD',
    pink:         '#FD523A',
    lightBg:      '#f5f5f5',
    lightbgAlt:   '#f7f7f7',
    violet:       '#8C43FF',
    dark:         '#424242',
    lightDark:    '#797979',
    green:        '#289c28',
    lightGreen:   '#9bd559',
    red:          '#fd3417',
    grey:         '#F7F7F7'
};

export const getPrimary = ( mode: ThemeMode ): string =>
{
    return mode === 'black' ? colors.lightBlue : colors.orange;
};

export const getPrimaryVariation = ( mode: ThemeMode ): string =>
{
    return mode === 'black' ? colors.lightBlue : colors.pink;
};

export const getPrimaryLight = ( mode: ThemeMode ): string =>
{
    return mode === 'black' ? 'rgba(78, 143, 209, 0.2)' : 'rgba(253, 82, 58, 0.2)'
};

export const getBaseTextColor = ( mode: ThemeMode ): string =>
{
    return mode === 'black' ? colors.white : colors.dark;
};

export default colors;
