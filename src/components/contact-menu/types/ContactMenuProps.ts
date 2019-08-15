import { ContactTypes } from '../../../types/reducers/ContactReducer';

export default interface ContactMenuProps
{
    onMenuClick: MenuClickHandler;
}

export type MenuClickHandler = ( menuItem: ContactTypes ) => any;
