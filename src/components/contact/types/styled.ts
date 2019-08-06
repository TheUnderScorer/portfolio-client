import { NoticeType } from './notices';

export interface ContactWrapperProps
{
    finishedAnimation: boolean;
}

export interface IconContainerProps
{
    active?: boolean;
}

export interface NoticeProps
{
    type: NoticeType;
}
