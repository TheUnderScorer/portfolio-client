import * as React from 'react';
import { useEffect } from 'react';
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
import { animated, config, useSpring } from 'react-spring';

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    card:       {
        backgroundColor: theme.palette.background.paper,
        transition:      'all .3s',
    },
    root:       {
        zIndex: 90,
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

const Project = ( { project, active = false, index, onOpen, onClose }: ProjectProps ) =>
{
    const classes = useStyles();

    const { name } = project;

    const props = useSpring( {
        zIndex: 4,
        config: config.stiff,
        from:   {
            size: '50%'
        },
        to:     {
            size: active ? '150%' : '50%'
        }
    } );

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
        <animated.div style={ props } className={ classes.root }>
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
                    <IconButton className={ `${ classes.expand } ${ active ? classes.expandOpen : '' } expand` } onClick={ active ? onClose : onOpen }>
                        <FaIcon icon={ faChevronDown }/>
                    </IconButton>
                </CardActions>
                <Collapse in={ active } timeout="auto" unmountOnExit>
                    <Typography align="left" className={ classes.details } paragraph>
                        { project.details }
                    </Typography>
                </Collapse>
            </Card>
        </animated.div>
    )
};

export default Project;
