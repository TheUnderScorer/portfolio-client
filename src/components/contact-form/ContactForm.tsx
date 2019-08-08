import * as React from 'react';
import * as Yup from 'yup';
import ContactFormProps from './types/ContactFormProps';
import { FormikProps, withFormik } from 'formik';
import ContactInput from '../../types/graphql/inputs/ContactInput';
import { CentredFrom, FormSection } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { TextField } from '@material-ui/core';

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

const ContactForm = ( props: ContactFormProps & FormikProps<ContactInput> ) =>
{
    const [ , mutationResult ] = props.mutation;
    const { user } = props;

    return (
        <CentredFrom>
            <FormSection width="60%">
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
            </FormSection>
            { ( !user || !user.email ) &&
              <FormSection width="60%">
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
              </FormSection>
            }
            <FormSection width="60%">
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
            </FormSection>
            <FormSection margin="normal">
                <Button disabledOpacity={ false } flat={ true } type="submit" disabled={ mutationResult.loading }>
                    <Loader asOverlay={ true } active={ mutationResult.loading }/>
                    Send message
                </Button>
            </FormSection>
        </CentredFrom>
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

                          const mutationResult = await mutation[ 0 ]( {
                              variables: {
                                  input
                              },
                          } );

                          const result = !!mutationResult.data.send.id;

                          if ( result ) {
                              formBag.resetForm();
                          }

                          formBag.props.afterSubmit( result, modifiedEmail );
                      }
} );

export default formikWrapper( ContactForm );
