import * as React from 'react';
import { ReactElement } from 'react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, ReactWrapper, render } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MockedProviderProps } from '@apollo/react-testing/lib/mocks/MockedProvider';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import colors, { getBaseTextColor, getPrimary } from '../components/styled/colors';
import { ThemeProvider } from 'styled-components';

export interface MountWithStoreResult<Props extends object, Store extends object>
{
    component: ReactWrapper<Props>,
    store: MockStoreEnhanced<Store>
}

export interface RenderWithStoreResult<Store extends object>
{
    component: Cheerio,
    store: MockStoreEnhanced<Store>
}

export function renderWithStore<Props extends object = any, Store extends object = {}>(
    component: ReactElement<Props>,
    initialState: Store,
    apolloClientProps: MockedProviderProps = {} ): RenderWithStoreResult<Store>
{
    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );
    const materialTheme = createMuiTheme();

    const componentRendered = render(
        <Provider store={ store }>
            <MockedProvider { ...apolloClientProps }>
                <MaterialThemeProvider theme={ materialTheme }>
                    { component }
                </MaterialThemeProvider>
            </MockedProvider>
        </Provider>
    );

    return {
        component: componentRendered,
        store:     store as any
    }
}

export function mountWithStoreAndApollo<Props extends object = any, Store extends object = {}>(
    component: ReactElement<Props>,
    initialState: Store                    = {} as any,
    apolloClientProps: MockedProviderProps = {} ): MountWithStoreResult<Props, Store>
{
    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    const materialTheme = createMuiTheme( {
        palette: {
            primary:    {
                main: getPrimary( 'light' ),
            },
            error:      {
                main: colors.red
            },
            text:       {
                primary: getBaseTextColor( 'light' )
            },
            common:     {
                white: colors.white,
                black: colors.black,
            },
            type:       'light',
            background: {
                default: colors.white,
                paper:   colors.lightBg,
            },
            divider:    colors.lightBg,
            action:     {
                active: colors.lightBg
            }
        },
        spacing: ( ( factor: number ) => `${ factor }rem` ) as any,
    } );

    return {
        component: mount(
            <MockedProvider { ...apolloClientProps }>
                <Provider store={ store }>
                    <MaterialThemeProvider theme={ materialTheme }>
                        <ThemeProvider theme={ materialTheme }>
                            { component }
                        </ThemeProvider>
                    </MaterialThemeProvider>
                </Provider>
            </MockedProvider>
        ),
        store:     store as any
    }
}
