import * as React from 'react';
import IconMessageProps from './types/IconMessageProps';
import { IconMessageWrapper } from './styled';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    title: {
        marginBottom: theme.spacing( 0.5 )
    },
} ) );

const IconMessage = ( { icon, title, children }: IconMessageProps ) =>
{
    const classes = useStyles();

    return (
        <IconMessageWrapper>
            { icon }
            <Typography className={ classes.title } variant="h5">
                { title }
            </Typography>
            { children }
        </IconMessageWrapper>
    )
};

export default IconMessage;
