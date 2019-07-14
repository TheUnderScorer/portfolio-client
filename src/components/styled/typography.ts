import styled, { css } from 'styled-components';
import colors, { getPrimary } from './colors';
import { LinkProps, SectionSubtitleProps, SectionTitleProps } from './types';

const textStyles = css`
    font-size: 1em;  
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const Text = styled.span`
    ${ textStyles }
`;

export const Paragraph = styled.p`
    ${ textStyles }
`;

export const SmallText = styled.small`
    font-size: 0.8em;  
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const H1 = styled.h1`
    font-size: 3.5em;
    font-weight: 500;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
    display: inline-block;
    margin: 0;
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 3em;
    font-weight: 500;
    display: inline-block;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const H3 = styled.h3`
    margin: 0;
    font-size: 2.5em;
    font-weight: 500;
    display: inline-block;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const H4 = styled.h4`
    margin: 0;
    font-size: 2em;
    font-weight: 500;
    display: inline-block;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const SectionTitle = styled( H4 )<SectionTitleProps>`
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark }
    padding-bottom: 5px;
    margin-bottom: ${ props => props.hasSubtitle ? '0' : '40px' };
    font-weight: 500;
    
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
    ${ textStyles }
    
    ${ props => props.highlight && `
        color: ${ getPrimary( props.theme.mode ) };
        font-weight: 600;
    ` };
    
    ${ props => props.underlined && `
        border-bottom: 1px solid ${ getPrimary( props.theme.mode ) };
    ` }
`;

export const SectionSubtitle = styled( Text )<SectionSubtitleProps>`
    display: block;
    margin-bottom: 40px;
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
