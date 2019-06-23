export interface HomeSectionProps {
    centered?: boolean;
    odd?: boolean;
}

export interface SectionTitleProps {
    underlined?: boolean;
    hasSubtitle?: boolean;
    uplined?: boolean;
}

export interface ButtonProps {
    flat?: boolean;
    withIcon?: boolean;
    ripple?: boolean;
}

export interface RoundImageProps {
    width: string | number;
    height: string | number;
    maxWidth?: string | number;
}
