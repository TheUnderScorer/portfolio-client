import * as React from 'react';
import { ReactElement } from 'react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, ReactWrapper, render } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MockedProviderProps } from '@apollo/react-testing/lib/mocks/MockedProvider';

export type MountWithStoreResult<Props, Store> = {
    component: ReactWrapper<Props>,
    store: MockStoreEnhanced<Store>
}

export const renderWithStore = ( component: ReactElement, initialState: any ): Cheerio =>
{

    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    return render( <Provider store={ store }>
        { component }
    </Provider>, )

};

export function mountWithStore<Props = any, Store extends object = {}>( component: ReactElement<Props>, initialState: Store, apolloClientProps: MockedProviderProps = {} ): MountWithStoreResult<Props, Store>
{

    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    return {
        component: mount(
            <Provider store={ store }>
                <MockedProvider { ...apolloClientProps }>
                    { component }
                </MockedProvider>
            </Provider>
        ),
        store:     store as any
    }

}
