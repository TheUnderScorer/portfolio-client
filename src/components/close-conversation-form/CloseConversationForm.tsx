import * as React from 'react';
import Props from './types/CloseConversationFormProps';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';
import ChangeConversationStatusInput from '../../types/graphql/inputs/ChangeConversationStatusInput';
import { ConversationStatuses } from '../../types/graphql/Conversation';
import { CentredFrom, FlexFormSection, FormSection } from '../styled/form';
import { H6, Text } from '../styled/typography';
import { Button, CtaButton } from '../styled/buttons';

const validationSchema = Yup.object().shape( {
    email:          Yup.string().required( 'Provide your e-mail address.' ).email( 'Invalid e-mail address.' ),
    conversationID: Yup.number().required( 'ConversationID is missing.' ),
    status:         Yup.string().oneOf( Object.values( ConversationStatuses ), 'Invalid conversation status provided.' )
} );

const CloseConversationForm = ( { onCancel }: Props & FormikProps<ChangeConversationStatusInput> ) =>
{
    return (
        <CentredFrom>
            <FormSection width="100%">
                <H6 display="block">
                    Close conversation
                </H6>
                <Text>
                    You are about to close this conversation. Send transcript?
                </Text>
            </FormSection>
            <FlexFormSection>
                <CtaButton>
                    Close conversation
                </CtaButton>
                <Button flat={ true } transparent={ true } onClick={ onCancel }>
                    Cancel
                </Button>
            </FlexFormSection>
        </CentredFrom>
    );
};

const wrapper = withFormik<Props, ChangeConversationStatusInput>( {
    mapPropsToValues: ( { conversationID, currentUser } ) => ( {
        conversationID,
        email:  currentUser.email,
        status: ConversationStatuses.closed
    } ),
    validationSchema,
    handleSubmit:     async () =>
                      {

                      }
} );

export default wrapper( CloseConversationForm );
