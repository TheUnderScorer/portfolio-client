import * as React from 'react';
import Props from './types/CloseConversationFormProps';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';
import ChangeConversationStatusInput from '../../types/graphql/inputs/ChangeConversationStatusInput';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import { Button } from '../styled/buttons';
import {
    Checkbox,
    createStyles,
    FormControlLabel,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import FormikInput from '../formik/FormikInput';
import Loader from '../loader/Loader';
import { ObjectKeys } from '../../types/common/ObjectKeys';

const validationSchema = {
    id:     Yup.number().required( 'ConversationID is missing.' ),
    status: Yup.string().oneOf( Object.values( ConversationStatuses ), 'Invalid conversation status provided.' ),
    email:  Yup.string().email( 'Invalid e-mail address.' )
};

const useButtonStyles = makeStyles( ( theme: Theme ) =>
{
    return createStyles( {
        button:   {
            marginRight: theme.spacing( 0.5 ),
            marginLeft:  theme.spacing( 0.5 ),
        },
        relative: {
            position: 'relative'
        }
    } )
} );

const CloseConversationForm = ( { onCancel, values, closeConversationMutation, handleSubmit }: Props & FormikProps<ChangeConversationStatusInput> ) =>
{
    const [ , mutationResult ] = closeConversationMutation;

    const classes = useButtonStyles();

    return (
        <form onSubmit={ handleSubmit } noValidate>
            <Grid alignItems="center" direction="column" container>
                <Typography align="center" variant="h6">
                    Close conversation
                </Typography>
                <Typography paragraph align="center" variant="subtitle1" color="textSecondary">
                    You are about to close this conversation.
                </Typography>
                <FormControlLabel
                    label="Send transcript?"
                    control={ (
                        <FormikInput
                            id="sendTranscript"
                            name="sendTranscript"
                            render={ ( { field } ) => (
                                <Checkbox disabled={ mutationResult.loading } color="primary" { ...field } />
                            ) }
                        />
                    ) }
                />
                { !!values.sendTranscript &&
                  <FormikInput id="email" name="email" type="text" render={ ( { form, field } ) =>
                      <TextField
                          helperText={ !form.errors.email || !form.touched.email ? 'Email to which transcript will be sent.' : '' }
                          disabled={ mutationResult.loading }
                          label="Email"
                          fullWidth
                          margin="none"
                          variant="outlined"
                          error={ !!form.errors.email && !!form.touched.email }
                          { ...field }
                      />
                  }/>
                }
                <Grid className={ classes.relative } container justify="center">
                    <Loader active={ mutationResult.loading } asOverlay/>
                    <Button className={ classes.button } variant="contained" color="primary" type="submit" disabled={ mutationResult.loading }>
                        Close conversation
                    </Button>
                    <Button className={ classes.button } variant="outlined" color="primary" type="button" disabled={ mutationResult.loading } onClick={ onCancel }>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const wrapper = withFormik<Props, ChangeConversationStatusInput>( {
    mapPropsToValues: ( { conversationID, currentUser } ) => ( {
        id:             conversationID,
        email:          currentUser.email ? currentUser.email : undefined,
        status:         ConversationStatuses.closed,
        sendTranscript: false,
    } ),
    validate:         ( values =>
    {
        const errors: ObjectKeys<ChangeConversationStatusInput, string> = {};

        if ( values.sendTranscript && !values.email ) {
            errors.email = 'Provide e-mail address.'
        }

        return errors;
    } ),
    validationSchema,
    handleSubmit:     async ( input, formikBag ) =>
                      {
                          const [ mutationFn ] = formikBag.props.closeConversationMutation;

                          await mutationFn( {
                              variables: {
                                  input
                              }
                          } )
                      }
} );

export default wrapper( CloseConversationForm );
