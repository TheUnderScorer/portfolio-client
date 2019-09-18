import * as React from 'react';import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';import * as Yup from 'yup';import { FormikProps, withFormik } from 'formik';import ConversationEditorProps from './types/ConversationEditorProps';import MessageInput from '../../types/graphql/inputs/MessageInput';import { createStyles, Grid, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';import FormikInput from '../formik/FormikInput';import { EditorForm, MessageSection, SendButton } from './styled';import { FaIcon } from '../styled/typography';import usePrevious from '../../hooks/usePrevious';import { ExecutionResult } from '@apollo/react-common';import colors from '../styled/colors';const validationSchema = Yup.object<MessageInput>().shape( {    content: Yup.string().trim().max( 500, 'Your message cannot contain more than 500 characters.' ).required( 'Provide your message.' ),} );const useStyles = makeStyles( ( theme: Theme ) => createStyles( {    sendButton: {        backgroundColor: colors.green,        color:           theme.palette.common.white,    }} ) );const ConversationEditor = ( { mutation, disabled, values, submitForm, isSubmitting }: ConversationEditorProps & FormikProps<MessageInput> ) =>{    const classes = useStyles();    const [ , mutationResult ] = mutation;    const [ disabledAfterSubmit, setDisabledAfterSubmit ] = useState( false );    const isDisabled = disabledAfterSubmit || disabled || isSubmitting || mutationResult.loading;    const wasSubmitting = usePrevious( isSubmitting );    const handleKeyPress: KeyboardEventHandler = event =>    {        if ( event.key === 'Enter' && !event.shiftKey ) {            submitForm();        }    };    const messageInputRef = useRef<HTMLInputElement>();    useEffect( () =>    {        if ( wasSubmitting && !isSubmitting ) {            setDisabledAfterSubmit( true );        }    }, [ isSubmitting, wasSubmitting ] );    // Sets timeout for re-enabling form after message have been sent, in order to avoid two messages being sent at the same exact time    useEffect( () =>    {        if ( !disabledAfterSubmit ) {            return;        }        const timeout = setTimeout( () =>        {            setDisabledAfterSubmit( false );            if ( messageInputRef.current ) {                messageInputRef.current.focus();            }        }, 100 );        return () => clearTimeout( timeout );    }, [ disabledAfterSubmit, messageInputRef ] );    return (        <EditorForm>            <Grid container justify="space-evenly">                <Grid item xs={ 7 }>                    <MessageSection filled={ !!values.content }>                        <FormikInput id="content" name="content" render={ ( { form, field } ) =>                            <TextField                                InputProps={ {                                    startAdornment: (                                                        <InputAdornment position="start">                                                            <FaIcon icon="reply"/>                                                        </InputAdornment>                                                    ),                                    id:             'content',                                    name:           'content'                                } }                                placeholder="Enter your message here..."                                disabled={ isDisabled }                                multiline                                inputRef={ messageInputRef }                                fullWidth                                rowsMax={ 3 }                                margin="none"                                variant="standard"                                onKeyDown={ handleKeyPress }                                error={ !!form.errors.content && !!form.touched.content }                                { ...field }                            />                        }/>                    </MessageSection>                </Grid>                <Grid item xs={ 3 }>                    <SendButton className={ classes.sendButton } variant="contained" type="submit" disabled={ isDisabled || !values.content }>                        Send                    </SendButton>                </Grid>            </Grid>        </EditorForm>    )};const wrapper = withFormik<ConversationEditorProps, MessageInput>( {    mapPropsToValues: ( { conversationID, initialContent = '' } ) =>                      {                          return {                              conversationID,                              content: initialContent                          }                      },    handleSubmit:     async ( values, { resetForm, props: { afterSubmit, mutation } } ) =>                      {                          const [ mutationFn ] = mutation;                          const result = await mutationFn( {                              variables: {                                  input: {                                      ...values                                  }                              }                          } ) as ExecutionResult<any>;                          if ( afterSubmit ) {                              afterSubmit();                          }                          if ( result.data ) {                              resetForm();                          }                      },    validationSchema} );export default wrapper( ConversationEditor );