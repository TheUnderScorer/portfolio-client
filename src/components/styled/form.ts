import styled, { css } from 'styled-components';
import colors, { getPrimaryVariation } from './colors';
import { FlexFormSectionProps, FormSectionProps, StyledInputProps } from './types';
import { Form as FormikForm } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Form = styled( FormikForm )`
   
`;

export const CentredFrom = styled( Form )`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

export const InputContainer = styled.div`
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
`;

export const ErrorIcon = styled( FontAwesomeIcon ).attrs( {
    icon: 'exclamation-circle'
} )`
    color: ${ colors.red };
    position: absolute;
    right: 15px;
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
        padding-right: 40px;
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
    font-size: 0.80em;
    text-align: left;
`;

export const FormSection = styled.section<FormSectionProps>`
    margin: ${ ( { margin = 'none' } ) =>
{
    switch ( margin ) {
        case 'normal':
            return '1em 0';

        case 'top':
            return '1em 0 0 0 ';

        default:
            return '0';
    }


} };
    width: ${ ( { width = '100%' } ) => width };
    
    input, label, textarea {
        color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
    }
       
    button {
        margin-right: 1em;
    }
    
    .MuiInputLabel-outlined {
        background-color: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
    }
    
    .Mui-error fieldset{
        border-width: 2px;
    }
    
    .MuiFormControl-root .MuiInputBase-root.Mui-focused fieldset {
        border-width: 1px;
    }
    
   ${ props => props.theme.mode === 'black' && `
        .MuiFormControl-root .MuiInputBase-root fieldset {
            border-color: ${ colors.darkerBorder };
        }
        
        .MuiFormControl-root .MuiInputBase-root.Mui-focused {
            fieldset{
                border-color: ${ colors.lightBorder };
            }
        }
        
        .MuiFormControl-root label {
            color: ${ colors.white }
        }
       
   ` } 
`;

export const FlexFormSection = styled( FormSection )<FlexFormSectionProps>`
    display: flex;
    padding: 0 3rem;
    align-items: center;
    ${ props => props.isCentered && `
        justify-content: center;
    ` }
`;
