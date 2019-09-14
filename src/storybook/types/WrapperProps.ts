import ReactProps from '../../types/ReactProps';
import ApolloClient from 'apollo-client';

export default interface WrapperProps extends ReactProps
{
    client: ApolloClient<any>;
}
