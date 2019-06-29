import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import styled from 'styled-components';
import { SectionSubtitle, SectionTitle, Text } from '../styled/typography';
import Me from '../../assets/me2.jpg';
import { RoundImage } from '../styled/images';
import breakpoints from '../styled/breakpoints';
import { getPrimary } from '../styled/colors';

const AboutMeWrapper = styled( HomeSection )`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    .title-container {
        width: 100%;
    }
    
    .text {
        width: 50%;
        display: inline-flex;
        align-items: center;
        
        @media(max-width: ${ breakpoints.tabletSmall }){
            width: 100%;
            margin-top: 20px;
        }
    }
    
    img {
        border: 3px solid ${ props => getPrimary( props.theme.mode ) };
        padding: 3px;
        @media(min-width: ${ breakpoints.tabletBig }){
            margin-right: 20px;
        }
    }
`;

const AboutMe = () => {
    return (
        <AboutMeWrapper centered={ true } odd={ true }>
            <div className="title-container">
                <SectionTitle hasSubtitle={ true } uplined={ true }>
                    Nice to meet you!
                </SectionTitle>
                <SectionSubtitle>
                    Let me introduce myself.
                </SectionSubtitle>
            </div>
            <RoundImage width="20%" maxWidth="250px" height="auto" src={ Me } alt=""/>
            <Text className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus. Integer vel faucibus odio. Praesent eleifend, purus eget iaculis tincidunt, nulla dui consequat nibh, a aliquam orci dolor ut justo. Sed non tellus nisl. Sed vitae leo felis. Nullam cursus vulputate suscipit. Sed quis nisl purus. Pellentesque in commodo ante. Nullam nec massa tortor. Duis eleifend sit amet tellus id lobortis. Ut at quam vitae libero mollis bibendum quis et dui.
            </Text>
        </AboutMeWrapper>
    )
};

export default AboutMe;
