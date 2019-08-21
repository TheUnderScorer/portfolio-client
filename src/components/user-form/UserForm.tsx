import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import UserFormProps from './types/UserFormProps';
import { CentredFrom, FormSection } from '../styled/form';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { TextField } from '@material-ui/core';
import Recaptcha from 'react-google-recaptcha';
import { useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ThemeMode } from '../../types/reducers/ThemeReducer';
import UserInput from '../../types/graphql/inputs/UserInput';

const validationSchema = Yup.object().shape( {
    name:    Yup.string().trim().required( 'Provide your name.' ).max( 50, 'Name cannot contain more than 50 characters.' ),
    email:   Yup.string().email( 'Invalid e-mail format.' ),
    captcha: Yup.string().required( 'Complete captcha validation.' )
} );

const UserForm = ( { mutation, setFieldValue, values: { captcha } }: UserFormProps & FormikProps<UserInput> ) =>
{
    const [ , updateUserResult ] = mutation;

    const themeMode = useSelector<HomeStore, ThemeMode>( store => store.theme.mode );

    let captchaRef = useRef<Recaptcha | null>();
    const setCaptchaRef = useCallback( ( ref: Recaptcha | null ) => captchaRef.current = ref, [ captchaRef ] );

    useEffect( () =>
    {
        if ( !captchaRef.current || !!captcha ) {
            return;
        }

        const instance = captchaRef.current as Recaptcha;
        instance.execute();

    }, [ captchaRef, captcha ] );

    const handleCaptchaChange = useCallback( ( response: string | null ) =>
    {
        setFieldValue( 'captcha', response );
    }, [ setFieldValue ] );

    return (
        <CentredFrom>
            <FormSection width="60%">
                <FormikInput id="name" name="name" type="text" render={ ( { form, field } ) =>
                    <TextField
                        margin="normal"
                        label="Name *"
                        disabled={ updateUserResult.loading || !captcha }
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
                        disabled={ updateUserResult.loading || !captcha }
                        fullWidth
                        variant="outlined"
                        error={ !!form.errors.email && !!form.touched.email }
                        { ...field }
                    />
                }/>
            </FormSection>
            <FormSection margin="normal" width="60%">
                <FormikInput id="captcha" name="captcha" render={ () =>
                    <Recaptcha
                        ref={ setCaptchaRef }
                        onChange={ handleCaptchaChange }
                        size="invisible"
                        theme={ themeMode === 'black' ? 'dark' : 'light' }
                        sitekey={ process.env.REACT_APP_SITE_KEY as string }
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

const formikWrapper = withFormik<UserFormProps, UserInput>( {
    mapPropsToValues: ( { user } ) =>
                      {
                          const { name, email } = user;

                          return {
                              name:    name ? name : '',
                              email:   email ? email : '',
                              captcha: ''
                          }
                      },
    validationSchema,
    handleSubmit:     async ( values, { props: { mutation } } ) =>
                      {
                          const [ mutate ] = mutation;

                          const data = { ...values };

                          if ( !data.email ) {
                              data.email = undefined;
                          }

                          await mutate( {
                              variables: {
                                  input: data,
                              }
                          } );
                      },

} );

export default formikWrapper( UserForm );
