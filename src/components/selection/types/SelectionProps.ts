export default interface SelectionProps
{
    onSelection: ( section: string ) => any;
    options: SelectionOption[];
}

export interface SelectionOption
{
    icon?: any;
    title: string;
    subTitle?: string;
    id: string;
}
