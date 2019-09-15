import * as React from 'react';
import * as Yup from 'yup';
import ContactFormProps from './types/ContactFormProps';
import { FormikProps, withFormik } from 'formik';
import ContactInput from '../../types/graphql/inputs/ContactInput';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { ExecutionResult } from '@apollo/react-common';

const validationSchema = ( props: ContactFormProps ) =>
{
    const shape: any = {
        subject: Yup.string().required( 'Provide message title.' ).max( 50, 'Title is too long!' ),
        message: Yup.string().required( 'Provide your message.' ).min( 20, 'Your message should contain at least 20 characters.' ).max( 1000, 'Your message is too long.' ),
    };

    if ( !props.user || !props.user.email ) {
        shape.email = Yup.string().required( 'Provide your e-mail address.' ).email( 'E-mail is required.' );
    }

    return Yup.object().shape( shape );
};

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    button: {
        marginTop: theme.spacing( 1 )
    },
    root:   {
        height: '100%'
    }
} ) );

const ContactForm = ( props: ContactFormProps & FormikProps<ContactInput> ) =>
{
    const [ , mutationResult ] = props.mutation;
    const { user, handleSubmit } = props;

    const classes = useStyles();

    return (
        <form className={ classes.root } noValidate onSubmit={ handleSubmit }>
            <Grid className={ classes.root } container justify="center">
                <Grid direction="column" alignItems="center" justify="center" container item xs={ 7 }>
                    <FormikInput id="subject" name="subject" type="text" render={ ( { form, field } ) =>
                        <TextField
                            id="subject"
                            disabled={ mutationResult.loading }
                            label="Subject"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={ !!form.errors.subject && !!form.touched.subject }
                            { ...field }
                        />

                    }/>
                    { ( !user || !user.email ) &&
                      <FormikInput id="email" name="email" type="text" render={ ( { form, field } ) =>
                          <TextField
                              disabled={ mutationResult.loading }
                              label="Email"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              error={ !!form.errors.email && !!form.touched.email }
                              { ...field }
                          />
                      }/>
                    }
                    <FormikInput id="message" name="message" render={ ( { form, field } ) =>
                        <TextField
                            label="Message"
                            disabled={ mutationResult.loading }
                            multiline
                            fullWidth
                            rows={ 3 }
                            margin="normal"
                            variant="outlined"
                            error={ !!form.errors.message && !!form.touched.message }
                            { ...field }
                        />
                    }/>
                    <Button className={ classes.button } variant="contained" type="submit" color="primary" disabled={ mutationResult.loading }>
                        <Loader asOverlay={ true } active={ mutationResult.loading }/>
                        Send message
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
};

const formikWrapper = withFormik<ContactFormProps, ContactInput>( {
    validationSchema,
    mapPropsToValues: ( { initialInput = {} } ) =>
                      {
                          const { subject = '', message = '', email = '' } = initialInput;

                          return {
                              subject,
                              message,
                              email,
                          }
                      },
    handleSubmit:     async ( input, formBag ) =>
                      {
                          const { mutation } = formBag.props;

                          const modifiedEmail = !!input.email;

                          if ( !modifiedEmail ) {
                              delete input.email;
                          }

                          // TODO Add interface for Contact
                          const mutationResult = await mutation[ 0 ]( {
                              variables: {
                                  input
                              },
                          } ) as ExecutionResult<any>;

                          const result = !!mutationResult.data.send.id;

                          if ( result ) {
                              formBag.resetForm();
                          }

                          formBag.props.afterSubmit( result, modifiedEmail );
                      }
} );

export default formikWrapper( ContactForm );
