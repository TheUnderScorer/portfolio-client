import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../storybook/decorators';
import CloseConversationFormProps from '../types/CloseConversationFormProps';
import { action } from '@storybook/addon-actions';
import mockUser from '../../../tests/data/mockUser';
import { useMutation } from '@apollo/react-hooks';
import { ConversationResult } from '../../../types/graphql/Queries';
import { ChangeConversationStatusInputVariable } from '../../../types/graphql/inputs/ChangeConversationStatusInput';
import { CHANGE_STATUS } from '../../../graphql/mutations/conversations';
import CloseConversationForm from '../CloseConversationForm';
import React from 'react';

const defaultProps: Partial<CloseConversationFormProps> = {
    onCancel:       action( 'cancel' ),
    currentUser:    mockUser,
    conversationID: 1,
};

storiesOf( 'CloseConversationForm', module )
    .addDecorator( StoryDecorator )
    .add( 'Regular', () =>
    {
        const Wrapper = () =>
        {
            const props: Partial<CloseConversationFormProps> = {
                ...defaultProps,
                closeConversationMutation: useMutation<ConversationResult, ChangeConversationStatusInputVariable>( CHANGE_STATUS )
            };

            return (
                <CloseConversationForm { ...props as CloseConversationFormProps } />
            )
        };

        return <Wrapper/>;
    } );
