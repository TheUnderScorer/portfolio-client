import styled, { css } from 'styled-components';
import colors, { getBaseTextColor, getPrimary } from './colors';
import { HeadlineProps, IconProps, LinkProps, SectionSubtitleProps, SectionTitleProps, TextProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';

const textStyles = css`
    font-size: 1em;  
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

const headerStyles = css`
    margin: 0;
    font-weight: 500;
    display: inline-block;
    color: ${ props => getBaseTextColor( props.theme.mode ) };
`;

export const Text = styled.span<TextProps>`
    ${ textStyles }
    
    ${ props => props.contrasted && `
        color: ${ props.theme.mode === 'black' ? colors.white : colors.black };
    ` }
`;

export const Paragraph = styled.p`
    ${ textStyles };
`;

export const Time = styled.time`
    ${ textStyles }
`;

export const SmallText = styled.small`
    font-size: 0.8em;  
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;


export const H1 = styled.h1<HeadlineProps>`
    font-size: 3.5em;
    display: ${ ( { display = 'block' } ) => display };
    ${ headerStyles }
`;

export const H2 = styled( H1 ).attrs( {
    as: 'h2'
} )`
    font-size: 3em;
`;

export const H3 = styled( H1 ).attrs( {
    as: 'h3'
} )`
    font-size: 2.5em;
`;

export const H4 = styled( H1 ).attrs( {
    as: 'h4'
} )`
    font-size: 2em;
`;

export const H5 = styled( H1 ).attrs( {
    as: 'h5'
} )`
    font-size: 1.5em;
`;

export const H6 = styled( H1 ).attrs( {
    as: 'h6'
} )`
    font-size: 1.2em;
`;

export const SectionTitle = styled( Typography ).attrs( {
    variant: 'h4'
} )<SectionTitleProps>`
    &.MuiTypography-root {
        margin-bottom: ${ props => props.hasSubtitle ? '0' : '40px' };
        margin-left: auto;
        margin-right: auto;
        font-weight: 500;
    }
    
    ${ props => props.uplined && `
        &::before{
            content: '';
            display: block;
            width: 70%;
            height: 3px;
            background: ${ getPrimary( props.theme.mode ) };
            position: relative;
            margin: 0 auto;
            bottom: 20px;
            max-width: 40px;
        }
    ` }
    
    ${ props => props.underlined && `
        position: relative;
        margin-bottom: 60px;
    
        &::after{
            display: inline-block;
            content: '';
            width: 70%;
            height: 3px;
            background: ${ getPrimary( props.theme.mode ) };
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: -20px;
            max-width: 40px
        }
    ` }
`;

export const A = styled.a<LinkProps>`
    ${ textStyles };
    cursor: pointer;
    text-decoration: none;
    
    ${ props => props.highlight && `
        
        &, svg {
            color: ${ getPrimary( props.theme.mode ) };
        }
        
        font-weight: 600;
    ` };
    
    ${ props => props.underlined && `
        border-bottom: 1px solid ${ getPrimary( props.theme.mode ) };
    ` }
    
    svg {
        margin-right: 0.5em;
    }
`;

export const Highlight = styled.span`
    color: ${ props => getPrimary( props.theme.mode ) };
`;

export const SectionSubtitle = styled( Typography ).attrs( {
    variant: 'subtitle1',
    color:   'textSecondary'
} )<SectionSubtitleProps>`
    display: block;
    margin-bottom: 20px;
    font-size: 1em;
    
    ${ props => props.underlined && `
        position: relative;
        margin-bottom: 60px;
    
        &::after{
            display: inline-block;
            content: '';
            width: 70%;
            height: 3px;
            background: ${ getPrimary( props.theme.mode ) };
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: -20px;
            max-width: 30px
        }
    ` }
`;

export const WhiteFaIcon = styled( FontAwesomeIcon )`
    color: ${ colors.white };
`;

export const FaIconReversed = styled( FontAwesomeIcon )<IconProps>`
    color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    margin: ${ ( { margin = 'none' } ) => margin === 'none' ? '0' : '0 0.5em' };
    font-size: ${ ( { size = '1em' } ) => size }
`;

export const FaIcon = styled( FaIconReversed )`
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
`;

export const MenuIcon = styled( FaIcon )`
    margin: ${ ( { margin = 'none' } ) => margin === 'none' ? '0' : '0 0.5em 0 0' };
`;
