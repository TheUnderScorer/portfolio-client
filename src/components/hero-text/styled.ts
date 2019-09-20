import styled from 'styled-components';
import colors from '../styled/colors';
import { FullWidth } from '../styled/wrappers';
import { Button } from '../styled/buttons';
import { ButtonProps } from '../styled/types';

export const TextWrapper = styled.div`
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;

    .Cursor {
        font-size: 4em;
        color: ${ colors.white }
    }
`;

export const NameWrapper = styled.div`
    width: 100%;
`;

export const NameHighlight = styled.span`
    color: ${ props => props.theme.palette.primary.main }
`;

export const CtaWrapper = styled( FullWidth )`
    margin-top: ${ props => props.theme.spacing( 6 ) };
    
    ${ props => props.theme.breakpoints.down( 'sm' ) }{
        margin-top: ${ props => props.theme.spacing( 2 ) };
    }
`;

export const Cta = styled( Button ).attrs<ButtonProps>( {
    round: true,
    cta:   true,
} )`
    svg{
         transition: all .3s;
    }
    
    &.rotated {
        svg {
            transform: rotate(-90deg);
        }
    }
`;
