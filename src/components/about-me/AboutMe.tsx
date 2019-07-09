import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import styled from 'styled-components';
import { SectionSubtitle, SectionTitle, Text } from '../styled/typography';
import Me from '../../assets/me2.jpg';
import { RoundImage } from '../styled/images';
import breakpoints from '../styled/breakpoints';
import { getPrimary } from '../styled/colors';
import texts from '../../pages/data/texts';
import { connect } from 'react-redux';

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
        <AboutMeWrapper id={ texts.aboutMe.id } centered={ true } odd={ true }>
            <div className="title-container">
                <SectionTitle hasSubtitle={ true } uplined={ true }>
                    { texts.aboutMe.title }
                </SectionTitle>
                <SectionSubtitle>
                    { texts.aboutMe.subTitle }
                </SectionSubtitle>
            </div>
            <RoundImage width="20em" maxWidth="250px" height="auto" src={ Me } alt=""/>
            <Text className="text">
                { texts.aboutMe.text }
            </Text>
        </AboutMeWrapper>
    )
};

export default connect()( AboutMe );
