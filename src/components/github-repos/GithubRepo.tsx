import * as React from 'react';
import { useCallback, useRef } from 'react';
import Repository from '../../types/graphql/Repository';
import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';
import { FaIcon } from '../styled/typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';

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
            <ListItemText disableTypography primary={ <Typography variant="body1">{ name }</Typography> } secondary={ (
                <>
                    <Typography display="inline" variant="body2" color="textSecondary">
                        { description }
                    </Typography>
                    <Typography display="inline" variant="caption" color="textSecondary">
                        { ` - ${ moment( createdAt ).calendar() }` }
                    </Typography>
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
