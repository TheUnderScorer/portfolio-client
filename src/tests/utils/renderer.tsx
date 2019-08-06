import * as React from 'react';
import { ReactElement } from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, render } from 'enzyme';

export const renderWithStore = ( component: ReactElement, initialState: any ): Cheerio => {

    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    return render( <Provider store={ store }>
        { component }
    </Provider>, )

};

export const mountWithStore = ( component: ReactElement, initialState: any ) => {

    const mockStore = configureStore( [ thunk ] );
    const store = mockStore( initialState );

    return {
        component: mount( <Provider store={ store }>
            { component }
        </Provider>, ),
        store:     store
    }

};
