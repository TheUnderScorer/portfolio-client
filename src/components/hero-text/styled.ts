import styled from 'styled-components';
import colors, { getPrimaryVariation } from '../styled/colors';
import { FullWidth } from '../styled/wrappers';
import { CtaButton } from '../styled/buttons';
import breakpoints from '../styled/breakpoints';

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
    color: ${ props => getPrimaryVariation( props.theme.mode ) }
`;

export const CtaWrapper = styled( FullWidth )`
    margin-top: 6rem;
    
    @media(max-width: ${ breakpoints.phoneBig }){
        margin-top: 2rem;
    }
`;

export const Cta = styled( CtaButton )`
    svg{
         transition: all .3s;
    }
    
    &.rotated {
        svg {
            transform: rotate(-90deg);
        }
    }
`;
