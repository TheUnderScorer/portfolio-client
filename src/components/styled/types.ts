import {
    AlignItemsProperty,
    FlexDirectionProperty,
    FlexWrapProperty,
    JustifyContentProperty,
    MaxHeightProperty,
    MaxWidthProperty
} from 'csstype';

export interface HomeSectionProps
{
    isCentered?: boolean;
    odd?: boolean;
    colorBackground?: boolean;
}

export interface FlexProps
{
    inline?: boolean;
    flexDirection?: FlexDirectionProperty;
    justifyContent?: JustifyContentProperty;
    alignItems?: AlignItemsProperty;
    flexWrap?: FlexWrapProperty;
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
    buttonWidth?: string;
    buttonHeight?: string;
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
    formCentered?: boolean;
}

export interface FormSectionProps
{
    width?: string;
    margin?: 'normal' | 'none';
}
