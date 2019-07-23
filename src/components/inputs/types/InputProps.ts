import { InputHTMLAttributes } from 'react';
import { Input } from '../../styled/form';

export default interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    isRequired?: boolean;
    hasError?: boolean;
    label?: string;
    inputComponent?: typeof Input;
}
