import { MaxHeightProperty, MaxWidthProperty } from 'csstype';

export interface HomeSectionProps
{
    isCentered?: boolean;
    odd?: boolean;
    colorBackground?: boolean;
}

export interface SectionTitleProps
{
    underlined?: boolean;
    hasSubtitle?: boolean;
    uplined?: boolean;
}

export interface SectionSubtitleProps
{
    underlined?: boolean;
}

export interface ButtonProps
{
    flat?: boolean;
    withIcon?: boolean;
    iconOnHover?: boolean;
    ripple?: boolean;
    transparent?: boolean;
}

export interface RoundImageProps
{
    width: string;
    height: string;
    maxWidth?: MaxWidthProperty<string>;
    maxHeight?: MaxHeightProperty<string>;
}

export interface LinkProps
{
    highlight?: boolean;
    underlined?: boolean;
}

export interface StyledInputProps
{
    hasValue?: boolean;
    hasError?: boolean;
}

export interface FormProps
{
    isCentered?: boolean;
}

export interface FormSectionProps
{
    width?: string;
}
