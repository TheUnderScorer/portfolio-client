import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query GetRepositories($first: Int)
    {
        viewer {
            repositories(first: $first, orderBy: {direction: DESC, field: CREATED_AT}) {
                nodes {
                    name,
                    createdAt,
                    description,
                    url
                }
            }
        }
    }
`;
