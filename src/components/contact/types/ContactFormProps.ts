import { MutationFn, MutationResult } from 'react-apollo-hooks';
import Result from '../../../types/graphql/Result';
import ContactInput, { ContactInputVariable } from '../../../types/graphql/inputs/ContactInput';
import User from '../../../types/graphql/User';

export default interface ContactFormProps
{
    mutation: [ MutationFn<Result, ContactInputVariable>, MutationResult<Result> ];
    user?: User;
    initialInput?: Partial<ContactInput>;
    afterSubmit: ( result: boolean, emailChanged: boolean ) => any;
}
