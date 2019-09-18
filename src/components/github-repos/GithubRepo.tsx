import * as React from 'react';
import { useCallback, useRef } from 'react';
import Repository from '../../types/graphql/Repository';
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { FaIcon, SmallText, Text } from '../styled/typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import { DateFormats } from '../../types/common/DateFormats';

const GithubRepo = ( { name, description, createdAt, url }: Repository ) =>
{
    const linkRef = useRef<HTMLAnchorElement>();

    const triggerItemClick = useCallback( () =>
    {
        if ( !linkRef.current ) {
            return;
        }

        linkRef.current.click();
    }, [ linkRef ] );

    return (
        <ListItem buttonRef={ linkRef } button target="__blank" href={ url } component="a" key={ name } alignItems="flex-start">
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
                <IconButton onClick={ triggerItemClick } size="small">
                    <FaIcon icon="external-link-alt"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default GithubRepo;
