import { ThemeMode } from '../../types/reducers/ThemeReducer';

const colors = {
    buttons:      {
        mainBg: '#364366',
        cta:    '#FD523A',
    },
    white:        '#ffffff',
    black:        '#000000',
    lightBlue:    '#4e8fd1',
    darkBlue:     '#00354D',
    orange:       '#FD5A36',
    lightBorder:  '#ebebeb',
    darkerBorder: '#BDBDBD',
    pink:         '#FD523A',
    lightBg:      '#f5f5f5',
    violet:       '#8C43FF',
    dark:         '#424242',
    lightDark:    '#797979',
    green:        '#289c28',
    lightGreen:   '#9bd559'
};

export const getPrimary = ( mode: ThemeMode ): string => {
    return mode === 'black' ? colors.lightBlue : colors.pink;
};

export const getPrimaryVariation = ( mode: ThemeMode ): string => {
    return mode === 'black' ? colors.lightBlue : colors.orange;
};

export default colors;
