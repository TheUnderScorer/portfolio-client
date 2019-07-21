import { InputHTMLAttributes } from 'react';

export default interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    isRequired?: boolean;
    hasError?: boolean;
    label?: string;
}
