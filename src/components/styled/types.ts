export interface HomeSectionProps {
    centered?: boolean;
    odd?: boolean;
    colorBackground?: boolean;
}

export interface SectionTitleProps {
    underlined?: boolean;
    hasSubtitle?: boolean;
    uplined?: boolean;
}

export interface SectionSubtitleProps {
    underlined?: boolean;
}

export interface ButtonProps {
    flat?: boolean;
    withIcon?: boolean;
    ripple?: boolean;
    transparent?: boolean;
}

export interface RoundImageProps {
    width: string | number;
    height: string | number;
    maxWidth?: string | number;
}

export interface LinkProps {
    highlight?: boolean;
    underlined?: boolean;
}
