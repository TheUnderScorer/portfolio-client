import { ReactNode } from 'react';
import { ProjectTypes } from '../../../types/ProjectTypes';

export default interface ProjectInterface
{
    name: string;
    url?: string;
    repositoryUrl?: string;
    thumbnailUrl: string;
    logoUrl?: string;
    images?: string[];
    details: ReactNode | string;
    shortDetails: string;
    category: ProjectTypes;
}
