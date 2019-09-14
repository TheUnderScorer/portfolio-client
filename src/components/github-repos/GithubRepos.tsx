import * as React from 'react';
import { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../../graphql/queries/repositories';
import { GetRepositoriesResult } from '../../types/graphql/Queries';
import Loader from '../loader/Loader';
import { Divider, Grid, List } from '@material-ui/core';
import IconMessage from '../icon-message/IconMessage';
import { FaIcon, Text } from '../styled/typography';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { isEmpty } from 'lodash';
import GithubReposPops from './types/GithubReposPops';
import { Title } from './styled';
import GithubRepo from './GithubRepo';


const GithubRepos = ( { queryVariables: { first = 5 } }: GithubReposPops ) =>
{
    const { data, loading, error } = useQuery<GetRepositoriesResult>( GET_REPOSITORIES, {
        variables: {
            first,
        },
    } );

    return (
        <Grid container>
            <Title>
                My latest repositories
            </Title>
            { loading &&
              <Grid item xs={ 12 }>
                  <Loader svgProps={ { width: '50px', height: '40px' } } active={ loading }/>
              </Grid>
            }
            { error &&
              <Grid item xs={ 12 }>
                  <IconMessage icon={
                      <FaIcon icon={ faFrown }/> } title="Request error!">
                      <Text>
                          { error.message }
                      </Text>
                  </IconMessage>
              </Grid>
            }
            { data && !isEmpty( data ) &&
              <Grid item xs={ 12 }>
                  <List>
                      { data.viewer.repositories.nodes.map( ( repo, index ) =>
                          <Fragment key={ index }>
                              <GithubRepo { ...repo } />
                              { index < data.viewer.repositories.nodes.length - 1 &&
                                <Divider component="li" variant="inset"/> }
                          </Fragment>
                      ) }
                  </List>
              </Grid>
            }
        </Grid>
    )

};

export default GithubRepos;
