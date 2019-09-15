import * as React from 'react';
import { Box, Grid, Typography, useTheme } from '@material-ui/core';
import { Button } from '../styled/buttons';

const ContactBox = () =>
{
    const theme = useTheme();

    return (
        <Box padding={ theme.spacing( 1 ) } bgcolor="common.black" color="common.white">
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
        </Box>
    )
};

export default ContactBox;
