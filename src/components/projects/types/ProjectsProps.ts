import { ReactNode } from 'react';

export default interface ProjectsProps {
    projects: Project[];
}

export interface Project {
    name: string;
    url: string;
    thumbnailUrl: string;
    logoUrl?: string;
    images?: string[];
    details: ReactNode | string;
    category: string;
}
