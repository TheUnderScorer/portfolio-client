import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import styled from 'styled-components';
import { SectionTitle, Text } from '../styled/typography';

const AboutMeWrapper = styled( HomeSection )`
    
`;

const AboutMe = () => {
    return (
        <AboutMeWrapper>
            <div>
                <SectionTitle>
                    About
                </SectionTitle>
            </div>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus. Integer vel faucibus odio. Praesent eleifend, purus eget iaculis tincidunt, nulla dui consequat nibh, a aliquam orci dolor ut justo. Sed non tellus nisl. Sed vitae leo felis. Nullam cursus vulputate suscipit. Sed quis nisl purus. Pellentesque in commodo ante. Nullam nec massa tortor. Duis eleifend sit amet tellus id lobortis. Ut at quam vitae libero mollis bibendum quis et dui.
            </Text>
        </AboutMeWrapper>
    )
};

export default AboutMe;
