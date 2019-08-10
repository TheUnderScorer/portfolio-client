import { OperationVariables } from '@apollo/react-common';

export default interface SubscriptionResult<TData = any, TVariables = OperationVariables>
{
    variables: TVariables | undefined;
    loading: boolean;
    data?: TData | undefined;
    error?: import('apollo-client').ApolloError | undefined;
}
