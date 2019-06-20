import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import HomeStore from '../types/stores/HomeStore';
import { Main } from '../components/styled/wrappers';
import { ThemeProvider } from 'styled-components';
import HeroImage from '../components/hero-image/HeroImage';
import Landscape from '../assets/landscape.jpg';
import 'react-typist/dist/Typist.css';
import HeroText from '../components/hero-text/HeroText';

const Home = () => {

    const theme = useSelector( ( store: HomeStore ) => store.theme );

    return (
        <ThemeProvider theme={ theme }>
            <Main>
                <HeroImage src={ Landscape }>
                    <HeroText/>
                </HeroImage>
            </Main>
        </ThemeProvider>
    )

};

export default connect()( Home );
