import styled from 'styled-components';
import colors, { getPrimary } from '../styled/colors';
import { SideSectionDetailsProps, SideSectionProps } from './types';
import { H3 } from '../styled/typography';
import { Button } from '../styled/buttons';
import breakpoints from '../styled/breakpoints';
import LineProps from './types/LineProps';

const breakpoint = parseInt( breakpoints.tabletSmall, 10 ) - 1 + 'px';

const mainColor = ( props: any ) => {
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
    background-image: linear-gradient(0deg, ${ props => mainColor( props ) }, 65%, transparent 0%);
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
           background: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
           z-index: 3;
           border-radius: 50%;
           top: 2px;
           right: -7px;
           border: 4px solid ${ props => mainColor( props ) };
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
        background: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
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
            display: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };;
            content: '';
            position: absolute;
            background: ${ props => mainColor( props ) };
            z-index: 3;
            right: -14px;
            border-radius: 50%;
            top: 41px;
            border: 4px solid ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
        }
    }
    
    ${ props => !props.loaded && `
        .icon-container {
            transform: scale(0);
        }
    ` }
    
    ${ props => {
    if ( props.open ) {
        return `
                    .icon-container {
                        background-color: ${ mainColor( props ) }
                        color: ${ colors.white }
                    }
                    
                    button svg {
                        transform: rotate(45deg);
                    }
                `;
    }

    return `
            .section-details {
                height: 0;
            }
            
            button {
                margin-top: 0;
            }
        `;

} }
`;

export const SideSectionIconContainer = styled.a`
    height: 2.5em;
    width: 2.5em;
    display: inline-flex;
    border-radius: 50%;
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.lightBg };
    align-items: center;
    justify-content: center;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
    font-size: 3em;
    cursor: pointer;
`;

export const SideSectionTitle = styled( H3 )`
    font-size: 1.80em;
    display: block;
    margin-bottom: 20px;
    margin-top: 20px;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.black }
`;

export const ReadMoreButton = styled( Button )`
    margin-top: 20px;
    
    svg {
        transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;

export const SideSectionDetails = styled.div<SideSectionDetailsProps>`
    height: ${ props => props.height };
    overflow: hidden;
    transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;
