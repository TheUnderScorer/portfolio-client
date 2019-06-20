import * as React from 'react';
import { useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { Main } from '../components/styled/wrappers';
import { ThemeProvider } from 'styled-components';

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );

    return (
        <ThemeProvider theme={ theme }>
            <Main>
                Home!
            </Main>
        </ThemeProvider>
    )

};

export default Home;
