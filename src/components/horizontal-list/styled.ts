import styled from 'styled-components';
import { getPrimary } from '../styled/colors';
import { SideSectionProps } from './types';
import { Collapse, Typography } from '@material-ui/core';
import breakpoints from '../styled/breakpoints';
import LineProps from './types/LineProps';
import { Button, IconButton } from '../styled/buttons';

const breakpoint = parseInt( breakpoints.tabletSmall, 10 ) - 1 + 'px';

const mainColor = ( props: any ) =>
{
    return getPrimary( props.theme.mode );
};

export const HelpingListWrapper = styled.div`
    display: flex;
    justify-content: center;
    
    @media(max-width: ${ breakpoint }){
        flex-wrap: wrap;  
    }
`;

export const Line = styled.div<LineProps>`
    background-image: linear-gradient(0deg, ${ props => props.theme.palette.primary.main }, 65%, transparent 0%);
    background-position: top;
    background-size: 4px 20px;
    background-repeat: repeat-y;
    width: 5px;
    position: relative;
    height: ${ props => props.height };
    
    @media(max-width: ${ breakpoint }){
        display: none;
    }
    
    &::before {
           width: 10px;
           height: 10px;
           display: block;
           content: '';
           position: absolute;
           background: ${ props => props.theme.palette.background.default };
           z-index: 3;
           border-radius: 50%;
           top: 2px;
           right: -7px;
           border: 4px solid ${ props => props.theme.palette.primary.main };
    }
`;

const Side = styled.div`
    width: 35%;
    
    @media(max-width: ${ breakpoint }){
        width: 100%;
        text-align: center !important;
        
        .side-section {
            flex-wrap: wrap;
        }
    }
    
    .side-section {
        display: flex;
    }
`;

export const LeftSide = styled( Side )`
    text-align: right;
`;

export const RightSide = styled( Side )`
    text-align: left;
    
    .side-section {
        justify-content: flex-end;
        
        &::before {
            right: auto;
            left: -14px;
        }
    }
`;

export const SideSection = styled.div<SideSectionProps>`
    position: relative;
    margin-top: ${ props => props.marginTop };
    margin-bottom: 40px;
    
    > div {
        width: 80%;
        position: relative;
        background: ${ props => props.theme.palette.background.default };
        z-index: 2;
        
        @media(max-width: ${ breakpoint }){
            width: 100%;
        }
    }
    
    .icon-container {
        transition: all .3s;
    }
    
    @media(min-width: ${ breakpoint }){
        &::after{
            display: block;
            content: '';
            height: 5px;
            width: 100%;
            position: absolute;
            top: 50px;
            z-index: 1; 
            background-image: linear-gradient(-90deg, ${ props => mainColor( props ) } 65%, transparent 0%);
            background-position: top;
            background-size: 20px 4px;
            background-repeat: repeat-x;
        }
        
        &::before{
            width: 15px;
            height: 15px;
            content: '';
            position: absolute;
            background: ${ props => mainColor( props ) };
            z-index: 3;
            right: -14px;
            border-radius: 50%;
            top: 41px;
            border: 4px solid ${ props => props.theme.palette.background.default };
        }
    }
    
    ${ props => !props.loaded && `
        .icon-container {
            transform: scale(0);
        }
    ` }
    
    ${ props =>
{
    if ( props.open ) {
        return `
                    .icon-container.MuiButtonBase-root {
                        background-color: ${ props.theme.palette.primary.main }
                        color: ${ props.theme.palette.common.white }
                    }
                    
                    button > svg {
                        transform: rotate(45deg);
                    }
                `;
    }

    return `
            .section-details {
                height: 0;
                margin-bottom: 0;
            }
            
            button {
                margin-top: 0;
            }
        `;

} }
`;

export const SideSectionIconContainer = styled( IconButton )`
    &.MuiButtonBase-root{
        height: 2.5em;
        width: 2.5em;
        border-radius: 50%;
        background-color: ${ props => props.theme.palette.background.paper };
        font-size: 3em;
        cursor: pointer;
        
        svg {
            margin: 0;
        }
    }
`;

export const SideSectionTitle = styled( Typography ).attrs( {
    variant: 'h4',
    color:   'textPrimary'
} )`
    &.MuiTypography-root{
        margin: ${ props => props.theme.spacing( 1 ) } 0;
    }
`;

export const ReadMoreButton = styled( Button ).attrs( {
    variant: 'contained',
    color:   'primary'
} )`
    &.MuiButton-root{
        svg {
            transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
`;

export const SideSectionDetails = styled( Collapse )`
    margin-bottom: ${ props => props.theme.spacing( 1 ) };
`;
