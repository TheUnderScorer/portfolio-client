import * as React from 'react';
import { Input as BaseInput, InputContainer, Label } from '../styled/form';
import InputProps from './types/InputProps';
import { Text } from '../styled/typography';

const Input = ( { value = '', hasError, ...props }: InputProps ) =>
{
    return (
        <InputContainer>
            <BaseInput hasError={ hasError } hasValue={ !!value } value={ value } { ...props } />
            { props.label &&
              <Label>
                  <Text>
                      { props.label }
                  </Text>
              </Label>
            }
        </InputContainer>
    )
};

export default Input;
