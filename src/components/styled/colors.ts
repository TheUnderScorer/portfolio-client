import { ThemeMode } from '../../types/reducers/ThemeReducer';

const colors = {
    buttons:      {
        mainBg: '#364366',
        cta:    '#FD523A',
    },
    white:        '#ffffff',
    black:        '#000000',
    primary:      '',
    lightBlue:    '#4e8fd1',
    darkBlue:     '#00354D',
    orange:       '#FD5A36',
    lightBorder:  '#ebebeb',
    darkerBorder: '#BDBDBD',
    pink:         '#FD523A',
    lightBg:      '#fafbfc',
    violet:       '#8C43FF',
    dark:         '#424242',
    lightDark:    '#797979'
};
colors.primary = colors.lightBlue;

export const getPrimary = ( mode: ThemeMode ): string => {
    return mode === 'black' ? colors.lightBlue : colors.pink;
};

export default colors;
