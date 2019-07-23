import * as React from 'react';
import { FormikBag, FormikProps, withFormik } from 'formik';
import UserFormData from './types/UserFormData';
import * as Yup from 'yup';
import UserFormProps from './types/UserFormProps';
import { Form, FormSection } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import Input from '../inputs/Input';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';

const validationSchema = Yup.object().shape( {
    name:  Yup.string().trim().required( 'Provide your name' ).max( 50, 'Name cannot contain more than 50 characters' ),
    email: Yup.string().email( 'Invalid e-mail format.' )
} );

const UserForm = ( props: UserFormProps & FormikProps<UserFormData> ) =>
{
    const [ , updateUserResult ] = props.mutation;

    return (
        <Form isCentered={ true }>
            <FormSection width="60%">
                <FormikInput id="name" name="name" type="text" render={ ( { field, form } ) =>
                    <Input disabled={ updateUserResult.loading } hasError={ !!form.errors.name } autoComplete="off" label="Name" { ...field } /> }/>
            </FormSection>
            <FormSection width="60%">
                <FormikInput id="email" name="email" type="text" render={ ( { field, form } ) =>
                    <Input disabled={ updateUserResult.loading } hasError={ !!form.errors.email } autoComplete="off" label="Email" { ...field } /> }/>
            </FormSection>
            <FormSection>
                <Button flat={ true } type="submit">
                    <Loader asOverlay={ true } active={ updateUserResult.loading }/>
                    Save
                </Button>
            </FormSection>
        </Form>
    )
};

const formikWrapper = withFormik( {
    mapPropsToValues: ( { user = {} }: UserFormProps ) => ( {
        ...user,
    } ),
    validationSchema,
    handleSubmit:     async ( values, formikBag: FormikBag<UserFormProps, UserFormData> ) =>
                      {
                          const [ mutate ] = formikBag.props.mutation;

                          await mutate( {
                              variables: {
                                  input: values,
                              }
                          } );
                      },

} );

export default formikWrapper( UserForm );
