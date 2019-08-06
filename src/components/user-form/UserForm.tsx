import * as React from 'react';
import { FormikBag, FormikProps, withFormik } from 'formik';
import UserFormData from './types/UserFormData';
import * as Yup from 'yup';
import UserFormProps from './types/UserFormProps';
import { CentredFrom, FormSection } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { TextField } from '@material-ui/core';

const validationSchema = Yup.object().shape( {
    name:  Yup.string().trim().required( 'Provide your name.' ).max( 50, 'Name cannot contain more than 50 characters.' ),
    email: Yup.string().email( 'Invalid e-mail format.' )
} );

const UserForm = ( props: UserFormProps & FormikProps<UserFormData> ) =>
{
    const [ , updateUserResult ] = props.mutation;

    return (
        <CentredFrom>
            <FormSection width="60%">
                <FormikInput id="name" name="name" type="text" render={ ( { form, field } ) =>
                    <TextField
                        margin="normal"
                        label="Name *"
                        disabled={ updateUserResult.loading }
                        fullWidth
                        variant="outlined"
                        error={ !!form.errors.name && !!form.touched.name }
                        { ...field }
                    />
                }
                />
            </FormSection>
            <FormSection width="60%">
                <FormikInput id="email" name="email" type="text" render={ ( { field, form } ) =>
                    <TextField
                        margin="normal"
                        label="Email"
                        disabled={ updateUserResult.loading }
                        fullWidth
                        variant="outlined"
                        error={ !!form.errors.email && !!form.touched.email }
                        { ...field }
                    />
                }/>
            </FormSection>
            <FormSection margin="normal">
                <Button flat={ true } type="submit">
                    <Loader asOverlay={ true } active={ updateUserResult.loading }/>
                    Save
                </Button>
            </FormSection>
        </CentredFrom>
    )
};

const formikWrapper = withFormik( {
    mapPropsToValues: ( { user }: UserFormProps ) =>
                      {
                          const { name = '', email = '' } = user;

                          return {
                              name:  name ? name : '',
                              email: email ? email : ''
                          }
                      },
    validationSchema,
    handleSubmit:     async ( values, formikBag: FormikBag<UserFormProps, UserFormData> ) =>
                      {
                          const [ mutate ] = formikBag.props.mutation;
                          const data = { ...values };

                          if ( !data.email ) {
                              delete data.email;
                          }

                          await mutate( {
                              variables: {
                                  input: data,
                              }
                          } );
                      },

} );

export default formikWrapper( UserForm );
