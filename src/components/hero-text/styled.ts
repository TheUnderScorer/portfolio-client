import styled from 'styled-components';
import colors, { getPrimary } from '../styled/colors';
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
    color: ${ props => getPrimary( props.theme.mode ) }
`;

export const CtaWrapper = styled( FullWidth )`
    @media(min-width: ${ breakpoints.phoneSmall }){
        margin-top: 80px;
    }
`;

export const Cta = styled( CtaButton )`
    
    ${ props => props.theme.mode === 'black' &&
                `background-color: ${ getPrimary( props.theme.mode ) }`
    };

    svg{
         transition: all .3s;
    }
    
    &.rotated {
        svg {
            transform: rotate(-90deg);
        }
    }
`;
