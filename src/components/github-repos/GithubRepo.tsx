import * as React from 'react';
import Repository from '../../types/graphql/Repository';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { FaIcon, SmallText, Text } from '../styled/typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import { DateFormats } from '../../types/common/DateFormats';
import { IconButton } from '../styled/buttons';

const GithubRepo = ( { name, description, createdAt, url }: Repository ) =>
{
    return (
        <ListItem target="__blank" href={ url } component="a" key={ name } alignItems="flex-start">
            <ListItemIcon>
                <FaIcon icon={ faGithub }/>
            </ListItemIcon>
            <ListItemText primary={ <Text contrasted>{ name }</Text> } secondary={ (
                <>
                    <Text>
                        { description }
                    </Text>
                    <SmallText>
                        { ` - ${ moment( createdAt ).format( DateFormats.DateTime ) }` }
                    </SmallText>
                </>
            ) }/>
            <ListItemSecondaryAction>
                <IconButton flat mode="secondary">
                    <FaIcon icon="external-link-alt"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default GithubRepo;
