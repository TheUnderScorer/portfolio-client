import * as React from 'react';
import * as Yup from 'yup';
import ContactFormProps from './types/ContactFormProps';
import { FormikBag, FormikProps, withFormik } from 'formik';
import ContactInput from '../../types/graphql/inputs/ContactInput';
import { CentredFrom, FormSection } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { TextField } from '@material-ui/core';

const validationSchema = Yup.object().shape( {
    subject: Yup.string().required( 'Provide message title.' ).max( 50, 'Title is too long!' ),
    message: Yup.string().required( 'Provide your message.' ).min( 20, 'Your message should contain at least 20 characters.' ).max( 600, 'Your message is too long.' ),
    email:   Yup.string().email( 'Invalid e-mail provided.' ),
} );

const ContactForm = ( props: ContactFormProps & FormikProps<ContactInput> ) =>
{
    const [ , mutationResult ] = props.mutation;
    const { user } = props;

    console.log( { props } );

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
                <Button flat={ true } type="submit" disabled={ mutationResult.loading }>
                    <Loader asOverlay={ true } active={ mutationResult.loading }/>
                    Send message
                </Button>
            </FormSection>
        </CentredFrom>
    )
};

const formikWrapper = withFormik( {
    validationSchema,
    mapPropsToValues: ( { initialInput = {} }: ContactFormProps ) =>
                      {
                          const { subject = '', message = '' } = initialInput;

                          return {
                              subject,
                              message
                          }
                      },
    handleSubmit:     async ( input, formBag: FormikBag<ContactFormProps, ContactInput> ) =>
                      {
                          const { mutation } = formBag.props;

                          await mutation[ 0 ]( {
                              variables: {
                                  input
                              },
                          } );
                      }
} );

export default formikWrapper( ContactForm );
