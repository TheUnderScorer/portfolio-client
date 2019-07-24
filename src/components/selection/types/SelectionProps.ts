export default interface SelectionProps<T extends string>
{
    onSelection: SelectionCallback<T>;
    options: SelectionOption[];
}

export type SelectionCallback<T extends string> = ( section: T ) => any

export interface SelectionOption
{
    icon?: any;
    title: string;
    subTitle?: string;
    id: string;
}
