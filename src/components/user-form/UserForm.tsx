import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import UserFormProps from './types/UserFormProps';
import FormikInput from '../formik/FormikInput';
import { Button } from '../styled/buttons';
import Loader from '../loader/Loader';
import { createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
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

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    root:    {
        height: '100%'
    },
    section: {
        marginTop: theme.spacing( 1 )
    }
} ) );

const UserForm = ( { mutation, setFieldValue, handleSubmit }: UserFormProps & FormikProps<UserInput> ) =>
{
    const classes = useStyles();

    const [ , updateUserResult ] = mutation;
    const [ captchaLoaded, setCaptchaLoaded ] = useState( false );

    useEffect( () =>
    {
        const timeout = setTimeout( () => setCaptchaLoaded( true ), 3000 );

        return () => clearTimeout( timeout );
    }, [] );

    const themeMode = useSelector<HomeStore, ThemeMode>( store => store.theme.mode );

    const handleCaptchaChange = useCallback( ( response: string | null ) =>
    {
        setFieldValue( 'captcha', response );
    }, [ setFieldValue ] );

    return (
        <form noValidate className={ classes.root } onSubmit={ handleSubmit }>
            <Grid className={ classes.root } container justify="center">
                <Grid direction="column" alignItems="center" justify="center" container item xs={ 7 }>
                    <Loader svgProps={ { width: '50%', height: '50%' } } asOverlay active={ !captchaLoaded }/>
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
                    <div className={ classes.section }>
                        <FormikInput id="captcha" name="captcha" render={ () =>
                            <Recaptcha
                                onChange={ handleCaptchaChange }
                                size="normal"
                                theme={ themeMode === 'dark' ? 'dark' : 'light' }
                                sitekey={ process.env.REACT_APP_SITE_KEY as string }
                            />
                        }/>
                    </div>
                    <Button className={ classes.section } disabled={ updateUserResult.loading } variant="contained" color="primary" type="submit">
                        <Loader asOverlay active={ updateUserResult.loading }/>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
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
