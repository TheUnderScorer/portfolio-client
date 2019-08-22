import { ContactTypes } from '../../../types/reducers/ContactReducer';
import Conversation from '../../../types/graphql/Conversation';

export default interface ContactMenuProps
{
    onMenuClick: MenuClickHandler;
    conversation?: Conversation | null;
}

export enum ContactMenuItems
{
    CloseConversation = 'CloseConversation',
}

export type MenuClickHandler = ( menuItem: ContactTypes | ContactMenuItems ) => any;
