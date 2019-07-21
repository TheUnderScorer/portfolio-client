import * as React from 'react';
import FormikInputProps from './types/FormikInputProps';
import { ErrorMessage, Field } from 'formik';
import { Text } from '../styled/typography';
import { ErrorMessage as ErrorMsg, Label } from '../styled/form';

const FormikInput = ( { label, ...props }: FormikInputProps ) =>
{
    return (
        <>
            <Field { ...props }/>
            { label &&
              <Label>
                  <Text>
                      { label }
                  </Text>
              </Label>
            }
            <ErrorMessage component={ ErrorMsg } className="error" name={ props.name }/>
        </>
    )
};

export default FormikInput;
