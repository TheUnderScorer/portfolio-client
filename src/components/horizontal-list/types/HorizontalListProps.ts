import HorizontalListItemData from './HorizontalListItemData';

export default interface HorizontalListProps {
    items: HorizontalListItemData[];
    loaded?: boolean;
    lineHeight: number | string;
}
