import { Provider, useSelector } from 'react-redux';
import homeStore from '../stores/homeStore';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import HomeStore from '../types/stores/HomeStore';
import { createMuiTheme } from '@material-ui/core';
import colors, { getBaseTextColor, getPrimary } from '../components/styled/colors';
import GlobalStyle from '../components/styled/GlobalStyle';
import ReactProps from '../types/ReactProps';

export const StoryDecorator = ( storyFn: Function ) =>
{
    return (
        <Wrapper>
            <StoryWrapper>
                { storyFn() }
            </StoryWrapper>
        </Wrapper>
    )
};

const StoryWrapper = ( { children }: ReactProps ) =>
{
    const theme = useSelector( ( store: HomeStore ) => store.theme );

    // TODO Setup pallete for light and dark
    const materialTheme = createMuiTheme( {
        palette: {
            primary: {
                main: getPrimary( theme.mode ),
            },
            error:   {
                main: colors.red
            },
            text:    {
                secondary: getBaseTextColor( theme.mode )
            }
        },
    } );

    return (

        <ThemeProvider theme={ { mode: theme.mode } }>
            <MaterialThemeProvider theme={ materialTheme }>
                <GlobalStyle/>
                { children }
            </MaterialThemeProvider>
        </ThemeProvider>

    )
};

const Wrapper = ( { children }: ReactProps ) =>
{
    return (
        <Provider store={ homeStore }>
            { children }
        </Provider>
    );
};
