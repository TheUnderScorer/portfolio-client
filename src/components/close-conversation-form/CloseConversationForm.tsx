import * as React from 'react';
import Props from './types/CloseConversationFormProps';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';
import ChangeConversationStatusInput from '../../types/graphql/inputs/ChangeConversationStatusInput';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import { CentredFrom, FlexFormSection, FormSection } from '../styled/form';
import { H6, Text } from '../styled/typography';
import { Button } from '../styled/buttons';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import FormikInput from '../formik/FormikInput';
import Loader from '../loader/Loader';
import { ObjectKeys } from '../../types/common/ObjectKeys';

const validationSchema = {
    id:     Yup.number().required( 'ConversationID is missing.' ),
    status: Yup.string().oneOf( Object.values( ConversationStatuses ), 'Invalid conversation status provided.' ),
    email:  Yup.string().email( 'Invalid e-mail address.' )
};

const CloseConversationForm = ( { onCancel, values, closeConversationMutation }: Props & FormikProps<ChangeConversationStatusInput> ) =>
{
    const [ , mutationResult ] = closeConversationMutation;

    return (
        <CentredFrom>
            <FormSection width="100%">
                <div>
                    <H6>
                        Close conversation
                    </H6>
                </div>
                <div>
                    <Text>
                        You are about to close this conversation.
                    </Text>
                </div>
            </FormSection>
            <FormSection margin="top">
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
            </FormSection>
            { !!values.sendTranscript &&
              <FormSection width="60%">
                  <FormikInput id="email" name="email" type="text" render={ ( { form, field } ) =>
                      <TextField
                          helperText={ !form.errors.email || !form.touched.email ? 'Email to which transcript will be sent.' : '' }
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
            <FlexFormSection margin="normal" isCentered={ true }>
                <Loader active={ mutationResult.loading } asOverlay/>
                <Button type="submit" disabled={ mutationResult.loading } ripple flat>
                    Close conversation
                </Button>
                <Button type="button" mode="secondary" ripple flat disabled={ mutationResult.loading } transparent onClick={ onCancel }>
                    Cancel
                </Button>
            </FlexFormSection>
        </CentredFrom>
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
