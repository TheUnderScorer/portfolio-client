import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import ProjectProps from './types/ProjectProps';
import { pushState } from '../../utils/history';
import { project as projectUrl } from '../../pages/data/links';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    createStyles,
    Divider,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import { faChevronDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FaIcon } from '../styled/typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    card:       {
        backgroundColor: theme.palette.background.default
    },
    media:      {
        height: '200px'
    },
    expand:     {
        marginLeft: 'auto',
        fontSize:   '0.9em',
        transition: 'transform .3s'
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    icon:       {
        fontSize: '1em',
    },
    details:    {
        padding: theme.spacing( 1 )
    }
} ) );

const Project = ( { project, active = false, index }: ProjectProps ) =>
{
    const classes = useStyles();

    const { name } = project;

    const [ expanded, setExpanded ] = useState( false );
    const toggleExpanded = useCallback( () => setExpanded( !expanded ), [ expanded ] );

    useEffect( () =>
    {
        if ( !active ) {
            return;
        }

        // Push history state with fake project permalink
        pushState( {
            state:              {
                activeProject: index,
                innerActive:   true
            },
            url:                projectUrl( name ),
            validationCallback: ( state ) =>
                                {
                                    return !state || !state.hasOwnProperty( 'activeProject' );
                                }
        } );
    }, [ active, index, name ] );

    return (
        <Card className={ classes.card }>
            <CardHeader title={ (
                <Typography variant="body1" align="left">
                    { project.name }
                </Typography>
            ) } avatar={ (
                <Avatar>
                    { project.logoUrl }
                </Avatar>
            ) }/>
            <CardMedia component="img" className={ classes.media } image={ project.thumbnailUrl }/>
            <CardContent>
                <Typography variant="body2" align="left">
                    { project.shortDetails }
                </Typography>
            </CardContent>
            <Divider/>
            <CardActions disableSpacing>
                <IconButton className={ classes.icon }>
                    <FaIcon icon={ faExternalLinkAlt }/>
                </IconButton>
                <IconButton className={ classes.icon }>
                    <FaIcon icon={ faGithub }/>
                </IconButton>
                <IconButton className={ `${ classes.expand } ${ expanded ? classes.expandOpen : '' }` } onClick={ toggleExpanded }>
                    <FaIcon icon={ faChevronDown }/>
                </IconButton>
            </CardActions>
            <Collapse in={ expanded } timeout="auto" unmountOnExit>
                <Typography className={ classes.details } paragraph>
                    { project.details }
                </Typography>
            </Collapse>
        </Card>
    )
};

export default Project;
