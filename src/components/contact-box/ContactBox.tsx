import * as React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Button } from '../styled/buttons';

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    paper: {
        padding: theme.spacing( 1 )
    }
} ) );

const ContactBox = () =>
{
    const classes = useStyles();

    return (
        <Paper className={ classes.paper }>
            <Grid container alignItems="center" justify="space-evenly">
                <Grid item xs={ 3 }>
                    <Typography variant="h3">
                        Contact me
                    </Typography>
                </Grid>
                <Grid item xs={ 3 }>
                    <Typography>
                        Interested in working together?
                    </Typography>
                </Grid>
                <Grid item xs={ 3 }>
                    <Button isRound={ true } variant="outlined" color="primary">
                        Let's do this
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default ContactBox;
