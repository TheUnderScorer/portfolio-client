import Result from '../../../types/graphql/Result';
import ContactInput, { ContactInputVariable } from '../../../types/graphql/inputs/ContactInput';
import User from '../../../types/graphql/User';
import { MutationTuple } from '@apollo/react-hooks';

export default interface ContactFormProps
{
    mutation: MutationTuple<Result, ContactInputVariable>;
    user?: User;
    initialInput?: Partial<ContactInput>;
    afterSubmit: ( result: boolean, emailChanged: boolean ) => any;
}
