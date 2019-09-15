import * as React from 'react';
import { HomeSection } from '../styled/wrappers';
import styled from 'styled-components';
import { SectionSubtitle, SectionTitle } from '../styled/typography';
import Me from '../../assets/me.jpg';
import { RoundImage } from '../styled/images';
import texts from '../../pages/data/texts';
import { Grid, Typography } from '@material-ui/core';

const AboutMeWrapper = styled( HomeSection )`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    .title-container {
        width: 100%;
    }
    
    img {
        border: 3px solid ${ props => props.theme.palette.primary.main };
        padding: 3px;
    }
`;

const AboutMe = () =>
{
    return (
        <AboutMeWrapper id={ texts.aboutMe.id } isCentered={ true } odd={ true }>
            <div className="title-container">
                <SectionTitle hasSubtitle={ true } uplined={ true }>
                    { texts.aboutMe.title }
                </SectionTitle>
                <SectionSubtitle>
                    { texts.aboutMe.subTitle }
                </SectionSubtitle>
            </div>
            <Grid container alignItems="center" justify="center">
                <Grid item md={ 3 } xs={ 12 }>
                    <RoundImage width="20em" maxWidth="250px" maxHeight="250px" height="auto" src={ Me } alt=""/>
                </Grid>
                <Grid item md={ 8 } xs={ 12 }>
                    <Typography variant="body1" align="justify">
                        { texts.aboutMe.text }
                    </Typography>
                </Grid>
            </Grid>
        </AboutMeWrapper>
    )
};

export default AboutMe;
