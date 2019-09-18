import * as React from 'react';
import FormikInputProps from './types/FormikInputProps';
import { ErrorMessage, Field } from 'formik';
import { ErrorMessage as ErrorMsg } from '../styled/form';

const FormikInput = ( props: FormikInputProps ) =>
{
    return (
        <>
            <Field { ...props }/>
            <ErrorMessage component={ ErrorMsg } className="error" name={ props.name }/>
        </>
    )
};

export default FormikInput;
