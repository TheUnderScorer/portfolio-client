import * as React from 'react';
import * as Yup from 'yup';
import ContactFormProps from './types/ContactFormProps';
import { FormikBag, FormikProps, withFormik } from 'formik';
import ContactInput from '../../types/graphql/inputs/ContactInput';
import { Form, FormSection, Textarea } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import Input from '../inputs/Input';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';

const validationSchema = Yup.object().shape( {
    subject: Yup.string().required( 'Provide message title.' ).max( 50, 'Title is too long!' ),
    message: Yup.string().required( 'Provide your message.' ).min( 20, 'Your message should contain at least 20 characters.' ).max( 600, 'Your message is too long.' ),
    email:   Yup.string().email( 'Invalid e-mail provided.' ),
} );

const ContactForm = ( props: ContactFormProps & FormikProps<ContactInput> ) =>
{
    const [ , mutationResult ] = props.mutation;
    const { user } = props;

    return (
        <Form isCentered={ true }>
            <FormSection width="60%">
                <FormikInput id="subject" name="subject" type="text" render={ ( { form, field } ) =>
                    <Input disabled={ mutationResult.loading } hasError={ !!form.errors.subject } { ...field } />
                }/>
            </FormSection>
            { ( !user || !user.email ) &&
              <FormSection width="60%">
                  <FormikInput id="email" name="email" type="text" render={ ( { form, field } ) =>
                      <Input disabled={ mutationResult.loading } hasError={ !!form.errors.email } { ...field } />
                  }/>
              </FormSection>
            }
            <FormSection width="60%">
                <FormikInput id="message" name="message" render={ ( { form, field } ) =>
                    <Input inputComponent={ Textarea } disabled={ mutationResult.loading } hasError={ !!form.errors.message } { ...field } />
                }/>
            </FormSection>
            <FormSection>
                <Button flat={ true } type="submit" disabled={ mutationResult.loading }>
                    <Loader asOverlay={ true } active={ mutationResult.loading }/>
                    Send message
                </Button>
            </FormSection>
        </Form>
    )
};

const formikWrapper = withFormik( {
    validationSchema,
    handleSubmit: async ( input, formBag: FormikBag<ContactFormProps, ContactInput> ) =>
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
