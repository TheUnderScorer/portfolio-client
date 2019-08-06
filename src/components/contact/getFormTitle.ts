import User from '../../types/graphql/User';
import texts from '../../pages/data/texts';
import { ContactTypes } from '../../types/reducers/ContactReducer';

export default ( type: ContactTypes, user?: User ) =>
{
    if ( ( user && !user.name ) || type === ContactTypes.UserForm ) {
        return texts.contact.basicInfo;
    }

    const text = texts.contact[ type ];

    if ( typeof text === 'function' ) {
        return text( user && user.name ? user.name : '' );
    }

    return text;
}
