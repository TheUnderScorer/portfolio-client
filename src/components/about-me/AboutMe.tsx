import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import styled from 'styled-components';
import { H2, Text } from '../styled/typography';
import colors from '../styled/colors';

const AboutMeWrapper = styled( HomeSection )`
    background-color : ${ colors.lightBlue }
`;

const AboutMe = () => {
    return (
        <AboutMeWrapper>
            <H2>
                About me.
            </H2>
            <Text>
                Hello there!
            </Text>
        </AboutMeWrapper>
    )
};

export default AboutMe;
