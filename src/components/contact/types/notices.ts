export type NoticeType = 'error' | 'success';

export interface NoticeProps
{
    message: string;
    type: NoticeType;
}
