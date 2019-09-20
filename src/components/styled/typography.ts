import styled, { css } from 'styled-components';
import colors from './colors';
import { IconProps, LinkProps, SectionSubtitleProps, SectionTitleProps, TextProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';

const textStyles = css`
    font-size: 1em;  
    color: ${ props => props.theme.palette.text.primary };
`;

// TODO Remove
export const Text = styled.span<TextProps>`
    ${ textStyles }
    
    ${ props => props.contrasted && `
        color: ${ props.theme.palette.type === 'dark' ? colors.white : colors.black };
    ` }
`;

export const SectionTitle = styled( Typography ).attrs( {
    variant: 'h4',
    color:   'textPrimary'
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
            background: ${ props.theme.palette.primary.main };
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
            background: ${ props.theme.palette.primary.main };
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
            color: ${ props.theme.palette.primary.main };
        }
        
        font-weight: 600;
    ` };
    
    ${ props => props.underlined && `
        border-bottom: 1px solid ${ props.theme.palette.primary.main };
    ` }
    
    svg {
        margin-right: 0.5em;
    }
`;

export const Highlight = styled.span`
    color: ${ props => props.theme.palette.primary.main };
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
            background: ${ props.theme.palette.primary.main };
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
    color: ${ props => props.theme.palette.common.white };
`;

export const FaIcon = styled( FontAwesomeIcon )<IconProps>`
    color: ${ props => props.theme.palette.text.primary } 
    margin: ${ ( { margin = 'none' } ) => margin === 'none' ? '0' : '0 0.5em' };
    font-size: ${ ( { size = '1em' } ) => size }
`;

export const MenuIcon = styled( FaIcon )`
    margin: ${ ( { margin = 'none' } ) => margin === 'none' ? '0' : '0 0.5em 0 0' };
`;
