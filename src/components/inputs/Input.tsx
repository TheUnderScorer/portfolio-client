import * as React from 'react';
import { ErrorIcon, Input as BaseInput, InputContainer, Label } from '../styled/form';
import InputProps from './types/InputProps';
import { Text } from '../styled/typography';

const Input = ( { value = '', hasError, inputComponent, ...props }: InputProps ) =>
{
    const Component = inputComponent ? inputComponent : BaseInput;

    return (
        <InputContainer>
            <Component hasError={ hasError } hasValue={ !!value } value={ value } { ...props } />
            { props.label &&
              <Label>
                  <Text>
                      { props.label }
                  </Text>
              </Label>
            }
            { hasError &&
              <ErrorIcon/>
            }
        </InputContainer>
    )
};

export default Input;
