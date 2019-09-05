import * as React from 'react';
import { ReactElement } from 'react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, ReactWrapper, render } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MockedProviderProps } from '@apollo/react-testing/lib/mocks/MockedProvider';

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

    const componentRendered = render(
        <Provider store={ store }>
            <MockedProvider { ...apolloClientProps }>
                { component }
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
    initialState: Store,
    apolloClientProps: MockedProviderProps = {} ): MountWithStoreResult<Props, Store>
{
    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    return {
        component: mount(
            <MockedProvider { ...apolloClientProps }>
                <Provider store={ store }>
                    { component }
                </Provider>
            </MockedProvider>
        ),
        store:     store as any
    }
}
