import * as React from 'react';
import { SelectionOption } from '../../components/selection/types/SelectionProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactTypes } from '../../types/reducers/ContactReducer';

const contactSelections: SelectionOption[] = [
    {
        icon:     <FontAwesomeIcon icon="comment-alt"/>,
        title:    'Chat',
        subTitle: 'Chat with me in real time.',
        id:       ContactTypes.Conversation
    },
    {
        icon:     <FontAwesomeIcon icon="envelope"/>,
        title:    'Send email',
        subTitle: 'Contact me using contact form. Fast and reliable!',
        id:       ContactTypes.ContactForm
    }
];

export default contactSelections;
