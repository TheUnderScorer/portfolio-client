import { MouseEventHandler, MutableRefObject } from 'react';

export default interface HeroTextProps {
    onCtaClick?: MouseEventHandler;
    ctaRef?: MutableRefObject<HTMLButtonElement | any>;
}
