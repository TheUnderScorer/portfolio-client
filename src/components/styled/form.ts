import styled, { css } from 'styled-components';
import colors, { getPrimaryVariation } from './colors';
import { FormProps, FormSectionProps, StyledInputProps } from './types';
import { Form as FormikForm } from 'formik';

export const Form = styled( FormikForm )<FormProps>`
    ${ props => props.isCentered && `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    ` }
`;

export const InputContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
`;

const labelActive = css`
    ~ label {
        bottom: 74%;
        font-size: 0.8em;
        left: 0.2em;
        padding: 0 10px;
    }
`;

export const Input = styled.input<StyledInputProps>`
    border-radius: 5px;
    border: 1px solid ${ props => props.theme.mode === 'black' ? colors.darkerBorder : colors.lightBorder };
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white }
    display: inline-block;
    padding: 1em 0.8em;
    width: 100%;
    outline: none;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
    font-size: 1em;
    
    &:focus, &:active {
        border-color: ${ props => getPrimaryVariation( props.theme.mode ) };
        ${ labelActive };
    }
    
    ${ props => props.hasValue && `
        ${ labelActive };
    ` }
    
    ${ props => props.hasError && `
        border-width: 2px;
        border-color: ${ colors.red };
    ` }
`;

export const Textarea = styled( Input ).attrs( {
    as:     'textarea',
    resize: 'none',
} )`

`;

export const Label = styled.label`
    position: absolute;
    left: 1em;
    bottom: 30%;
    transition: bottom .3s, left .3s;
    pointer-events: none;
    background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    
    span {
        font-size: 0.9em;
    }
`;

export const ErrorMessage = styled.div`
    color: ${ colors.red };
    font-size: 0.85em;
    margin-top: 0.5em;
`;

export const FormSection = styled.section<FormSectionProps>`
    margin: 1em 0;
    width: ${ ( { width = '100%' } ) => width };
`;
